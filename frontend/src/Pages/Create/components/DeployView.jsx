import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { useAccount } from '@/AccountContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore'

import extractTransactionsData from '@/utils/TranscationsRecipt'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import useModalStore from '@/store/modal'
import ReceiptModal from '@/Pages/components/ReceiptModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
const DeployView = () => {
  const navigate = useNavigate()
  const { accounts } = useAccount()
  const { formFields, setFormFields, resetFormFields } = useTokenWeightStore()
  const [Recipt, setRecipt] = useState(null)
  const sendTransaction = useSendTransaction()
  const [manifest, setManifest] = useState('')
  const { successOpen, setSuccessOpen } = useModalStore()
  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState([])

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setFormFields({ userAddress: accounts[0].address }) // Set the userAddress
    }
  }, [accounts, setFormFields])
  const handleClaimToken = async () => {
    console.log('selectedAccount:', accounts[0].address)

    if (!accounts[0].address) {
      alert('Please select an account first.')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/build/deploy_token_weighted_dao`,
        formFields,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      console.log(response.data)
      setManifest(response.data)

      const { receipt } = await sendTransaction(response.data).finally(() =>
        setLoading(false),
      )

      let txId = receipt.transaction.intent_hash

      if (txId) {
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

        // Step 4: Extract transaction data
        const recipt = await extractTransactionsData(txId)
        console.log(recipt)
        setRecipt(() => recipt)

        // Step 5: Open success modal
        setSuccessOpen(true)

        // Optional: Community registration code can be included here if needed
        /*
        let communityPostBody = {
          name: organizationName,
          component_address: "not defined",
          description: organizationDescription,
          owner_address: accounts[0].address,
        };
  
        const communityResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/community`,
          communityPostBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log(communityResponse.data);
        */
      } else {
        throw new Error('Transaction ID not found')
      }
    } catch (error) {
      console.error('Error occurred:', error)
      window.alert(error.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false) // Ensure loading state is reset
    }
  }

  const handleDeploy = () => {
    console.log(formFields)
    resetFormFields()
    navigate('/')
  }

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blueprint`,
        )
        setData(res.data)
      } catch (error) {
        console.error('Error fetching blueprint data:', error)
      }
    }
    fetchBluePrint()
  }, [])

  if (!accounts || accounts.length === 0 || !data) {
    navigate('/')
    return null
  }

  const allFieldsFilled = () => {
    return (
      formFields.communityName.trim() !== '' &&
      formFields.description.trim() !== '' &&
      formFields.communityImage.trim() !== '' &&
      formFields.tokenImage.trim() !== '' &&
      formFields.tokenSupply > 0 &&
      formFields.tokenPrice > 0 &&
      formFields.tokenWithDrawPrice > 0
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const numericValue = parseFloat(value)

    if (name === 'tokenWithDrawPrice') {
      if (numericValue > parseFloat(formFields.tokenPrice)) {
        toast.error('Token Withdraw Price cannot be greater than Token Price')
        return
      }
    }

    if (name === 'tokenPrice') {
      if (parseFloat(formFields.tokenWithDrawPrice) > numericValue) {
        setFormFields({
          [name]: value,
          tokenWithDrawPrice: value
        })
        return
      }
    }

    setFormFields({ [name]: value })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger></DialogTrigger>
        <DialogContent className="bg-brand1 rounded-[20px] w-full  max-w-5xl flex flex-col gap-7 border border-[#5228A4] max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader >
            {/* <DialogTitle>This is all info?</DialogTitle> */}
          </DialogHeader>
          {/* Displaying the current form fields with images */}
          <div className="space-y-2 text-gray-200 text-lg ">
            <div>
              <strong>Community Name:</strong> {formFields.communityName}
            </div>
            <div>
              <strong>Description:</strong> {formFields.description}
            </div>
            <div>
              <strong>Token Name:</strong> {formFields.community_token_name}
            </div>
            <div className="grid grid-cols-2 gap-10 pb-12 ">
              <div>
                <div className='font-medium my-2'>Community Image</div>
                {formFields.communityImage && (
                  <img
                    src={formFields.communityImage}
                    alt="Community Image"
                    className="size-10  aspect-video object-cover h-full w-full rounded-lg border"
                  />
                )}
              </div>
              <div>
                <div className='font-medium my-2'>Token Image</div>
                {formFields.tokenImage && (
                  <img
                    src={formFields.tokenImage}
                    alt="Token Image"
                    className="size-10  aspect-video object-cover h-full w-full rounded-lg border"
                  />
                )}
              </div>
            </div>

            <div className=''>
              <strong>Token Supply:</strong> {formFields.tokenSupply} XRD
            </div>
            <div>
              <strong>Token Price:</strong> {formFields.tokenPrice} XRD
            </div>
            <div>
              <strong>Who can Vote:</strong> {formFields.proposal_right}
            </div>
            <div className='capitalize'>
              <strong>Purpose:</strong> {formFields.purpose}
            </div>
            <div>
              <strong>Token Withdraw Price:</strong>{' '}
              {formFields.tokenWithDrawPrice}
            </div>
            <div>
              {formFields.tags.length > 0 && (
                <div>
                  <strong>Tags:</strong>{' '}
                  {formFields.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-brand2 rounded-lg mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {loading ? (
            // <Button variant="radix" className="w-full" disabled>
            //   Deploying....
            // </Button>
            <button
              className="w-full text-xl rounded-full py-2 text-white font-semibold shadow-inner bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:bg-gradient-to-b hover:from-[#C0A1FF]
             hover:to-[#391483] disabled:bg-slate-900 disabled:cursor-not-allowed "
              disabled>
              Deploying....
            </button>
          ) : (
            // <Button
            //   variant="radix"
            //   className="w-full"
            //   disabled={!allFieldsFilled()}
            //   onClick={handleClaimToken}
            // >
            //   Deploy
            // </Button>
            <button
              variant="radix"

              type="button"
              disabled={!allFieldsFilled()}
              onClick={handleClaimToken}
              className="w-full text-xl rounded-full py-2 text-white font-semibold shadow-inner bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] disabled:bg-slate-900 disabled:cursor-not-allowed "
            >
              Deploy
            </button>
          )}
        </DialogContent>
      </Dialog>

      <ReceiptModal>
        {Recipt ? (
          <div className="w-full ">
            <Recipt className="w-full relative bg-red-500" />
          </div>
        ) : (
          ''
        )}
      </ReceiptModal>
      <div className='bg-[#100821] min-h-screen flex flex-col items-center justify-center'>
        <div className="h-[42px] relative w-full ">
          <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] h-[42px]"></div>
          <div className="rounded-[300px] w-[98%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
          <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
        </div>
        <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-[1221px] h-[147px] z-50 mt-10  border border-[#5228A4] flex flex-col justify-start items-start mb-10">
          <div className=" ms-6 mt-7  text-[40px] leading-[130%] font-semibold text-start">

            <span>
              <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -3 :</span>
              <span className="step-2-describe-your-dao-span2"></span>
              <span className="step-2-describe-your-dao-span3 text-amber-50"> Deploy Your Community</span>
            </span>
          </div>
          <div className="text-[#ffffff] text-xl ms-6 mt-4 leading-[130%] font-normal text-center">
            Start simple and learn as you go. You can always evolve your DAO in the future
          </div>
        </div>


        <div className="w-[1221px] mx-auto pt-10 gap-15 z-50 text-white shadow-lg rounded-lg  ">
          <div className="w-full gap-2.5  py-7 ">
            <label className="text-white text-2xl leading-[120%] mb-6  font-medium ">
              Token Supply:
            </label>
            <input
              type="number"
              name="tokenSupply"
              placeholder="Enter Token Supply"
              value={formFields.tokenSupply}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] mt-5 rounded-md text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="w-full gap-2.5 pb-8">
            <label className="text-white text-2xl leading-[120%] font-medium ">
            Token Price In XRD :
            </label>
            <input
              type="number"
              name="tokenPrice"
              placeholder="Enter Token Price"
              value={formFields.tokenPrice}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5  text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="w-full gap-2.5">
            <label className="text-white text-2xl leading-[120%] font-medium">
            Token Buy Back Price In XRD:
            </label>
            <input
              type="number"
              name="tokenWithDrawPrice"
              placeholder="Enter Token Withdraw Price"
              value={formFields.tokenWithDrawPrice}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5 text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-row text-2xl gap-6 mt-10 w-full">
            <button
              type="button"
              className="flex-1 bg-primary-500 rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
            >
              Back
            </button>
            {loading ? (
              <button
                type="button"
                className="flex-1 rounded-2xl p-3 text-white font-semibold bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] shadow-inner opacity-50 cursor-not-allowed"
                disabled
              >
                Deploying...
              </button>
            ) : (
              <button
                type="submit"
                className={`flex-1 rounded-2xl p-3 text-white font-semibold hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] shadow-inner ${!allFieldsFilled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!allFieldsFilled()}
                onClick={() => setOpen(true)}
              >
                Deploy
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default DeployView
