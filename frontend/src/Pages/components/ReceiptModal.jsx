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

const ReceiptModal = ({children}) => {
  const { successOpen,setSuccessOpen } = useModalStore();
  const { resetFormFields } = useTokenWeightStore();
  const navigate = useNavigate();

  const handleOk=()=>{
    setSuccessOpen(false)
    resetFormFields()
navigate("/");
  }
  return (
    <div>
      <Dialog open={successOpen} setOpen={setSuccessOpen}>
        <DialogContent  className="bg-[rgba(169,126,255,0.34)] backdrop-blur-md rounded-[20px] w-full max-w-4xl flex flex-col gap-7 border border-[#5228A4] max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold" >Receipt</DialogTitle>
            <DialogDescription className="max-h-[400px] h-full w-full  overflow-y-auto p-2 ">
             {children}
            </DialogDescription>
            <Button onClick={handleOk} > 
                OK
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
ReceiptModal.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export default ReceiptModal;
