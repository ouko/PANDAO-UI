import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Product from './Pages/product'
import OurStory from './Pages/OurStory'
import UserDashboard from './Pages/UserDashboard'
import Deploy from './Pages/Deploy'
import DaoDetailsPage from './Pages/DaoDetailsPage'
import MyCommunity from './Pages/MyCommunites'
import SignupPage from './Pages/SignUpPage'
import CommunityDetails from './Pages/CommunityDetails'
import UserPublicProfile from './Pages/UsersPublicProfile'
import CommunityDetailsLayout from './Layout/CommunityDetailsLayout'
import HomePageLayout from './Layout/HomePageLayout'
import Members from './Pages/CommunityPage/Members'
import Comments from './Pages/CommunityPage/Comments'
import UserDashboardLayout from './Layout/UserDashboardLayout'
import EditPage from './Pages/UserDasboard/EditPage'
import One from './Pages/Resources/Blogs/One'
import Create from './Pages/Create'
import TokenDistribution from './Pages/CommunityPage/TokenDistribution'
import Activity from './Pages/CommunityPage/Activity'
import Proposals from './Pages/CommunityPage/Proposals'
import ExploreAllDao from './Pages/ExploreAllDaos'
import Blog from './Pages/Blogs'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import Termsandconditon from './Pages/TermsandConditions'
import BondIssue from './Pages/CommunityPage/BondIssues'
import BondIssued from './Pages/CommunityPage/BondIssued'
import AnnIssue from './Pages/CommunityPage/AnnIssue'
import AnnIssued from './Pages/CommunityPage/AnnIssued'
import BlogDetail from './Pages/Resources/BlogDeatails'
import PurchasedBond from './Pages/CommunityPage/PurchasedBond'
import Price from './Pages/Price'
import Resources from './Pages/Resources'
import Support from './Pages/Support'
import Community from './Pages/Community'
import Roadmap from './Pages/Roadmap'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAccount } from './AccountContext'
import axios from 'axios'
import { formatDate } from './utils/functions/ConvertDate'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const { accounts } = useAccount()
  const fetchNotification = async () => {
    if (accounts && accounts.length > 0 && accounts[0]?.address) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/notification/${
            accounts[0].address
          }`,
        )

        const notifications = res.data

        notifications.forEach((notification) => {
          console.log(notification)
          toast.message(notification.title, {
            position: 'bottom-center',
 
            style: { backgroundColor: "#f0f8ff", color: "black",border:"1px solid #4169E1" },
            duration: Infinity,
            description: `${notification.text}\n${formatDate(
              notification.date,
            )}`,
          })
        })
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    } else {
      console.warn('Accounts not available or address missing')
    }
  }

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileDevice = /android|iphone|ipad|ipod|opera mini|blackberry|mobile/i.test(
        userAgent,
      )
      setIsMobile(isMobileDevice)
    }

    checkIfMobile()
  }, [])
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const interval = setInterval(() => {
        fetchNotification()
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [accounts]) // Add accounts as a dependency

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#f8f8f8',
          color: '#333',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div>
          <h1 className="font-bold text-2xl my-2">Desktop Only Application</h1>
          <p className="text-balance">
            This application is designed to work on desktop devices only. Please
            access it from a desktop browser.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ourstory" element={<OurStory />} />
          <Route path="create" element={<Create />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termsandcondition" element={<Termsandconditon />} />
          <Route path="Price" element={<Price />} />

          <Route path="support" element={<Support />} />
          <Route path="community" element={<Community />} />
          <Route path="roadmap" element={<Roadmap />} />

          <Route path="catalystsuite" element={<Product />} />
          <Route path="explore" element={<ExploreAllDao />} />
          <Route path="blog" element={<Blog />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/what-is-radix" element={<One />} />
          <Route path="/reasources/:id" element={<BlogDetail />} />
          <Route path="exploreDao/:slug" element={<DaoDetailsPage />} />
          <Route path="/exploreDao/:slug/deploy" element={<Deploy />} />
        </Route>
        <Route path="/userDashboard" element={<UserDashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="edit" element={<EditPage />} />
          <Route path="userProfile/:id" element={<UserPublicProfile />} />
        </Route>

        {/* <Route path="/userDashboard" element={<UserDashboard />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/myCommunities" element={<MyCommunity />} />
        {/* <Route path="/exploreDao" element={<ExploreDao />} />
        <Route path="/exploreDao/:slug" element={<DaoDetailsPage />} /> */}
        {/* <Route path="/exploreDao/:slug/deploy" element={<Deploy />} /> */}
        <Route
          path="/community/detail/:id"
          element={<CommunityDetailsLayout />}
        >
          <Route index element={<CommunityDetails />} />
          <Route path="members" element={<Members />} />
          <Route path="discussion" element={<Comments />} />
          <Route path="tokenDistribution" element={<TokenDistribution />} />
          <Route path="activity" element={<Activity />} />
          <Route path="proposals" element={<Proposals />} />

          <Route path="bondissue" element={<BondIssue />} />
          <Route path="annissue" element={<AnnIssue />} />
          <Route path="purchasedbond" element={<PurchasedBond />} />
          <Route path="bondissued" element={<BondIssued />} />
          <Route path="annissued" element={<AnnIssued />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
