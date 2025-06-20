import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalStore from "@/store/modal";
import useTokenWeightStore from "@/store/templateStore/tokenWeightStore";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from 'lucide-react';
import BrandButton from "@/components/ui/myComponents/brand-button";

const ReceiptModal = ({ children }) => {
  const { successOpen, setSuccessOpen } = useModalStore();
  const { resetFormFields } = useTokenWeightStore();
  const navigate = useNavigate();

  const handleOk = () => {
    setSuccessOpen(false);
    resetFormFields();
    navigate("/");
  };

  return (
    <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
      <DialogContent className="bg-[#0F0828] text-white backdrop-blur-md rounded-2xl w-full max-w-2xl border-2 border-[#2A1B5E] p-0 overflow-hidden max-h-[93vh]">
        <div className="p-8">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Success!
            </DialogTitle>
            {/* <DialogDescription className="text-gray-300 mt-2">
              Your community has been successfully deployed
            </DialogDescription> */}
          </DialogHeader>

          <div className="mt-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="bg-[#1A0F3A] rounded-xl border border-purple-900/50 p-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">Transaction Details</h3>
              <div className="space-y-4">
                {children}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <BrandButton
            title="Back to Home"
            href="/"
            />
         
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ReceiptModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReceiptModal;
