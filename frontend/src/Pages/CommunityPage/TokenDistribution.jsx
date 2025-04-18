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

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const TokenDistribution = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [comment, setComment] = useState("");
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/token/${params.id}`
      );
      console.log(res, "hi");
      setTokens(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }
  console.log(tokens);
  return (
    <div className=" items-start gap-3 justify-start z-50 min-h-screen overflow-hidden  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">

              <div
                className="rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden"
              >

                <div className="flex flex-row  gap-10 items-center w-full">
                  <div
                    className="bg-[#554573] rounded-full p-5 flex items-center justify-center w-24 h-24">
                    <img
                      className="w-14 h-14"
                      src="/5.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div
                      className="text-[#5228A4] font-semibold uppercase text-xl"
                    >
                      Total Vote Power:
                    </div>
                    <div
                      className="text-white text-[56px] font-medium text-center"
                    >
                      Voters
                    </div>
                    {/* <Button variant="radix">
                      Manage Vote
                    </Button> */}

                  </div>
                </div>
              </div>

              <div className=" bg-[rgba(169,126,255,0.08)] rounded-[10px] z-50 border-2 border-[#5228A4] h-full relative  overflow-hidden">

                <Table>
                  {/* <TableCaption>A list of your recent .</TableCaption> */}
                  <TableHeader>
                    <TableRow className="bg-[#39246b] h-[65px] hover:bg-[#39246b] text-white text-[20px] ">
                      <TableHead className="w-[150px] text-white  ">User Name</TableHead>
                      <TableHead className="w-[150px] text-white  " >Token Owned</TableHead>
                      <TableHead className="w-[150px] text-white  " >Address</TableHead>
                      {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                  </TableHeader>

                  <TableBody className="text-[18px] bg-gradient-to-br from-[rgba(24,18,45,0.59)]  via-transparent to-brand1  border-2 border-brand2  px-2 py-2 text-brand7">
                    {tokens.map((token, index) => (
                      <TableRow key={index} className="hover:bg-[#7057ab] hover:text-white ">
                        <TableCell className="font-medium  ">
                          {" "}
                          {token.user_name}
                        </TableCell>
                        <TableCell className>{token.token_owned}</TableCell>
                        <TableCell onClick={() =>
                          navigate(
                            `/userDashboard/userProfile/${token.public_address}`
                          )
                        }  >
                          {clipAddress(token.public_address)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {tokens.length === 0 && <div className="flex items-center justify-center h-20">
                  No trade happend yet.
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDistribution;
