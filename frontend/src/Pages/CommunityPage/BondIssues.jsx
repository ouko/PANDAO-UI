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
import { useSendTransaction } from '@/hooks/useSendTransaction'

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  tooltipText,
  disabled = false,
  min,
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
        min={min}
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
  const [manifest, setManifest] = useState('')
  const sendTransaction = useSendTransaction()
  const { bond, updateBond, resetBond } = useBondFormStore((state) => state)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState([]) // State to store the NFTs array
  const handleformSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true at the start of the process

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
  const fetchNfts = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/users/wallets/assets/${accounts[0].address}`,
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
  const handleChange = (e) => {
    updateBond(e.target.name, e.target.value)
    if (e.target.name === 'bond_price') {
      updateBond('notional_principal', e.target.value)
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
    ]

    const allFieldsFilled = requiredFields.every((field) => bond[field])
    setIsFormComplete(allFieldsFilled)
  }, [bond])
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
  console.log(nfts,"nfy")
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <BookDown className=" text-blue-700" />
                  </div>
                  {/* <div>
                      <Button variant="radix" >
                        Manage members
                      </Button>
                    </div> */}
                </div>
                <div className="text-3xl font-semibold">Create Bond</div>
              </Card>
              <Card className="p-5">
                <form
                  onSubmit={handleformSubmit}
                  className="flex flex-col w-full space-y-4"
                >
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput
                      label="Community ID"
                      name="community_id"
                      value={params.id}
                      disabled="true"
                      onChange={handleChange}
                      tooltipText="Unique identifier for the community"
                    />
                    <FormInput
                      label="Bond Name"
                      name="bond_name"
                      value={bond.bond_name}
                      onChange={handleChange}
                      tooltipText="Name of the bond"
                    />
                    <FormInput
                      label="Bond Symbol"
                      name="bond_symbol"
                      value={bond.bond_symbol}
                      onChange={handleChange}
                      tooltipText="Symbol for the bond"
                    />
                    <FormInput
                      label="Bond Identity"
                      name="bond_identity"
                      value={bond.bond_identity}
                      onChange={handleChange}
                      tooltipText="Identity of the bond"
                    />
                    <FormInput
                      label="Nominal Interest Rate"
                      type="number"
                      name="nominal_interest_rate"
                      value={bond.nominal_interest_rate}
                      onChange={handleChange}
                      tooltipText="Interest rate of the bond"
                    />
                    <FormInput
                      label="Currency"
                      name="currency"
                      value={bond.currency}
                      onChange={handleChange}
                      disabled="true"
                      tooltipText="Currency type (e.g., XRD)"
                    />
                    <FormInput
                      label="Initial Exchange Date"
                      type="date"
                      name="initial_exchange_date"
                      value={bond.initial_exchange_date}
                      onChange={handleChange}
                      tooltipText="Start date of bond exchange"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <FormInput
                      label="Maturity Date"
                      type="date"
                      name="maturity_date"
                      value={bond.maturity_date}
                      onChange={handleChange}
                      tooltipText="Date the bond matures"
                    />
                    <FormInput
                      label="Bond Price"
                      type="number"
                      name="bond_price"
                      value={bond.bond_price}
                      onChange={handleChange}
                      tooltipText="Current price of the bond"
                    />

                    <FormInput
                      label="Discount"
                      type="number"
                      name="discount"
                      value={bond.discount}
                      onChange={handleChange}
                      tooltipText="Discount applied to bond"
                    />

                    <FormInput
                      label="Notional Principal"
                      type="number"
                      disabled="true"
                      name="notional_principal"
                      value={bond.notional_principal}
                      onChange={handleChange}
                      tooltipText="Principal amount of the bond"
                    />
                    <FormInput
                      label="Number of Bonds"
                      type="number"
                      name="number_of_bonds"
                      value={bond.number_of_bonds}
                      onChange={handleChange}
                      tooltipText="Total quantity of bonds"
                    />
                    <FormInput
                      label="User Address"
                      name="user_address"
                      value={accounts[0].address}
                      disabled="true"
                      onChange={handleChange}
                      tooltipText="Address associated with the bond"
                    />
                    <FormInput
                      label="Description"
                      name="description"
                      value={bond.description}
                      onChange={handleChange}
                      tooltipText="Detailed description of the bond"
                    />
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
                            <SelectItem key={index} value={item.name}>
                              {item.name || item.icon_url ? (
                                <div className="flex items-center gap-2">
                                     <img
                                  className='h-5 w-5 rounded-full shadow-md'
                                  src={item.icon_url
                                  }
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
                  <div className="flex items-center justify-end">
                    <Button type="submit" disabled={!isFormComplete || loading}>
                      Submit
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BondIssue
