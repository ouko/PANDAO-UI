import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "@/AccountContext";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  const handleOnEdit = () => {

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

  const handleRetrieveBond = (bond) => {
    retrieveBondMutation.mutate(bond);
  };
  const handleDeposit = () => {
    if (!selectedBond) return;
    if (!xrdToPay || xrdToPay <= 0) {
      toast.error("Please enter a valid amount to deposit");
      return;
    }
    depositMutation.mutate(selectedBond);
    setOpenPay(false);
  };

  return (
   <div className="bg-brand1 relative min-h-[1200px] md:min-h-screen pb-20 font-clash overflow-hidden ">

      {/* Background elements */}
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>
      0
      {/* Safe access to usermetadata */}
      <NavBar userImage={userData?.usermetadata?.image_url || null} isAdmin={true} />

      <div className="grid md:grid-cols-4 grid-cols-1 relative container mx-auto md:gap-5 ">
        <div className="sticky top-0 h-full md:pt-0 pt-10 ">
          <Sidebar userData={userData || {}} onEdit={handleOnEdit} />
        </div>

        <div className="bg-[rgba(169,126,255,0.08)] md:col-span-3 rounded-[20px] border md:mt-24 mt-10 border-brand2  w-full relative overflow-hidden backdrop-blur-[6.7px]">

          <Tabs defaultValue="myprofile" className="w-full">
            <TabsList className="w-full min-h-12 bg-black/60 grid md:grid-cols-4 grid-cols-2 h-full rounded-t-[20px] p-0">
              <TabsTrigger
                value="myprofile"
                className="relative w-full h-[45px] py-5 text-lg rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
              >
                My Profile
              </TabsTrigger>

              <TabsTrigger
                value="useractivity"
                className="relative w-full h-[45px] py-5 text-lg rounded-none border-l-[2px] border-brand3 border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
              >
                User Activity
              </TabsTrigger>

              <TabsTrigger
                value="transactions"
                className="relative w-full h-[45px] py-5 text-lg rounded-none border-l-[2px] border-brand3 border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
              >
                Transactions
              </TabsTrigger>

              <TabsTrigger
                value="bonds"
                className="relative w-full h-[45px] py-5 text-lg rounded-none border-l-[2px] border-brand3 border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
              >
                Bonds
              </TabsTrigger>
            </TabsList>

            <TabsContent value="myprofile" >
              <section className="">
                <UserCommunities communities={createdCommunities} />
                <WorkExperience userData={userData} />
                <CommunitiesParticipated participatedCommunities={participatedCommunities} />
              </section>
            </TabsContent>
            <TabsContent value="useractivity">
              <section className="">
                <UserActivity activityData={activityData?.data} />
              </section>
            </TabsContent>
            <TabsContent value="transactions">
              <section className="">
                <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
                  <h2 className="text-white md:text-2xl text-xl font-semibold">User Transaction</h2>
                </div>
                <div className="flex flex-wrap gap-5 justify-center mb-6 px-3">
                  <UserTransaction
                    expneseData={expenseData}
                    failedTransaction={failedData}
                  />
                </div>
              </section>
            </TabsContent>
            <TabsContent value="bonds" className="">
              <section>
                <BondList
                  bonds={createdBonds}
                  check={check}
                  setCheck={setCheck}
                  loading={retrieveBondMutation.isPending || depositMutation.isPending}
                  handleRetrieveBond={handleRetrieveBond}
                  handleDeposit={handleDeposit}
                  setOpenPay={setOpenPay}
                  setSelectedBond={setSelectedBond}
                  setSelectedInfo={setSelectedInfo}
                  setShowInfo={setShowInfo}
                  showInfo={showInfo}
                  selectedInfo={selectedInfo}
                />
              </section>
            </TabsContent>
          </Tabs>







        </div>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={openPay} onOpenChange={setOpenPay}>
        <DialogContent className="sm:max-w-md bg-brand1 border border-brand2 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-brand6">Deposit XRD</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="xrdAmount" className="text-right">
                XRD Amount
              </Label>
              <Input
                id="xrdAmount"
                type="number"
                min="0.001"
                step="0.001"
                value={xrdToPay || ''}
                onChange={(e) => setXrdToPay(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                className="col-span-3 bg-brand1 border-brand3 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setOpenPay(false)}
              variant="outline"
              className="border-brand3 text-white hover:bg-brand3/20"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDeposit}
              disabled={depositMutation.isPending || !xrdToPay || xrdToPay <= 0}
              className="bg-gradient-to-r from-brand2 to-brand3 hover:from-brand3 hover:to-brand2 text-white"
            >
              {depositMutation.isPending ? "Processing..." : "Deposit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;