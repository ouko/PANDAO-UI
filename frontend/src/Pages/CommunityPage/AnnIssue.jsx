import { useAccount } from '@/AccountContext'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
import { useAnnFormStore } from '@/store/AnnStore/AnnFormStore'

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
          initial_exchange_date: new Date(
            annuity.initial_exchange_date,
          ).toISOString(),
          maturity_date: new Date(annuity.maturity_date).toISOString(),
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
                <div className="text-3xl font-semibold">Issue ANN Token</div>
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
                      tooltipText="Unique identifier for the community"
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
                  </div>
                  <div className="flex items-center justify-end">
                    <Button type="submit" disabled={!isFormComplete || loading }>
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

export default AnnIssue
