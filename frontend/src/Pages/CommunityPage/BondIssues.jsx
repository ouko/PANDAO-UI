import { useAccount } from '@/AccountContext'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useBondFormStore } from '@/store/BondStore/BondForrmStore'
import { AlertCircle, BookDown } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import PropTypes from 'prop-types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSendTransaction } from '@/hooks/useSendTransaction'
const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  tooltipText,
  disabled = false,
  min = 0,
}) => {
  const today = new Date().toISOString().split('T')[0]
  return (
    <div>
      <div className="flex items-center justify-between pr-1">
        <label htmlFor={name}>{label}</label>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <AlertCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="input"
        disabled={disabled}
        min={type === 'date' ? today : min}
      />
    </div>
  )
}
FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  tooltipText: PropTypes.string,
  disabled: PropTypes.bool,
}

FormInput.defaultProps = {
  type: 'text',
  tooltipText: '',
}
const BondIssue = () => {
  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [manifest, setManifest] = useState('')
  const sendTransaction = useSendTransaction()
  const { bond, updateBond, resetBond } = useBondFormStore((state) => state)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [nfts, setNfts] = useState([]) // State to store the NFTs array
  const handleformSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true at the start of the process
    setModalOpen()

    try {
      // Initial post request to submit the bond data
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/zero-coupon-bond`,
        {
          ...bond,
          community_id: params.id,
          user_address: accounts[0].address,
          initial_exchange_date: new Date(
            bond.initial_exchange_date,
          ).toISOString(),
          maturity_date: new Date(bond.maturity_date).toISOString(),
        },
      )

      if (res.status === 200) {
        setManifest(res.data)
        console.log('Form submitted successfully', res.data)

        // Wait for manifest to update before sending the transaction
        const { receipt } = await sendTransaction(res.data) // Using res.data instead of manifest

        // Transaction receipt handling
        if (receipt?.transaction?.intent_hash) {
          let txId = receipt.transaction.intent_hash

          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
              {
                tx_id: txId,
                user_address: accounts[0].address,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            console.log(response.data)
            toast.success('Bond Issued')
            navigate(`/community/detail/${params.id}`)
          } catch (error) {
            console.error('Error in submit-tx:', error)
            toast.error('Failed to submit transaction')
            setLoading(false)
          }
        } else {
          toast.error('Transaction hash missing')
        }
      } else {
        toast.error('Failed to create bond manifest')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const fetchNfts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/wallets/assets/${accounts[0].address
        }`,
      )

      // const processedData = Array.from(
      //   new Map(
      //     response.data.flat().map((item) => [
      //       item.address,
      //       {
      //         name: item.name || '',
      //         icon_url: item.icon_url || '',
      //         address: item.address,
      //       },
      //     ]),
      //   ).values(),
      // )
      setNfts(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Function to handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target

    // If the field is "maturity_date", ensure it is not less than "initial_exchange_date"
    if (name === 'maturity_date') {
      const initialDate = new Date(bond.initial_exchange_date)
      const maturityDate = new Date(value)

      if (maturityDate < initialDate) {
        toast.error(
          'Maturity date cannot be earlier than Initial Exchange Date.',
        )
        return
      }
    }

    // Update the bond state
    updateBond(name, value)

    if (name === 'bond_price') {
      updateBond('notional_principal', value)
    }

    if (name === 'initial_exchange_date') {
      const currentMaturityDate = new Date(bond.maturity_date)
      const newInitialDate = new Date(value)

      if (currentMaturityDate < newInitialDate) {
        toast.error(
          'Maturity date cannot be earlier than Initial Exchange Date.',
        )
        updateBond('maturity_date', value)
      }
    }
  }

  useEffect(() => {
    const requiredFields = [
      'bond_name',
      'bond_symbol',
      'bond_identity',
      'nominal_interest_rate',
      'currency',
      'initial_exchange_date',
      'maturity_date',
      'notional_principal',
      'discount',
      'bond_position',
      'bond_price',
      'number_of_bonds',
      'description',
    ];

    const allFieldsFilled = requiredFields.every(
      (field) => bond[field] !== undefined && bond[field] !== ''
    );
    setIsFormComplete(allFieldsFilled);
  }, [bond]);

  useEffect(() => {
    // Only fetch NFTs if accounts are available
    if (accounts && accounts.length > 0) {
      fetchNfts()
    }
  }, [accounts])
  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  return (
    <div className="items-start gap-3 justify-start min-h-screen overflow-auto z-50 text-brand6 px-2">

      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">
              <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-5 gap-7 p-10 border-2 border-brand5 flex flex-col justify-start items-start ">
                <div className="  text-[40px] leading-[130%] z-50 font-semibold text-start">


                  <span>

                    <span className="step-2-describe-your-dao-span2"></span>
                    <span className="step-2-describe-your-dao-span3 text-amber-50">Create a Bond</span>
                  </span>
                </div>
                <div className="text-[#ffffff]  z-50 text-xl leading-[130%] font-normal text-center">
                  Start simple and learn as you go. You can always evolve your DAO in the future
                </div>
              </div>



              <div className="p-5 z-50">
                <div className="flex flex-col w-full space-y-4">
                  <div className="grid grid-cols-2 z-50 gap-5">
                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Community ID:
                      </label>
                      <input
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="community_id"
                        value={params.id}
                        disabled={true}
                        placeholder="Community ID"
                      />
                    </div>





                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch">
                        Bond Name:
                      </label>
                      <input
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="bond_name"
                        value={bond.bond_name}
                        onChange={handleChange}
                        placeholder="Name of the bond"
                      />
                    </div>





                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Bond Symbol:
                      </label>
                      <input
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="bond_symbol"
                        value={bond.bond_symbol}
                        onChange={handleChange}
                        placeholder="Symbol of the bond"
                      />
                    </div>



                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Bond Identity:
                      </label>
                      <input
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="bond_identity"
                        value={bond.bond_identity}
                        onChange={handleChange}
                        placeholder="Identity of the bond"
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Nominal Interest Rate:
                      </label>
                      <input
                        type="number"
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="nominal_interest_rate"
                        value={bond.nominal_interest_rate}
                        onChange={handleChange}
                        placeholder="Interest rate of the bond"
                        min={0}
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Currency:
                      </label>
                      <input
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="currency"
                        value={bond.currency}
                        onChange={handleChange}
                        placeholder="Currency type (e.g., XRD)"
                        disabled={true}
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Initial Exchange Date:
                      </label>
                      <input
                        type="date"
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="initial_exchange_date"
                        value={bond.initial_exchange_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        placeholder="Start date of bond exchange"
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Maturity Date:
                      </label>
                      <input
                        type="date"
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="maturity_date"
                        value={bond.maturity_date}
                        onChange={handleChange}
                        min={bond.initial_exchange_date || ''}
                        placeholder="Date the bond matures"
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Bond Price:
                      </label>
                      <input
                        type="number"
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="bond_price"
                        value={bond.bond_price}
                        onChange={handleChange}
                        placeholder="Current price of the bond"
                        min={0}
                      />
                    </div>




                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Discount:
                      </label>
                      <input
                        type="number"
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="discount"
                        value={bond.discount}
                        onChange={handleChange}
                        placeholder="Discount applied to bond"
                        min={0}
                      />
                    </div>


                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Notional Principal:
                      </label>
                      <input
                        type="number"
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="notional_principal"
                        value={bond.notional_principal}
                        onChange={handleChange}
                        placeholder="Principal amount of the bond"
                        disabled={true}
                      />
                    </div>

                    <div className="flex flex-col w-full z-50 space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Number of Bonds:
                      </label>
                      <input
                        type="number"
                        className="w-full p-4 border bg-[#1B0D37] z-50 border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="number_of_bonds"
                        value={bond.number_of_bonds}
                        onChange={handleChange}
                        placeholder="Total quantity of bonds"
                        disabled={true}
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        User Address:
                      </label>
                      <input
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="user_address"
                        value={accounts[0].address}
                        onChange={handleChange}
                        placeholder="Address associated with the bond"
                        disabled={true}
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-4">
                      <label
                        className="text-brand6 text-left text-xl leading-[120%] font-medium relative self-stretch"
                      >
                        Description:
                      </label>
                      <input
                        className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                        name="description"
                        value={bond.description}
                        onChange={handleChange}
                        placeholder="Detailed description of the bond"
                      />
                    </div>




                    <Select
                      className="flex items-center justify-center"
                      onValueChange={(value) =>
                        updateBond('bond_position', value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long">Long</SelectItem>
                        <SelectItem value="short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      className="flex items-center justify-center"
                      onValueChange={(value) => updateBond('nft', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select NFT" />
                      </SelectTrigger>
                      <SelectContent>
                        {nfts.length > 0 ? (
                          nfts.map((item, index) => (
                            <SelectItem
                              key={index}
                              value={item.resource_address}
                            >
                              {item.name || item.icon_url ? (
                                <div className="flex items-center gap-2">
                                  <img
                                    className="h-5 w-5 rounded-full shadow-md"
                                    src={item.icon_url}
                                    alt=""
                                  />
                                  {item.name && <span>{item.name}</span>}
                                </div>
                              ) : (
                                'Unnamed Item'
                              )}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No NFTs available
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center z-50 py-4 justify-end">
                    <Button
                      className="flex-1 rounded-2xl p-3 h-14 text-xl z-50 py-4 text-white "
                      variant="brand"
                      onClick={() => setOpen(!open)}
                      disabled={!isFormComplete}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="max-w-2xl  bg-[rgba(169,126,255,0.34)] text-white  border-[1px] border-brand3 ">
            <h2 className="text-xl font-bold">Confirm Submission</h2>
            <p>Review the details below before submitting:</p>

            {/* Display the submitted data */}
            <div className=" p-4 rounded-lg text-left max-h-96 overflow-auto">
              <ul className="space-y-2 bg-[rgba(169,126,255,0.34)] text-black ">
                <li>
                  <strong>Community ID:</strong> {params.id}
                </li>
                <li>
                  <strong>Bond Name:</strong> {bond.bond_name}
                </li>
                <li>
                  <strong>Bond Symbol:</strong> {bond.bond_symbol}
                </li>
                <li>
                  <strong>Bond Identity:</strong> {bond.bond_identity}
                </li>
                <li>
                  <strong>Nominal Interest Rate:</strong>{' '}
                  {bond.nominal_interest_rate}
                </li>
                <li>
                  <strong>Currency:</strong> {bond.currency}
                </li>
                <li>
                  <strong>Initial Exchange Date:</strong>{' '}
                  {bond.initial_exchange_date}
                </li>
                <li>
                  <strong>Maturity Date:</strong> {bond.maturity_date}
                </li>
                <li>
                  <strong>Bond Price:</strong> {bond.bond_price}
                </li>
                <li>
                  <strong>Discount:</strong> {bond.discount}
                </li>
                <li>
                  <strong>Notional Principal:</strong> {bond.notional_principal}
                </li>
                <li>
                  <strong>Number of Bonds:</strong> {bond.number_of_bonds}
                </li>
                <li>
                  <strong>User Address:</strong> {accounts[0]?.address}
                </li>
                <li>
                  <strong>Description:</strong> {bond.description}
                </li>
                <li>
                  <strong>Bond Position:</strong> {bond.bond_position}
                </li>
                <li>
                  <strong>NFT:</strong> {bond.nft}
                </li>
                {/* <li>
              <strong>Bond Icon:</strong>
              <div className="mt-2">
                <img
                  src={item.icon_url}
                  alt="Bond Icon"
                  className="h-16 w-16 rounded-full shadow-md"
                />
              </div>
            </li> */}
              </ul>
            </div>

            <div className="flex items-center justify-end space-x-4">
              <Button
                variant="brand"
                disabled={loading}
                onClick={handleformSubmit}
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default BondIssue
