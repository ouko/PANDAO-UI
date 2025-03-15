import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import useViewStore from '@/store/view'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { useAccount } from '@/AccountContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore'
import CommunityImageUrl from '@/Pages/components/CommunityImageUrl'
import TokenImageURL from '@/Pages/components/TokenImage'
import {
  Select as Select2,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Select from 'react-select' // Import react-select

const DescribeView = () => {
  const { setView } = useViewStore()
  const navigate = useNavigate()
  const { accounts } = useAccount()
  const { formFields, setFormFields } = useTokenWeightStore()
  const [data, setData] = useState([])
  const [predefinedTags, setPreDefinedTags] = useState([])

  // const predefinedTags = [
  //   { value: 'blockchain', label: 'Blockchain' },
  //   { value: 'web3', label: 'Web3' },
  //   { value: 'nft', label: 'NFT' },
  //   { value: 'defi', label: 'DeFi' },
  //   { value: 'community', label: 'Community' },
  // ]

  const handleUrlId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`
    setFormFields({ communityImage: url })
  }

  const handleTokenUrl = (id2) => {
    const url2 = `https://ucarecdn.com/${id2}/-/preview/1000x562/`
    setFormFields({ tokenImage: url2 })
  }

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setFormFields({ userAddress: accounts[0].address }) // Set the userAddress
    }
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tags`,
        )
        console.log(res.data)
        const updatedData = res.data.map(item => ({
          ...item,
          value: item.name,
          label: item.name
        }))
        setPreDefinedTags(updatedData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTags()
  }, [accounts, setFormFields])

  const handleViewChange = () => {
    setView('4')
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
      formFields.purpose.trim() !== '' &&
      formFields.tags &&
      formFields.tags.length > 0 &&
      formFields.proposal_right.trim() !== ''
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormFields({ [name]: value })
  }

  const handleDaoPurposeChange = (value) => {
    setFormFields({ purpose: value })
  }

  const handleDaoPrposalCreator = (value) => {
    if (value === 'TokenHolder') {
      setFormFields({ proposal_right: value })
    } else {
      setFormFields({ proposal_right: value })
      setFormFields({ proposal_minimum_token: 0 })
    }
  }
  const handleTagsChange = (selectedTags) => {
    const labels = selectedTags.map((tag) => tag.label)
    console.log(labels, "asdasd");
    setFormFields({ tags: labels })
  }
  const selectedTags = formFields.tags
    ? formFields.tags
      .map((label) => predefinedTags.find((tag) => tag.label === label))
      .filter((tag) => tag)
    : []
  console.log(predefinedTags)
  return (
    <div className="bg-[#100821] min-h-screen font-[ClashDisplayVariable-Semibold,sans-serif]  flex flex-col items-center justify-center">
      {/* Step 2 Section */}
      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-[1221px] h-[147px] gap-7  border border-[#5228A4] flex flex-col justify-start items-start mb-10">
        <div className="font-[ClashDisplayVariable-Semibold,sans-serif] ms-6 mt-6 text-[40px] leading-[130%] font-semibold text-start">
          <Progress value={66} className="rounded-sm" />

          <span>
            <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -2 :</span>
            <span className="step-2-describe-your-dao-span2"></span>
            <span className="step-2-describe-your-dao-span3 text-amber-50">Describe your DAO</span>
          </span>
        </div>
        <div className="text-[#ffffff] font-[Inter-Regular,sans-serif] ms-6  text-xl leading-[130%] font-normal text-center">
          Start simple and learn as you go. You can always evolve your DAO in the future
        </div>
      </div>

      {/* Form Section */}
      <div className=" w-[1221px] mx-auto pt-10  gap-10 shadow-lg rounded-lg">

        <div className="space-y-4">
          {/* Community Name */}
          <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
            <label
              className="text-white text-left font-['ClashDisplayVariable-Medium',_sans-serif] text-2xl leading-[120%] font-medium relative self-stretch"
              for="community-name"
            >
              Community Name:
            </label>
            <div
              className="text-[#b59aec] text-left font-['ClashDisplayVariable-Regular',_sans-serif] text-sm leading-[120%] font-normal relative self-stretch"
            >
              Keep it short and simple.
            </div>
            <input
              name="communityName"
              value={formFields.communityName}
              onChange={handleInputChange}
              id="community-name"
              type="text"
              placeholder="Type your community's name..."
              className="bg-[#1B0D37] rounded-md border border-[#5228A4] p-4 self-stretch shrink-0 h-14  relative overflow-hidden text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs"
            />
          </div>


          {/* Description */}
          <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
            <label
              className="text-white text-left font-['ClashDisplayVariable-Medium',_sans-serif] text-2xl leading-[120%] font-medium relative self-stretch"
              for="community-description"
            >
              Community Description:
            </label>
            <div
              className="text-[#b59aec] text-left font-['ClashDisplayVariable-Regular',_sans-serif] text-sm leading-[120%] font-normal relative self-stretch"
            >
              Keep it short and simple.
            </div>
            <textarea
              name="description"
              value={formFields.description}
              onChange={handleInputChange}
              id="community-description"
              placeholder="Type your community's description..."
              className="bg-[#1B0D37] rounded-md border border-[#5228A4] p-4 self-stretch shrink-0 h-[126px] relative overflow-hidden text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs"
            ></textarea>
          </div>



          <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
            <label
              className="text-white text-left font-['ClashDisplayVariable-Medium',_sans-serif] text-2xl leading-[120%] font-medium relative self-stretch"
              for="community-token-name"
            >
              Community Token Name:
            </label>
            <div
              className="text-[#b59aec] text-left font-['ClashDisplayVariable-Regular',_sans-serif] text-sm leading-[120%] font-normal relative self-stretch"
            >
              What would you like to name your community token?
            </div>
            <input
              name="community_token_name"
              value={formFields.community_token_name}
              onChange={handleInputChange}
              required
              id="community-token-name"
              type="text"
              placeholder="Type your Community’s token Name..."
              className="bg-[#1B0D37] rounded-md border border-[#5228A4] p-4 self-stretch shrink-0 h-14 relative overflow-hidden text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs"
            />
          </div>


          {/* Image Uploads */}
          <div className="flex flex-row gap-8">
            {/* Community Image */}
            <div className="flex-1">
              <label className="text-white text-2xl leading-[120%] font-medium font-[ClashDisplayVariable-Medium,sans-serif]">
                Community Image URL:
              </label>
              <div className="bg-[#1B0D37] border border-[#5228A4] flex items-center h-[51px] w-full overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="communityImage"
                  onChange={handleUrlId}
                  required
                />
                <label
                  htmlFor="communityImage"
                  className="bg-[#1B0D37] p-4 flex-1 text-white text-left cursor-pointer"
                >
                  Choose Community Image
                </label>
                <label
                  htmlFor="communityImage"
                  className="bg-primary-500 cursor-pointer"
                >
                  <img className="w-[70px] h-[47px]" src="/pin.svg" alt="Upload" />
                </label>
              </div>
            </div>
            {/* Token Image */}
            <div className="flex-1">
              <label className="text-white text-2xl leading-[120%] font-medium font-[ClashDisplayVariable-Medium,sans-serif]">
                Token Image URL:
              </label>
              <div className="bg-[#1B0D37] border border-[#5228A4] flex items-center h-[51px] w-full overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="tokenImage"
                  onChange={handleTokenUrl}
                  required
                />
                <label
                  htmlFor="tokenImage"
                  className="bg-[#1B0D37] p-4 flex-1 text-white text-left cursor-pointer"
                >
                  Choose Token Image
                </label>
                <label
                  htmlFor="tokenImage"
                  className="bg-primary-500 cursor-pointer"
                >
                  <img className="w-[70px] h-[47px]" src="/pin.svg" alt="Upload" />
                </label>
              </div>
            </div>
          </div>

          {/* Purpose */}
          <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
            <label
              className="text-white text-left font-['ClashDisplayVariable-Medium',_sans-serif] text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="dao-purpose"
            >
              What is the purpose of creating that DAO:
            </label>
            <Select2 onValueChange={handleDaoPurposeChange}>
              <SelectTrigger className="w-full bg-[#1B0D37] rounded-md border border-[#5228A4] p-4 h-14 shadow-xs">
                <SelectValue placeholder="Select the purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="governance">Governance</SelectItem>
                <SelectItem value="communityBuilding">
                  Community Building
                </SelectItem>
                <SelectItem value="fundraising">Fundraising</SelectItem>
                <SelectItem value="socialImpact">Social Impact</SelectItem>
              </SelectContent>
            </Select2>
          </div>
          {/* Community Interests */}
          <div className="flex  flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
            <label className="text-white text-2xl leading-[120%] font-medium font-[ClashDisplayVariable-Medium,sans-serif]">
              Choose 5 communities you might be interested in:
            </label>
            <div className="flex flex-col gap-1 w-full">
              <span className="font-medium text-lg text-white px-1">Tags</span>
              <Select
                isMulti
                name="tags"
                options={predefinedTags}
                className="basic-multi-select  "
                classNamePrefix="select"
                value={selectedTags}
                onChange={handleTagsChange}
                placeholder="Select tags..."
                components={{
                  MultiValue: ({ data, removeProps }) => (
                    <div className="bg-brand2 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>{data.label}</span>
                      <button
                        {...removeProps}
                        className="text-white hover:text-red-500 focus:outline-none"
                      >
                        ✕
                      </button>
                    </div>
                  ),
                }}
              />

            </div>
          </div>

          {/* Proposal Rights */}
          <div className="flex flex-col gap-1 mt-4">
            <span className="text-white text-2xl leading-[120%] font-medium font-[ClashDisplayVariable-Medium,sans-serif]">Who can create Proposal:</span>
            <Select2 onValueChange={handleDaoPrposalCreator}>
              <SelectTrigger className="w-full bg-[#1B0D37] rounded-md border border-[#5228A4] p-4 h-14 shadow-xs">
                <SelectValue placeholder="Select who can publish proposal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EveryOne">Every One</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="TokenHolder">Token Holder</SelectItem>
              </SelectContent>
            </Select2>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 pt-8 w-full">
            <button
              onClick={() => setView('2')}
              type="button"
              className="flex-1 bg-primary-500  rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
            >
              Back
            </button>
            <button
              disabled={!allFieldsFilled()} onClick={handleViewChange}
              type="submit"
              className="flex-1 rounded-2xl p-3 text-white font-semibold hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] shadow-inner"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescribeView
