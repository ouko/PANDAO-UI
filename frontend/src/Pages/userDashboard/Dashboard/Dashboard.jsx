import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "@/AccountContext";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Components
import NavBar from "./Dash-component/NavBar";
import Sidebar from "./Dash-component/sidebar";
import WorkExperience from "./Dash-component/WorkExperience";
import CommunitiesParticipated from "./Dash-component/CommunitiesParticipated";
import BondList from "./Dash-component/BondList";
import UserActivity from "./Dash-component/UserActivity";
import UserCommunities from "./Dash-component/UserCommunities";
import UserTransaction from "@/Pages/UserDasboard/UserTransactions/UserTransactions";
import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";

// Hooks and utilities
import { useSendTransaction } from "@/hooks/useSendTransaction";
import { tabs } from "@/lib/config";

// API Service
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchData = async (endpoint, params = {}) => {
  const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
  return response.data;
};

const Dashboard = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sendTransaction = useSendTransaction();
  
  // State
  const [activeTab, setActiveTab] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [openPay, setOpenPay] = useState(false);
  const [xrdToPay, setXrdToPay] = useState(0);
  const [selectedBond, setSelectedBond] = useState(null);
  const [check, setCheck] = useState(true);

  // Redirect if no accounts
  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  const userAddress = accounts[0]?.address;

