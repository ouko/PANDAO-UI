import { useEffect, useState } from 'react'
import { useAccount } from '@/AccountContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore'
import useViewStore from '@/store/view'

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
  const { formFields, setFormFields } = useTokenWeightStore()
  const [Recipt, setRecipt] = useState(null)
  const sendTransaction = useSendTransaction()
  // Using setManifest in handleClaimToken function
  const [, setManifest] = useState('')
  // Using setSuccessOpen in handleClaimToken function
  const { setSuccessOpen } = useModalStore()
  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState([])
  const [agreed, setAgreed] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(true);
  const [governanceDialogOpen, setGovernanceDialogOpen] = useState(false);
  const { setView } = useViewStore();

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
      // Create a deep copy of formFields to modify
      const formData = JSON.parse(JSON.stringify(formFields));
      
      // Convert datetime strings to timestamps
      if (formData.airDrop && formData.airDrop.airDropStartTime) {
        formData.airDrop.airDropStartTime = new Date(formData.airDrop.airDropStartTime).getTime() / 1000;
      }
      
      if (formData.airDrop && formData.airDrop.airDropEndTime) {
        formData.airDrop.airDropEndTime = new Date(formData.airDrop.airDropEndTime).getTime() / 1000;
      }
      
      // Ensure governance.passThresholdPercentage is at least 50
      if (formData.governance && formData.governance.passThresholdPercentage) {
        const passThreshold = Number(formData.governance.passThresholdPercentage);
        if (passThreshold < 50) {
          formData.governance.passThresholdPercentage = '50';
        }
      }
      
      // Log the full URL for debugging
      const deployUrl = `${import.meta.env.VITE_BACKEND_URL}/manifest/build/deploy-dao`;
      console.log('Deploying to URL:', deployUrl);
      console.log('Form data being sent:', formData);
      
      const response = await axios.post(
        deployUrl,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('Response data:', response.data);
      setManifest(response.data)

      const { receipt } = await sendTransaction(response.data).finally(() =>
        setLoading(false),
      )

      let txId = receipt.transaction.intent_hash

      if (txId) {
        // Step 1: Extract transaction data first to get component addresses
        const recipt = await extractTransactionsData(txId)
        console.log('Transaction receipt:', recipt)
        setRecipt(() => recipt)

        // Step 2: Extract component address from receipt
        // This assumes extractTransactionsData returns component addresses in a specific format
        // You may need to adjust this based on your actual receipt structure
        const componentAddresses = recipt.componentAddresses || [];
        const componentAddress = componentAddresses.length > 0 ? componentAddresses[0] : null;
        
        // If we don't have a component address from the receipt, check other receipt properties
        // This is a fallback mechanism - modify according to your actual receipt structure
        const fallbackAddress = 
          componentAddress || 
          recipt.newComponents?.[0]?.address || 
          recipt.entities?.[0]?.address ||
          recipt.resources?.[0]?.resourceAddress;
        
        console.log('Extracted component address:', fallbackAddress);
        
        // Step 3: Submit transaction ID to backend
        const submitResponse = await axios.post(
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

        console.log('Submit TX response:', submitResponse.data)

        // Step 4: Register community with the actual component address
        // Only proceed if we have a valid component address
        if (fallbackAddress && fallbackAddress !== 'undefined') {
          let communityPostBody = {
            name: formFields.communityName,
            component_address: fallbackAddress,
            description: formFields.description,
            blueprint_slug: formFields.blueprint_slug || 'token_weighted_dao',
            owner_token_address: fallbackAddress, // This might need to be a different address from the receipt
            image: formFields.communityImage,
            owner_address: accounts[0].address,
            funds: 0,
            purpose: formFields.purpose || 'governance',
            executive_badge_address: fallbackAddress, // This might need to be a different address from the receipt
            is_featured: true,
            is_disabled_by_admin: false,
            created_on_blockchain: true
          };

          try {
            const communityResponse = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/community`,
              communityPostBody,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            console.log('Community registration response:', communityResponse.data);
            toast.success('Community registered successfully!');
          } catch (communityError) {
            console.error('Error registering community:', communityError);
            toast.error('Community deployment succeeded, but registration failed: ' + 
              (communityError.response?.data?.detail || communityError.message));
          }
        } else {
          console.warn('No valid component address found in transaction receipt');
          toast.warning('DAO deployed, but no component address was found. Community registration skipped.');
        }

        // Step 5: Open success modal
        setSuccessOpen(true);
        
      } else {
        throw new Error('Transaction ID not found')
      }
    } catch (error) {
      console.error('Error occurred:', error)
      toast.error(error.response?.data?.detail || error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false) // Ensure loading state is reset
    }
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
      formFields.governance.proposalThreshold > 0 &&
      formFields.governance.quorumPercentage > 0 &&
      formFields.governance.votingPeriodDays > 0 &&
      formFields.governance.passThresholdPercentage > 0 &&
      formFields.governance.proposal_right.trim() !== '' &&
      formFields.governance.proposal_minimum_token > 0
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    // For fields inside token
    const tokenFields = ['tokenSupply', 'tokenPrice', 'tokenWithDrawPrice', 'tokenImageUrl', 'name', 'symbol'];

    if (tokenFields.includes(name)) {
      // Validation for tokenWithDrawPrice and tokenPrice
      if (name === 'tokenWithDrawPrice') {
        if (numericValue > parseFloat(formFields.token.tokenPrice)) {
          toast.error('Token Withdraw Price cannot be greater than Token Price');
          return;
        }
      }
      if (name === 'tokenPrice') {
        if (parseFloat(formFields.token.tokenWithDrawPrice) > numericValue) {
          setFormFields({
            token: {
              ...formFields.token,
              [name]: value,
              tokenWithDrawPrice: value
            }
          });
          return;
        }
      }
      setFormFields({
        token: {
          ...formFields.token,
          [name]: value
        }
      });
      return;
    }

    // For fields inside governance
    const governanceFields = ['proposalThreshold', 'quorumPercentage', 'votingPeriodDays', 'passThresholdPercentage', 'proposal_right', 'proposal_minimum_token'];
    
    if (governanceFields.includes(name)) {
      setFormFields({
        governance: {
          ...formFields.governance,
          [name]: value
        }
      });
      return;
    }

    // For all other fields
    setFormFields({ [name]: value });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="bg-[rgba(169,126,255,0.34)] text-white backdrop-blur-md rounded-[20px] w-full max-w-5xl flex flex-col gap-7 border border-[#5228A4] max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>

          </DialogHeader>

          <div className="space-y-2 text-gray-200 text-lg">
  {/* Basic Info */}
  <div className="space-y-8 text-gray-200 text-base">
  {/* Images */}
  <div className="grid grid-cols-2 gap-10 pb-12">
    <div>
      <div className="font-medium my-2">Community Image</div>
      {formFields.communityImage && (
        <img
          src={formFields.communityImage}
          alt="Community"
          className="size-10 aspect-video object-contain h-full w-full rounded-lg border"
        />
      )}
    </div>
    <div>
      <div className="font-medium my-2">Token Image</div>
      {formFields.token.tokenImageUrl && (
        <img
          src={formFields.token.tokenImageUrl}
          alt="Token"
          className="size-10 aspect-video object-contain h-full w-full rounded-lg border"
        />
      )}
    </div>
  </div>

  {/* Basic Info */}
  <div>
    <div className="text-xl text-brand6 font-semibold pb-2">Basic Information</div>
    <div><strong>User Address:</strong> {formFields.userAddress}</div>
    <div><strong>Community Name:</strong> {formFields.communityName}</div>
    <div><strong>Description:</strong> {formFields.description}</div>
    <div><strong>Purpose:</strong> {formFields.purpose}</div>
    <div><strong>Tags:</strong> {formFields.tags.join(', ')}</div>
    <div><strong>Package Address:</strong> {formFields.package_addr}</div>
  </div>

  {/* Token Info */}
  <div>
    <div className="text-xl text-brand6 font-semibold pb-2">Token Details</div>
    <div><strong>Name:</strong> {formFields.token.name}</div>
    <div><strong>Symbol:</strong> {formFields.token.symbol}</div>
    <div><strong>Is Mintable:</strong> {formFields.token.isMintable ? 'Yes' : 'No'}</div>
    <div><strong>Total Supply:</strong> {formFields.token.totalSupply}</div>
    <div><strong>Token Supply:</strong> {formFields.token.tokenSupply}</div>
    <div><strong>Token Price:</strong> {formFields.token.tokenPrice}</div>
    <div><strong>Withdraw Price:</strong> {formFields.token.tokenWithDrawPrice}</div>
  </div>

  {/* Metadata */}
  <div>
    <div className="text-xl text-brand6 font-semibold pb-2">Metadata</div>
    <div><strong>Website:</strong> {formFields.metaData.website}</div>
    <div><strong>Discord:</strong> {formFields.metaData.discord}</div>
    <div><strong>Telegram:</strong> {formFields.metaData.telegram}</div>
    <div><strong>Forum:</strong> {formFields.metaData.forum}</div>
  </div>

  {/* Airdrop Info */}
  <div>
    <div className="text-xl text-brand6 font-semibold pb-2">Airdrop Settings</div>
    <div><strong>Public Sale:</strong> {formFields.airDrop.publicSale}</div>
    <div><strong>Founding Team:</strong> {formFields.airDrop.foundingTeam}</div>
    <div><strong>Treasury:</strong> {formFields.airDrop.treasury}</div>
    <div><strong>Community Incentives:</strong> {formFields.airDrop.communityIncentives}</div>
    <div><strong>Airdrop Start Time:</strong> {formFields.airDrop.airDropStartTime}</div>
    <div><strong>Airdrop End Time:</strong> {formFields.airDrop.airDropEndTime}</div>
    <div><strong>Amount per Airdrop:</strong> {formFields.airDrop.amount_per_air_drop}</div>
  </div>

  {/* Governance Info */}
  <div>
    <div className="text-xl text-brand6 font-semibold pb-2">Governance Settings</div>
    <div><strong>Proposal Threshold:</strong> {formFields.governance.proposalThreshold}</div>
    <div><strong>Quorum Percentage:</strong> {formFields.governance.quorumPercentage}%</div>
    <div><strong>Voting Period:</strong> {formFields.governance.votingPeriodDays} days</div>
    <div><strong>Pass Threshold:</strong> {formFields.governance.passThresholdPercentage}%</div>
    <div><strong>Who can Propose:</strong> {formFields.governance.proposal_right}</div>
    <div><strong>Minimum Tokens to Propose:</strong> {formFields.governance.proposal_minimum_token}</div>
  </div>
</div>

</div>


          <div className="flex items-start gap-3 text-sm text-gray-300 border-t border-gray-600 pt-6">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1 accent-brand2"
              disabled={!hasReadTerms}
            />
            <label htmlFor="terms">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setTermsDialogOpen(true)}
                className="underline text-brand4 hover:text-brand5"
              >
                Terms & Conditions
              </button>{' '}
              and acknowledge that once the Community is deployed, it cannot be modified or reversed.
              {!hasReadTerms && (
                <span className="block text-amber-400 mt-1">
                  Please read the Terms & Conditions first
                </span>
              )}
            </label>
          </div>


          {loading ? (
            <button
              className="w-full text-xl rounded-full py-2 text-white font-semibold shadow-inner bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:bg-gradient-to-b hover:from-[#C0A1FF]
          hover:to-[#391483] disabled:bg-brand3 disabled:cursor-not-allowed"
              disabled
            >
              Deploying....
            </button>
          ) : (
            <button
              type="button"
              disabled={!allFieldsFilled() || !agreed}
              onClick={handleClaimToken}
              className="w-full text-xl rounded-full py-2 text-white font-semibold shadow-inner bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] disabled:bg-brand3 disabled:cursor-not-allowed"
            >
              Deploy
            </button>
          )}
        </DialogContent>
      </Dialog>

      {/* Terms and Conditions Dialog */}
      <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>
        <DialogContent className="bg-[rgba(169,126,255,0.34)] backdrop-blur-md rounded-[20px] w-full max-w-4xl flex flex-col gap-7 border border-[#5228A4] max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Terms & Conditions</DialogTitle>
            <DialogDescription className="text-gray-300">
              Please read these terms carefully before deploying your community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-gray-200 text-md overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>
              Welcome to PANDAO. By using our platform, you agree to these Terms & Conditions, which constitute a legally binding agreement between you and PANDAO.
            </p>

            <h2 className="text-xl font-semibold text-white">2. Community Deployment</h2>
            <p>
              When you deploy a community on PANDAO:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You understand that blockchain transactions are immutable and cannot be reversed.</li>
              <li>The community structure, token economics, and governance parameters you set during deployment will be permanent.</li>
              <li>You take full responsibility for the configuration of your community.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white">3. Token Issuance</h2>
            <p>
              When issuing tokens through our platform:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for ensuring compliance with all applicable laws and regulations in your jurisdiction.</li>
              <li>PANDAO does not guarantee the value, utility, or legality of any tokens issued through our platform.</li>
              <li>Token economics parameters (supply, price, etc.) cannot be modified after deployment.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white">4. Governance</h2>
            <p>
              Community governance is determined by the parameters you set during deployment:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Voting rights, proposal mechanisms, and decision-making processes are established at creation.</li>
              <li>PANDAO is not responsible for governance decisions made within your community.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white">5. Limitation of Liability</h2>
            <p>
              PANDAO shall not be liable for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Any financial losses related to token value fluctuations.</li>
              <li>Community governance decisions or disputes.</li>
              <li>Technical issues with the underlying blockchain network.</li>
              <li>Regulatory changes that may affect your community or tokens.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white">6. Acknowledgment</h2>
            <p>
              By deploying a community, you acknowledge that you have read, understood, and agree to these terms. You also confirm that you understand the permanent nature of blockchain deployments and accept full responsibility for your community configuration.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-gray-600">
            <button
              type="button"
              onClick={() => {
                setHasReadTerms(true);
                setTermsDialogOpen(false);
              }}
              className="w-full text-xl rounded-full py-2 text-white font-semibold shadow-inner bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483]"
            >
              I Have Read and Understood
            </button>
          </div>
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
      <div className="z-50 container mx-auto flex flex-col items-center justify-center mt-10 w-full px-4">
  {/* Progress Bar */}
  <div className="h-[42px] relative w-full">
    <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] w-full h-[42px]"></div>
    <div className="rounded-[300px]  w-[98%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
    <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
  </div>

  {/* Step Section */}
  <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-10 gap-4 p-6 md:p-10 border border-[#5228A4] flex flex-col items-start mb-10">
    <div className="text-2xl md:text-4xl font-semibold text-start text-white">
      <span className="text-[#AE85FF]">STEP -6 :</span>{' '}
      <span className="text-amber-50">Deploy Your Community</span>
    </div>
    <div className="text-[#ffffff] text-base md:text-xl font-normal text-center">
      Start simple and learn as you go. You can always evolve your DAO in the future
    </div>
  </div>


        <div className="w-full max-w-screen-lg text-white mx-auto pt-6 md:pt-10 gap-4 shadow-lg rounded-lg space-y-6 ">
          
          
          <div className="w-full mt-10 mb-6">
          </div>
          
          <div className="w-full gap-2.5 pb-8">
            <label className="text-white text-2xl leading-[120%] font-medium">
              Proposal Threshold:
            </label>
            <input
              type="number"
              name="proposalThreshold"
              placeholder="Enter Proposal Threshold"
              value={formFields.governance.proposalThreshold}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5 text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          
          <div className="w-full gap-2.5 pb-8">
            <label className="text-white text-2xl leading-[120%] font-medium">
              Quorum Percentage:
            </label>
            <input
              type="number"
              name="quorumPercentage"
              placeholder="Enter Quorum Percentage"
              value={formFields.governance.quorumPercentage}
              onChange={handleInputChange}
              required
              min="0"
              max="100"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5 text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          
          <div className="w-full gap-2.5 pb-8">
            <label className="text-white text-2xl leading-[120%] font-medium">
              Voting Period (Days):
            </label>
            <input
              type="number"
              name="votingPeriodDays"
              placeholder="Enter Voting Period in Days"
              value={formFields.governance.votingPeriodDays}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5 text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          
          <div className="w-full gap-2.5 pb-8">
            <label className="text-white text-2xl leading-[120%] font-medium">
              Pass Threshold Percentage:
            </label>
            <input
              type="number"
              name="passThresholdPercentage"
              placeholder="Enter Pass Threshold Percentage"
              value={formFields.governance.passThresholdPercentage}
              onChange={handleInputChange}
              required
              min="0"
              max="100"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5 text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          
          <div className="w-full gap-2.5 pb-8">
            <label className="text-white text-2xl leading-[120%] font-medium">
              Who Can Propose:
            </label>
            <select
              name="proposal_right"
              value={formFields.governance.proposal_right}
              onChange={handleInputChange}
              required
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5 text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              <option value="">Select who can propose</option>
              <option value="all_members">All Members</option>
              <option value="token_holders">Token Holders Only</option>
              <option value="council_members">Council Members Only</option>
            </select>
          </div>
          
          <div className="w-full gap-2.5">
            <label className="text-white text-2xl leading-[120%] font-medium">
              Minimum Tokens to Propose:
            </label>
            <input
              type="number"
              name="proposal_minimum_token"
              placeholder="Enter Minimum Tokens Required to Propose"
              value={formFields.governance.proposal_minimum_token}
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
              onClick={() => setView('6')}
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
                className={`flex-1 rounded-2xl p-3 text-white font-semibold hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] shadow-inner ${!allFieldsFilled() ? 'opacity-50' : ''}`}
                onClick={() => {
                  if (allFieldsFilled()) {
                    setOpen(true);
                  } else {
                    setGovernanceDialogOpen(true);
                  }
                }}
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
