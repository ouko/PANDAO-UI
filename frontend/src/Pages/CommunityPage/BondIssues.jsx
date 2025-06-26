import { useAccount } from '@/AccountContext'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useBondFormStore } from '@/store/BondStore/BondForrmStore'
import { AlertCircle, BookDown, Info } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import PropTypes from 'prop-types'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
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
  min: PropTypes.number,
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
  const sendTransaction = useSendTransaction()
  const { bond, updateBond } = useBondFormStore((state) => state)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState([]) // State to store the NFTs array
  const [timeRemaining, setTimeRemaining] = useState(0) // Timer for bond creation cooldown
  const [bondCreated, setBondCreated] = useState(false) // Track if a bond has been created

  // Check if there's a stored timestamp in localStorage
  useEffect(() => {
    const storedTimestamp = localStorage.getItem('lastBondCreationTime');
    if (storedTimestamp) {
      const lastCreationTime = parseInt(storedTimestamp);
      const currentTime = new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - lastCreationTime) / 1000);
      const cooldownPeriod = 5 * 60; // 5 minutes in seconds

      if (elapsedSeconds < cooldownPeriod) {
        // If less than 5 minutes have passed, set the remaining time and bondCreated flag
        setTimeRemaining(cooldownPeriod - elapsedSeconds);
        setBondCreated(true);
      } else {
        // If more than 5 minutes have passed, reset the timer
        localStorage.removeItem('lastBondCreationTime');
        setTimeRemaining(0);
        setBondCreated(false);
      }
    }
  }, []);

  // Timer effect to count down from timeRemaining
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          toast.info('5 minutes have passed. You can create another bond now.');
          setBondCreated(false);
          localStorage.removeItem('lastBondCreationTime');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Memoize the formatted time to prevent re-renders
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [timeRemaining]);
  const handleformSubmit = async (e) => {
    e.preventDefault()

    // Check if a bond has already been created within the 5-minute window
    if (bondCreated) {
      toast.error('You can only create one bond every 5 minutes.')
      setOpen(false)
      return
    }

    setLoading(true) // Set loading to true at the start of the process
    // Process form submission

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

            // Store the timestamp when the bond was created
            const currentTime = new Date().getTime();
            localStorage.setItem('lastBondCreationTime', currentTime.toString());

            // Set the timer to 5 minutes
            setTimeRemaining(5 * 60);
            setBondCreated(true);

            toast.success('Bond Issued. You can create another bond after 5 minutes.')
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

  // Modal state is managed by the Dialog component directly

  // Wrap fetchNfts in useCallback to prevent it from changing on every render
  const fetchNfts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/wallets/assets/${accounts[0]?.address}`,
      )
      setNfts(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [accounts])
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
  }, [accounts, fetchNfts])
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
              <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-5 gap-6 sm:gap-7 p-4 sm:p-10 border-2 border-brand5 flex flex-col justify-start items-start">
                <div className="z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-0">
                  <div className="w-full">
                    <span className="text-[28px] sm:text-[40px] leading-[130%] font-semibold text-amber-50 text-center md:text-left block">
                      Create a Bond
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center w-full sm:w-auto">
                    {bondCreated && (
                      <Card className="flex flex-col gap-1 items-start justify-center bg-[rgba(0,0,0,0.30)] rounded-[15px] border border-[rgba(255,255,255,0.15)] px-4 py-3 w-full sm:w-auto">
                        <div className="flex flex-row gap-[8px] items-center">
                          <BookDown className="text-brand5" />
                          <div className="text-brand5 text-base font-medium">
                            NEXT BOND IN
                          </div>
                        </div>
                        <div className="text-white text-2xl font-bold">
                          {formattedTime}
                        </div>
                        <div className="text-[#ac97de] text-xs font-normal">
                          Please wait to create another bond
                        </div>
                      </Card>
                    )}

                    {/* Info Card */}
                    {/* <Card className="flex flex-col gap-1.5 items-start justify-start bg-[rgba(0,0,0,0.20)] rounded-[15px] border border-[rgba(255,255,255,0.12)]  px-5 py-3">
                      <div className="flex flex-row gap-[11px] items-center">
                        <Info className='text-purple-400' />
                        <div className="text-[#ac97de] text-base font-normal uppercase">Only One Bond Allowed</div>
                      </div>
                      <div className="text-white text-xl font-normal"></div>
                    </Card> */}
                  </div>
                </div>
                <div className="text-white text-base sm:text-xl leading-[130%] font-normal text-center sm:text-left w-full z-50">
                  Start simple and learn as you go. You can always evolve your DAO in the future
                </div>
              </div>



              <div className="p-5 z-50">
                <div className="flex flex-col w-full space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 z-50">
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
                        // min={new Date().toISOString().split('T')[0]}
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
                      <SelectTrigger className="w-full h-14">
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
                      <SelectTrigger className="w-full h-14">
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

                  <div className="flex flex-col items-center z-50 py-4 gap-2">
                    <div className="w-full text-center mb-2">
                      {bondCreated && (
                        <p className="text-brand6 font-medium">
                          Wait time: {formattedTime} before creating another bond
                        </p>
                      )}
                    </div>
                    <div className="flex items-center z-50 py-4 justify-end">
                      <Button
                        className="flex-1 rounded-full p-3 h-14 w-[300px] text-xl z-50 py-4 text-white "
                        variant="brand"
                        onClick={() => setOpen(!open)}
                        disabled={bondCreated || !isFormComplete}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="max-w-2xl bg-[rgba(169,126,255,0.2)] text-white backdrop-blur-md border border-brand3 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Confirm Submission</h2>
            <p className="mb-4 text-white/90">Review the details below before submitting:</p>

            <div className="p-4 text-left max-h-96 overflow-y-auto rounded-md bg-[rgba(133,115,170,0.2)] ">
              <ul className="space-y-2 px-2">
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
              </ul>
            </div>

            <div className="flex items-center justify-end  space-x-4">
              <Button
                variant="brand"
                disabled={loading || bondCreated}
                onClick={handleformSubmit}
              >
                {bondCreated ? 'Wait 5 Minutes' : 'Confirm'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default BondIssue
