// src/routes/routes.js
import OnboardingFlow from '@/Pages/onboarding-page/signup-page';
import { lazy } from 'react';

// Layouts
const HomePageLayout = lazy(() => import('../Layout/HomePageLayout'));
const UserDashboardLayout = lazy(() => import('../Layout/UserDashboardLayout'));
const CommunityDetailsLayout = lazy(() => import('../Layout/CommunityDetailsLayout'));

// Public Pages
const HomePage = lazy(() => import('../Pages/HomeSection/home-section'));
const Product = lazy(() => import('../Pages/product'));
const OurStory = lazy(() => import('../Pages/OurStory'));
const PrivacyPolicy = lazy(() => import('../Pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../Pages/TermsandConditions'));
const Price = lazy(() => import('../Pages/Price'));
const Support = lazy(() => import('../Pages/Support'));
const Community = lazy(() => import('../Pages/Community'));
const Roadmap = lazy(() => import('../Pages/Roadmap'));
const Blog = lazy(() => import('../Pages/Blogs'));
const Resources = lazy(() => import('../Pages/Resources'));
const BlogDetail = lazy(() => import('../Pages/Resources/BlogDeatails'));
const Welcome = lazy(() => import('../Pages/Welcome'));

// Protected Pages
// const UserDashboard = lazy(() => import('../Pages/UserDashboard'));  // old Dahboard

const Dashboard = lazy(() => import('../Pages/userDashboard/Dashboard/Dashboard'));  // ADD NEW Dahboard

const EditPage = lazy(() => import('../Pages/UserDasboard/EditPage'));
const UserPublicProfile = lazy(() => import('../Pages/UsersPublicProfile'));
const MyCommunity = lazy(() => import('../Pages/MyCommunites'));
const Create = lazy(() => import('../Pages/Create/Create'));
const Deploy = lazy(() => import('../Pages/Deploy'));
const CommunityDetails = lazy(() => import('../Pages/CommunityPage/CommunityDetails'));
const Members = lazy(() => import('../Pages/CommunityPage/Members'));
const Comments = lazy(() => import('../Pages/CommunityPage/Comments'));
const TokenDistribution = lazy(() => import('../Pages/CommunityPage/TokenDistribution'));
const Activity = lazy(() => import('../Pages/CommunityPage/Activity'));
const Proposals = lazy(() => import('../Pages/CommunityPage/Proposals'));
const BondIssue = lazy(() => import('../Pages/CommunityPage/BondIssues'));
const BondIssued = lazy(() => import('../Pages/CommunityPage/BondIssued'));
const AnnIssue = lazy(() => import('../Pages/CommunityPage/AnnIssue'));
const AnnIssued = lazy(() => import('../Pages/CommunityPage/AnnIssued'));
const PurchasedBond = lazy(() => import('../Pages/CommunityPage/PurchasedBond'));
const exploreTopDao = lazy(() => import('../Pages/ExploreAllDaos'))
const TokenWithdraw = lazy(() => import('../Pages/CommunityPage/Withdraw'));
const WithdrawReceipt = lazy(() => import('../Pages/CommunityPage/WithdrawReceipt'));
export const publicRoutes = [
  {
    path: '/',
    element: HomePageLayout,
    children: [
      { index: true, element: HomePage },
      { path: 'ourstory', element: OurStory },
      { path: 'catalystsuite', element: Welcome },
      { path: 'temp', element: OnboardingFlow },
      { path: 'privacypolicy', element: PrivacyPolicy },
      { path: 'termsandcondition', element: TermsAndConditions },
      { path: 'price', element: Price },
      { path: 'support', element: Support },
      { path: 'community', element: Community },
      { path: 'roadmap', element: Roadmap },
      // { path: 'catalystsuite', element: Product },
      { path: 'blog', element: Blog },
      { path: 'resources', element: Resources },
      { path: 'explore', element: exploreTopDao },
      { path: '/resources/:id', element: BlogDetail },
    ],
  },
  {
    path: '/signup',
    element: OnboardingFlow,
  },
];

export const protectedRoutes = [
  {
    path: '/userDashboard',
    element: UserDashboardLayout,
    children: [
      { index: true, element: Dashboard },    // change UserDashboard to Dashboard
      { path: 'edit', element: EditPage },
      { path: 'userProfile/:id', element: UserPublicProfile },
    ],
  },
  {
    path: '/myCommunities',
    element: MyCommunity,
  },
  {
    path: '/create',
    element: Create,
  },
  {
    path: '/exploreDao/:slug/deploy',
    element: Deploy,
  },
  {
    path: '/community/detail/:id',
    element: CommunityDetailsLayout,
    children: [
      { index: true, element: CommunityDetails },
      { path: 'members', element: Members },
      { path: 'discussion', element: Comments },
      { path: 'tokenDistribution', element: TokenDistribution },
      { path: 'tokenWithdraw', element: TokenWithdraw },
      { path: 'activity', element: Activity },
      { path: 'proposals', element: Proposals },
      { path: 'bondissue', element: BondIssue },
      { path: 'annissue', element: AnnIssue },
      { path: 'purchasedbond', element: PurchasedBond },
      { path: 'bondissued', element: BondIssued },
      { path: 'annissued', element: AnnIssued },
      { path: 'bondrecipt', element: WithdrawReceipt },
    ],
  },
];
