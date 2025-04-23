import { useAccount } from '@/AccountContext'
import { Input } from '@/components/ui/input'
import { AlertCircle } from 'lucide-react'
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
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { useAnnFormStore } from '@/store/AnnStore/AnnFormStore'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  tooltipText,
  disabled = false,
}) => {
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
const AnnIssue = () => {
  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const [manifest, setManifest] = useState('')
  const sendTransaction = useSendTransaction()
  const { annuity, updateAnnuity } = useAnnFormStore((state) => state)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState([])
  const [selectedNft, setSelectedNft] = useState(null)
  const [open, setOpen] = useState(false)




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

  useEffect(() => {
    // Only fetch NFTs if accounts are available
    if (accounts && accounts.length > 0) {
      fetchNfts()
    }
  }, [accounts])

  const updateBond = (key, value) => {
    if (key === 'nft') {
      setSelectedNft(value)
    }
  }



  const handleformSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true at the start of the process

    try {
      // Initial post request to submit the bond data
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/create-ann`,
        {
          ...annuity,
          community_id: params.id,
          user_address: accounts[0].address,
          initial_exchange_date: new Date(annuity.initial_exchange_date).toISOString(),
          maturity_date: new Date(annuity.maturity_date).toISOString(),
          nft: selectedNft,
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

  const handleChange = (e) => {
    updateAnnuity(e.target.name, e.target.value)
  }
  useEffect(() => {
    console.log('Annuity:', annuity);
    const requiredFields = [
      'contract_type',
      'contract_role',
      'contract_identity',
      'nominal_interest_rate',
      'initial_exchange_date',
      'maturity_date',
      'notional_principal',
      'ann_position',
      'price',
      'number_of_ann',



    ]

    const allFieldsFilled = requiredFields.every((field) => annuity[field])
    console.log('Form complete:', allFieldsFilled);
    setIsFormComplete(allFieldsFilled)
  }, [annuity])
  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  return (
    <div className="items-start gap-3 justify-start min-h-screen overflow-hidden z-50 text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">
              <div className=" rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden ">
                <div className="flex flex-row  gap-10 items-center w-full">
                  <div
                    className="bg-[#321e58] rounded-full p-5 z-50 flex items-center justify-center w-24 h-24">
                    <img
                      className="w-14 h-14"
                      src="/8.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div
                      className="text-[#5228A4] font-semibold uppercase text-xl"
                    >
                      Total ANN Token:
                    </div>
                    <div
                      className="text-white text-[56px] font-medium text-center"
                    >
                      Issue ANN Token
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 b py-4 z-50 px-4">
                <form
                  onSubmit={handleformSubmit}
                  className="flex flex-col w-full space-y-4"
                >
                  <div className="grid grid-cols-2 z-50 gap-5 mx-5 text-brand7 text-[20px]">
                    <FormInput
                      label="Community ID"
                      name="community_id"
                      value={params.id}
                      disabled="true"
                      tooltipText="Unique identifier for the community"

                    />
                    <FormInput
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      value={annuity.description}
                      placeholder="Enter description here"
                    />
                    <FormInput
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      value={annuity.name}
                      tooltipText="Name"
                    />
                    <FormInput
                      label="Contract Type"
                      name="contract_type"
                      value={annuity.contract_type}
                      onChange={handleChange}
                      tooltipText='Token Type'
                    />
                    <FormInput
                      label="Contract Role"
                      name="contract_role"
                      value={annuity.contract_role}
                      onChange={handleChange}
                      tooltipText='Token Role'
                    />
                    <FormInput
                      label="Contract Identity"
                      name="contract_identity"
                      value={annuity.contract_identity}
                      onChange={handleChange}
                      tooltipText='Identity Of Token'
                    />
                    <FormInput
                      label="Price"
                      type="number"
                      name="price"
                      value={annuity.price}
                      onChange={handleChange}
                      tooltipText="Currency type (e.g., XRD)"
                    />
                    <FormInput
                      label="Number of Ann"
                      type="number"
                      name="number_of_ann"
                      value={annuity.number_of_ann}
                      onChange={handleChange}
                      tooltipText='Total Number of ANN Token'
                    />




                    <FormInput
                      label="Nominal Interest Rate"
                      type="number"
                      name="nominal_interest_rate"
                      value={annuity.nominal_interest_rate}
                      onChange={handleChange}
                      tooltipText='Normal Interest Rate of ANN Token'
                    />
                    <FormInput
                      label="Initial Exchange Date"
                      type="date"
                      name="initial_exchange_date"
                      value={annuity.initial_exchange_date}
                      onChange={handleChange}
                      tooltipText='Start date of Token exchange'
                    />
                    <FormInput
                      label="Maturity Date"
                      type="date"
                      name="maturity_date"
                      value={annuity.maturity_date}
                      onChange={handleChange}
                      tooltipText='Date the Token matures'
                    />
                    <FormInput
                      label="Notional Principal"
                      type="number"
                      name="notional_principal"
                      value={annuity.notional_principal}
                      onChange={handleChange}
                      tooltipText='Principal amount of the Token'
                    />

                    <div>
                      <div>Select Position</div>
                      <Select
                        className="flex items-center justify-center"
                        onValueChange={(value) =>
                          updateAnnuity('ann_position', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="long">Long</SelectItem>
                          <SelectItem value="short">Short</SelectItem>
                        </SelectContent>
                      </Select>



                    </div>

                    <div>

                      <div>Select NFT</div>
                      <Select
                        className="flex items-center justify-center"
                        onValueChange={(value) => {
                          setSelectedNft(value);
                          updateAnnuity('nft', value);
                        }}
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




                  </div>
                  <div className="flex items-center z-50 justify-center">
                    <Button type="submit"
                      variant="brand"
                      className="w-1/2 mt-5"
                      disabled={!isFormComplete || loading} onClick={() => setOpen(!open)}  >

                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="max-w-2xl bg-[rgba(169,126,255,0.2)] text-white backdrop-blur-md border border-brand3 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Confirm Submission</h2>
            <p className="mb-4 text-white/90">Review the details below before submitting:</p>

            <div className="p-4 text-left max-h-96 overflow-y-auto rounded-md bg-[rgba(133,115,170,0.2)]">
              <ul className="space-y-2 px-2">
                <li><strong>Community ID:</strong> {params.id}</li>
                <li><strong>Name:</strong> {annuity.name}</li>
                <li><strong>Description:</strong> {annuity.description}</li>
                <li><strong>Contract Type:</strong> {annuity.contract_type}</li>
                <li><strong>Contract Role:</strong> {annuity.contract_role}</li>
                <li><strong>Contract Identity:</strong> {annuity.contract_identity}</li>
                <li><strong>Price:</strong> {annuity.price}</li>
                <li><strong>Number of ANN:</strong> {annuity.number_of_ann}</li>
                <li><strong>Nominal Interest Rate:</strong> {annuity.nominal_interest_rate}</li>
                <li><strong>Initial Exchange Date:</strong> {annuity.initial_exchange_date}</li>
                <li><strong>Maturity Date:</strong> {annuity.maturity_date}</li>
                <li><strong>Notional Principal:</strong> {annuity.notional_principal}</li>
                <li><strong>ANN Position:</strong> {annuity.ann_position}</li>
                <li><strong>NFT:</strong> {annuity.nft}</li>
                <li><strong>User Address:</strong> {accounts[0]?.address}</li>
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

export default AnnIssue
