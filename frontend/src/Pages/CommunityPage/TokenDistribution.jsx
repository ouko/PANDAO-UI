import { useAccount } from "@/AccountContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { clipAddress } from "@/utils/functions/ClipAddress";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "../GlobalComponents/Skeleton";
import { Coins } from "lucide-react";


const TokenDistribution = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();

  // Commented out unused code
  // const handleAddComment = async () => {
  //   if (comment.trim() === "") {
  //     alert("Add Somthign");
  //     return;
  //   }
  //   const data = {
  //     user_addr: accounts[0].address,
  //     comment: comment,
  //     community_id: params.id,
  //   };
  //
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/community/comment`,
  //       data
  //     );
  //     console.log("Comment Response:", response.data);
  //     toast.success("Comment Added");
  //     setComment("");
  //     fetchComments();
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  // Using TanStack Query to fetch token distribution data
  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ['tokenDistribution', params.id],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community/token/${params.id}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching token distribution data:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  console.log(tokens);
  return (
    <div className=" items-start gap-3 justify-start z-50 min-h-screen overflow-hidden  text-black px-[12px]">
      <div className="flex md:flex-row flex-col  py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col  mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">

              <div className="rounded-2xl border border-[#5228A4] p-4 sm:p-7 mt-5 flex flex-col gap-4 items-center sm:items-start justify-center relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center w-full">
                  <div className="bg-[#554573] rounded-full p-4 sm:p-5 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                    <img
                      className="w-12 h-12 sm:w-14 sm:h-14"
                      src="/5.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left w-full">
                    <div className="text-brand6 font-semibold uppercase text-lg sm:text-xl">
                      Total Vote Power:
                    </div>
                    <div className="text-white text-[32px] sm:text-[56px] font-medium">
                      Voters
                    </div>

                    {/* Optional Button (Uncomment if needed) */}
                    {/* <Button variant="radix" className="w-full sm:w-auto">
                            Manage Vote
                         </Button> */}
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(24,18,45,0.9)] text-white rounded-2xl border border-[#7b3fe4]/50 shadow-xl backdrop-blur-sm overflow-hidden">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    {[...Array(4)].map((_, i) => (
                      <SkeletonCard key={i} className="w-full max-w-3xl mb-4" />
                    ))}
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#2e1a5c] h-16 hover:bg-[#2e1a5c] text-white text-lg font-medium border-[#7b3fe4]/50">
                          <TableHead className="text-white w-[200px] pl-6">User Name</TableHead>
                          <TableHead className="text-white w-[200px]">Token Owned</TableHead>
                          <TableHead className="text-white w-[200px]">Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="text-base bg-gradient-to-b from-[rgba(24,18,45,0.9)] to-[rgba(75,37,142,0.2)]">
                        {tokens.map((token, index) => (
                          <TableRow
                            key={index}
                            className="hover:bg-[#4b258e]/50 transition-colors duration-200 border-b border-[#7b3fe4]/20"
                          >
                            <TableCell className="font-medium pl-6 py-4">
                              {token.user_name}
                            </TableCell>
                            <TableCell className="py-4">
                              <span className="flex items-center gap-2 text-[#b8a1ff] font-semibold">
                                {token.token_owned}
                                <Coins className="w-5 h-5 text-[#b8a1ff]" />
                              </span>
                            </TableCell>
                            <TableCell
                              className="py-4 cursor-pointer hover:text-[#b8a1ff] transition-colors duration-150"
                              onClick={() =>
                                navigate(`/userDashboard/userProfile/${token.public_address}`)
                              }
                            >
                              {clipAddress(token.public_address)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {tokens.length === 0 && (
                      <div className="flex items-center justify-center h-24 text-white/80 text-lg">
                        No trades have occurred yet.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDistribution;