const handleOnEdit=()=>{

  queryClient.refetchQueries({ queryKey: ['userData'] });
}

  // Queries
  const { data: userData = {} } = useQuery({
    queryKey: ['userData', userAddress],
    queryFn: () => fetchData(`/user/details/${userAddress}`),
    enabled: !!userAddress,
  });

  const { data: activityData = { data: [], totalPages: 1 } } = useQuery({
    queryKey: ['activityData', userAddress],
    queryFn: () => fetchData('/user/activity', { user_address: userAddress, page: 1, page_size: 10 }),
    enabled: !!userAddress,
    select: (data) => ({
      data: data.data || [],
      totalPages: data.page || 1
    })
  });

  const { data: createdCommunities = [] } = useQuery({
    queryKey: ['createdCommunities', userAddress],
    queryFn: () => fetchData(`/user/community/${userAddress}`, { owner: true }),
    enabled: !!userAddress,
  });

  const { data: participatedCommunities = [] } = useQuery({
    queryKey: ['participatedCommunities', userAddress],
    queryFn: () => fetchData(`/user/community/${userAddress}`, { owner: false }),
    enabled: !!userAddress,
  });

  const { data: createdBonds = [] } = useQuery({
    queryKey: ['createdBonds', userAddress, check],
    queryFn: () => fetchData(`/user/created-bonds/${userAddress}`, { is_accepted: check }),
    enabled: !!userAddress,
  });

  const { data: expenseData = [] } = useQuery({
    queryKey: ['expenseData', userAddress],
    queryFn: () => fetchData(`/user/expense/${userAddress}`),
    enabled: !!userAddress,
  });

  const { data: failedData = [] } = useQuery({
    queryKey: ['failedData', userAddress],
    queryFn: () => fetchData(`/user/pending-transactions/${userAddress}`),
    enabled: !!userAddress,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', userAddress],
    queryFn: () => fetchData(`/user/notification/all/${userAddress}`),
    enabled: !!userAddress,
  });

  const { data: withdrawRequests = [] } = useQuery({
    queryKey: ['withdrawRequests', userAddress],
    queryFn: () => fetchData(`/user/token-withdraw-request/${userAddress}`),
    enabled: !!userAddress,
  });

  // Mutations
  const retrieveBondMutation = useMutation({
    mutationFn: async (bond) => {
      const data = {
        bond_id: bond.bond_id,
        user_address: userAddress,
      };
      
      const response = await axios.post(
        `${API_BASE_URL}/manifest/zcb/withdraw-all`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      
      const manifest = typeof response.data === "string"
        ? response.data.trim()
        : JSON.stringify(response.data);
      
      const { receipt } = await sendTransaction(manifest);
      const txId = receipt?.transaction?.intent_hash;
      
      if (!txId) {
        throw new Error("Transaction ID not found in receipt");
      }
      
      return axios.post(`${API_BASE_URL}/submit-tx`, {
        tx_id: txId,
        user_address: userAddress,
      });
    },
    onSuccess: () => {
      toast.success("Withdraw Successfully!");
      queryClient.invalidateQueries({ queryKey: ['createdBonds'] });
    },
    onError: (error) => {
      console.error("Error Withdraw token:", error);
      toast.error("Something went wrong while Withdrawing.");
    }
  });

  const depositMutation = useMutation({
    mutationFn: async (bond) => {
      const data = {
        bond_id: bond.bond_id,
        user_address: userAddress,
        xrd_to_add: xrdToPay,
      };
      
      const response = await axios.post(
        `${API_BASE_URL}/manifest/zcb/add-xrds`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      
      const manifest = typeof response.data === "string"
        ? response.data.trim()
        : JSON.stringify(response.data);
      
      const { receipt } = await sendTransaction(manifest);
      const txId = receipt?.transaction?.intent_hash;
      
      if (!txId) {
        throw new Error("Transaction ID not found in receipt");
      }
      
      return axios.post(`${API_BASE_URL}/submit-tx`, {
        tx_id: txId,
        user_address: userAddress,
      });
    },
    onSuccess: () => {
      toast.success("Deposit Successfully!");
      queryClient.invalidateQueries({ queryKey: ['createdBonds'] });
    },
    onError: (error) => {
      console.error("Error Depositing token:", error);
      toast.error("Something went wrong while Depositing.");
    }
  });

  const handleRetreiveBond = (bond) => {
    retrieveBondMutation.mutate(bond);
  };

  const handleDeposit = (bond) => {
    depositMutation.mutate(bond);
  };

  return (
    <div className="bg-brand1 relative min-h-screen pb-20 font-clash overflow-hidden">
      {/* Background elements */}
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>

      {/* Safe access to usermetadata */}
      <NavBar userImage={userData?.usermetadata?.image_url || null} />

      <div className="flex flex-row items-start justify-between relative max-w-[1600px] mx-auto gap-5">
        <div className="sticky top-0 h-full">
          <Sidebar userData={userData || {}} onEdit={handleOnEdit} />
        </div>

        <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] border mt-24 border-brand2 mr-10 w-full relative overflow-hidden backdrop-blur-[6.7px]">
          {/* Tab navigation */}
          <div className="flex border-b bg-black/60 border-brand1 py-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`flex-1 py-2 px-6 text-center font-medium relative text-lg ${
                  activeTab === tab.id
                    ? "text-brand6"
                    : "text-white hover:text-primary-500"
                } ${index !== 0 ? "border-l border-brand5" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 bg-gradient-to-l from-brand3 to-brand5 h-1 w-[80%]"></div>
                  )}
                </div>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 0 && (
            <section className="py-6">
              <UserCommunities communities={createdCommunities} />
              <WorkExperience userData={userData} />
              <CommunitiesParticipated participatedCommunities={participatedCommunities} />
            </section>
          )}

          {activeTab === 1 && (
            <section className="py-6">
              <UserActivity activityData={activityData?.data} />
            </section>
          )}

          {activeTab === 2 && (
            <section className="py-6">
              <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
                <h2 className="text-white text-2xl font-semibold">User Transaction</h2>
              </div>
              <div className="flex flex-wrap gap-5 justify-center mb-6 px-3">
                <UserTransaction
                  expneseData={expenseData}
                  failedTransaction={failedData}
                />
              </div>
            </section>
          )}

          {activeTab === 3 && (
            <section>
              <BondList
                bonds={createdBonds}
                check={check}
                setCheck={setCheck}
                loading={retrieveBondMutation.isPending || depositMutation.isPending}
                handleRetrieveBond={handleRetreiveBond}
                setOpenPay={setOpenPay}
                setSelectedBond={setSelectedBond}
                setSelectedInfo={setSelectedInfo}
                setShowInfo={setShowInfo}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;