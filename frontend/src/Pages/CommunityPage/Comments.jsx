import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { formatStandardDateTime } from "@/utils/functions/convertActivityData";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ImageUpdater from "../components/ImageUpdater";
import CommnetImageUpdater from "../components/CommentImageUpdater";
import { SkeletonCard } from "../GlobalComponents/Skeleton";
import { SkeletonActivity } from "../GlobalComponents/SkeletonActivity";

const Comments = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [selectedDiscussionTitle, setSelectedDiscussionTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentUrl, setCommentUrl] = useState("")
  

  const handleAddDiscussion = async () => {
    if (title.trim() === "") {
      alert("Add something");
      return;
    }
    const data = {
      user_addr: accounts[0].address,
      discussion_title: title,
      community_id: params.id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion`,
        data
      );
      console.log("Comment Response:", response.data);
      toast.success("Discussion Added");
      setTitle("");
      setOpen(false);
      fetchComments();
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning("Non member cannot add discussion");
        setTitle("");
        setOpen(false);
      }
      console.error("Error adding discussion:", error.response.status);

    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion/${params.id}`
      );
      setCommunities(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  const fetchDiscussionComments = async (discussionId, discussionTitle) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL
        }/community/discussion/comments/${discussionId}`
      );
      setSelectedComments(res.data);
      setSelectedDiscussion(discussionId);
      setSelectedDiscussionTitle(discussionTitle); // Set the discussion title
    } catch (error) {
      console.error("Error fetching discussion comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    const data = {
      user_addr: accounts[0].address,
      discussion_id: selectedDiscussion,
      comment: newComment,
      image: commentUrl || "string",
    };
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion/comments`,
        data
      );
      console.log("Add Comment Response:", response);

      if (response.status == 200) {
        toast.success("Comment Added");
        setNewComment("");
        setCommentUrl("")
        fetchDiscussionComments(selectedDiscussion, selectedDiscussionTitle);
      }
      if (response.data.status_code === 401) {
        toast.warning("Not a community member");
        setNewComment("")
        return
      }

    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setLoading(false);
  };
  const handleCommentId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    console.log("Received file URL:", url);
    setCommentUrl(url)
  };
  useEffect(() => {
    fetchComments();
  }, [params.id]);

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className=" items-start gap-3 justify-start z-40 min-h-screen overflow-hidden text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 z-50 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col  mx-auto gap-2">
            <div className="md:w-[100%] space-y-6">



              <div
                className="rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden"
              >

                <div className="flex flex-row gap-10  items-center w-full">
                  <div className="bg-[#554573] rounded-full p-5 flex items-center justify-center w-24 h-24">
                    <img className="w-14 h-14" src="/4.svg" alt="User Icon" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[#5228A4] font-semibold uppercase text-xl">
                      Total Discussions:
                    </div>
                    <div className="text-white text-[56px] font-medium text-center">
                      {selectedDiscussion
                        ? selectedDiscussionTitle
                        : `${communities.length} discussions so far.`}
                    </div>
                  </div>
                </div>


                <div className="absolute bottom-0 right-0 p-4">
                  <Dialog open={open} onOpenChange={setOpen}>
                    {!selectedDiscussion && (
                      <DialogTrigger>
                        <Button
                          variant="brand"
                        >
                          Start new discussion
                        </Button>
                      </DialogTrigger>
                    )}
                    <DialogContent className="  h-[250px] bg-[rgba(169,126,255,0.34)] backdrop-blur-md text-gray-300  border-[1px] border-brand3">
                      <DialogTitle>Discussion Title</DialogTitle>
                      <Input
                        placeholder="Enter the discussion title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Button
                        variant="brand"
                        onClick={handleAddDiscussion}>
                        Start
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {!selectedDiscussion && (
                <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4] z-50 relative overflow-hidden">
                  <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                    <div className="text-[#ffffff] text-left  text-3xl font-medium flex items-center gap-2">

                      Discussions:
                    </div>

                  </div>
                  {!loading && (
                    <div className="space-y-4">
                      {communities.length === 0 && <div className="flex items-center justify-center h-[200px] text-gray-300">
                        No Active Discussion
                      </div>}
                      {communities.length > 0 && (
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 p-6">
                          {communities.map((community, index) => (
                            <div
                              key={index}
                              className="group relative flex flex-col justify-between text-brand7 p-5 rounded-xl bg-gradient-to-br from-[rgba(24,18,45,0.59)] via-transparent to-brand1 border border-brand4 hover:border-brand5 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer backdrop-blur-sm"
                              onClick={() =>
                                fetchDiscussionComments(
                                  community.id,
                                  community.title
                                )
                              }
                            >
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-brand5 transition-colors">
                                  {community.title}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                  <span className="text-brand5">Started By</span>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-7 w-7 ring-2 ring-brand4 ring-offset-1 ring-offset-[rgba(24,18,45,0.59)]">
                                      <AvatarImage src={community.user_image} />
                                      <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{community.user_name}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 pt-3 border-t border-brand4/50 text-sm text-gray-400">
                                {formatStandardDateTime(community.created_at)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {loading && (
                    <div className="grid md:grid-cols-2 h-[400px] rounded-md grid-cols-1 gap-3 p-6">
                      {[...Array(4)].map((_, index) => (
                        <SkeletonActivity
                          key={index}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {selectedDiscussion && (
                <div>
                  <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4] z-50 relative overflow-hidden">
                    <div className="flex items-center justify-between ">
                      <div className="bg-[#39246b]  pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                        <div className="text-[#ffffff] text-left  text-3xl font-medium flex items-center gap-2">

                          Discussions:
                        </div>
                        <Button
                          variant="brand"


                          onClick={() => setSelectedDiscussion(null)}
                        >
                          Back
                        </Button>

                      </div>

                    </div>

                    {loading ? (
                      <div className="flex flex-col h-auto items-center justify-center text-center mt-5">
                        {[...Array(4)].map((_, i) => (
                          <SkeletonCard key={i} />
                        ))}
                      </div>
                    ) :
                      selectedComments.length > 0 ? (
                        <div className="px-4 py-4">
                        {selectedComments.map((comment, index) => (
                          <div
                            key={index}
                            className="w-full bg-gradient-to-br from-[rgba(24,18,45,0.85)] via-transparent tobrand1 
                            hover:border-brand5 transition-transform duration-300 flex flex-col my-4 
                            border border-brand2 rounded-lg shadow-sm p-4"
                          >
                       
                            <div className="text-white font-semibold rounded-sm mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                              {comment.comment}
                            </div>
                      
                          
                            {comment.image && comment.image !== "string" && (
                              <div className="mb-4">
                                <img
                                  src={comment.image}
                                  className="h-[320px] w-[320px] aspect-square object-cover"
                                />
                              </div>
                            )}
                      
                          
                            <div className="flex items-center justify-between w-full mt-auto">
                            
                              <div className="text-sm text-white flex items-center gap-2">
                                <span>Posted By -</span>
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.user_image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <span className="font-normal">{comment.user_name}</span>
                                </div>
                              </div>
                  
                              <div className="text-sm text-brand7 font-semibold border-b-2 border-brand4">
                                {formatStandardDateTime(comment.created_at)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      ) : (
                        <div className="text-center py-20 text-white">No comments yet.</div>
                      )}

                  </div>
                  <div className="w-full flex flex-col items-end justify-end gap-y-4 py-6">
                    <Textarea
                      placeholder="Become part of this discussion"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full z-50 text-brand7 border-brand4"
                    />

                    <div className="flex z-50 items-center gap-2">
                      <Button
                        variant="brand"
                        className="rounded-md hover:scale-105 transition-transform"
                        onClick={handleAddComment}
                      >
                        Add Comment
                      </Button>

                      <CommnetImageUpdater onUploadSuccess={handleCommentId} />
                    </div>

                    {commentUrl && (
                      <img
                        src={commentUrl}
                        alt="Comment Attachment"
                        className="h-40 w-60 object-cover rounded-md shadow-md"
                      />
                    )}
                  </div>

                </div>
              )}

            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
