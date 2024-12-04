import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";
import { ActivityIcon, ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { SkeletonCard } from "../GlobalComponents/Skeleton";
import { formatStandardDateTime } from "@/utils/functions/convertActivityData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Activity = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [showExpenses, setShowExpenses] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/activity/${params.id}`
      );
      setActivity(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/funds-history/${params.id}`
      );

      if (res.status === 200) {
        setExpenses(res.data);
      }
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchActivity();
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50 text-black px-2">
      {showExpenses ? (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
          <div className="space-y-6 md:w-[100%]">
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
              <div className="md:w-[100%] space-y-6">
                <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4 space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200 w-fit p-2 rounded-full">
                      <ActivityIcon className=" text-blue-700" />
                    </div>
                    <div>
                      <Button
                        variant="radix"
                        onClick={() => setShowExpenses(!showExpenses)}
                      >
                        Show Activity
                      </Button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold">
                    {expenses.length} Expenses so far.
                  </div>
                </Card>
                <Card className="w-full p-3 mb-5">
                  <div className="text-2xl font-semibold py-3">
                    All Funds History
                  </div>
                  {expenses.length === 0 ? (
                    <div className="text-center text-gray-500 py-5">
                      No transactions found.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={expenses}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="xrd_added" stroke="#82ca9d" name="XRD Added" />
                        <Line type="monotone" dataKey="current_xrd" stroke="#8884d8" name="Current XRD" />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
          <div className="space-y-6 md:w-[100%]">
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
              <div className="md:w-[100%] space-y-6">
                <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4 space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200 w-fit p-2 rounded-full">
                      <ActivityIcon className=" text-blue-700" />
                    </div>
                    <div>
                      <Button
                        variant="radix"
                        onClick={() => setShowExpenses(!showExpenses)}
                      >
                        Show Fund History
                      </Button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold">
                    {activity.length} Activities so far.
                  </div>
                </Card>
                <Card className="bg-white md:w-[70%] mx-auto md:p-4 p-4 space-y-2">
                  <div className="p-2 border-b-2 -translate-x-2">Activity</div>
                  {!loading && (
                    <div className="space-y-4">
                      {activity.map((ac, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 bg-white border-b-2 rounded-none p-3 text-black"
                        >
                          <Avatar className="shrink-0 object-cover">
                            <img src={ac.user_image_url} alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div
                                className="group"
                                onClick={() =>
                                  navigate(
                                    `/userDashboard/userProfile/${ac.user_address}`
                                  )
                                }
                              >
                                <div className="font-medium group-hover:underline cursor-pointer">
                                  {ac.user_name}
                                </div>
                                <div className="font-light group-hover:underline cursor-pointer">
                                  {clipAddress(ac.user_address)}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-800 dark:text-gray-400 font-medium">
                              {ac.info}
                            </p>
                            <div className="py-2 flex items-center gap-2 hover:text-slate-600">
                              <ClockIcon className="h-5 w-5" />{" "}
                              <p>{formatStandardDateTime(ac.created_at)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {loading && (
                    <div className="flex flex-col h-[200px] items-center justify-center text-center mt-5">
                      <SkeletonCard />
                    </div>
                  )}
                </Card>

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
