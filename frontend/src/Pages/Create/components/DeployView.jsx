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
import { Coins, ImageIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-white border-b border-purple-900/50 pb-2 flex items-center gap-2">
      {title}
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="space-y-1">
    <div className="text-sm font-medium text-purple-300">{label}</div>
    <div className="text-white text-base font-normal">
      {typeof value === 'string' || typeof value === 'number' ? value : value}
    </div>
  </div>
);
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
  <DialogContent className="bg-[#0F0828] text-white backdrop-blur-md rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-2 border-[#2A1B5E]">
    <div className="p-8">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Review & Deploy
        </DialogTitle>
        <DialogDescription className="text-gray-300 mt-2">
          Please review all details before deploying your community
        </DialogDescription>
      </DialogHeader>

      <div className="mt-8 space-y-10">
        {/* Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Community Image
            </h3>
            {formFields.communityImage && (
              <div className="relative aspect-video rounded-xl border-2 border-purple-900/50 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <img
                  src={formFields.communityImage}
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
              <Coins className="h-5 w-5" /> Token Image
            </h3>
            {formFields.token.tokenImageUrl && (
              <div className="relative aspect-square w-32 h-32 rounded-xl border-2 border-purple-900/50 overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <img
                  src={formFields.token.tokenImageUrl}
                  alt="Token"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Basic Info */}
          <Section title="Basic Information">
            <InfoItem label="Community Name" value={formFields.communityName} />
            <InfoItem label="Description" value={formFields.description} />
            <InfoItem label="Purpose" value={formFields.purpose} />
            <InfoItem 
              label="Tags" 
              value={
                <div className="flex flex-wrap gap-2 mt-1">
                  {formFields.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-200 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              } 
            />
          </Section>

          {/* Token Info */}
          <Section title="Token Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Name" value={formFields.token.name} />
              <InfoItem label="Symbol" value={formFields.token.symbol} />
              <InfoItem 
                label="Total Supply" 
                value={`${Number(formFields.token.totalSupply).toLocaleString()} ${formFields.token.symbol}`} 
              />
              <InfoItem 
                label="Token Price" 
                value={`${formFields.token.tokenPrice} SUI`} 
              />
            </div>
          </Section>

          {/* Airdrop Info */}
          <Section title="Airdrop Distribution">
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem 
                  label="Public Sale" 
                  value={`${formFields.airDrop.publicSale}%`} 
                />
                <InfoItem 
                  label="Founding Team" 
                  value={`${formFields.airDrop.foundingTeam}%`} 
                />
                <InfoItem 
                  label="Treasury" 
                  value={`${formFields.airDrop.treasury}%`} 
                />
                <InfoItem 
                  label="Community Incentives" 
                  value={`${formFields.airDrop.communityIncentives}%`} 
                />
              </div>
              <div className="mt-4 bg-purple-900/20 p-4 rounded-lg">
                <InfoItem 
                  label="Amount per Airdrop" 
                  value={`${formFields.airDrop.amount_per_air_drop} ${formFields.token.symbol}`} 
                />
                <InfoItem 
                  label="Airdrop Period" 
                  value={`${new Date(formFields.airDrop.airDropStartTime).toLocaleString()} - ${new Date(formFields.airDrop.airDropEndTime).toLocaleString()}`} 
                />
              </div>
            </div>
          </Section>

          {/* Governance Info */}
          <Section title="Governance Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem 
                label="Proposal Threshold" 
                value={`${formFields.governance.proposalThreshold} ${formFields.token.symbol}`} 
              />
              <InfoItem 
                label="Quorum" 
                value={`${formFields.governance.quorumPercentage}%`} 
              />
              <InfoItem 
                label="Voting Period" 
                value={`${formFields.governance.votingPeriodDays} days`} 
              />
              <InfoItem 
                label="Pass Threshold" 
                value={`${formFields.governance.passThresholdPercentage}%`} 
              />
              <InfoItem 
                label="Proposal Rights" 
                value={formFields.governance.proposal_right.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')} 
              />
            </div>
          </Section>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-[#1A0F3A] p-6 rounded-xl border border-purple-900/50">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={() => setAgreed(!agreed)}
                className="h-5 w-5 border-2 border-purple-400 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500 bg-[#1A0F3A]"
                disabled={!hasReadTerms}
              />
            </div>
            <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setTermsDialogOpen(true)}
                className="text-purple-300 hover:text-white font-medium underline underline-offset-4"
              >
                Terms & Conditions
              </button>{' '}
              and acknowledge that once the Community is deployed, it cannot be modified or reversed.
              {!hasReadTerms && (
                <div className="mt-2 text-amber-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Please read the Terms & Conditions first</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Deploy Button */}
        <div className="pt-4">
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
        </div>
      </div>
    </div>
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
  <div className="h-[42px] relative w-full overflow-hidden">
    <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] w-full h-[42px]"></div>
    <div className="rounded-[300px]  w-[94%] md:w-[98%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
    <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
  </div>

  {/* Step Section */}
  <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-10 gap-4 p-6 md:p-10 border border-[#5228A4] flex flex-col items-start mb-10">
    <div className="text-2xl md:text-4xl font-semibold text-start text-white">
      <span className="text-[#AE85FF]">STEP -6 :</span>{' '}
      <span className="text-amber-50">Deploy Your Community</span>
    </div>
    <div className="text-[#ffffff] text-base md:text-xl font-normal text-left">
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
