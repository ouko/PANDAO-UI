import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAccount } from "@/AccountContext";
import DaoCard from "./brand-dao-card";

const BrandCard = ({ daos }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { accounts } = useAccount();

  console.log(daos, "faisl")
  const handleNavigation = (path) => {
    if (accounts && accounts.length > 0) {
      navigate(path);
    } else {
      setOpen(true);
    }
  };

 
  return (

    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have not connected your Wallet</DialogTitle>
            <DialogDescription>
              Please connect your wallet your Radix Wallet
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-4 z-30">
      {daos.slice(0,3).map((dao) => (
          <DaoCard
            key={dao.id}
            dao={dao}
            onClick={() => handleNavigation(`/community/detail/${dao.id}`)}
          />
        ))}
      </div>
    </>

  );
};

export default BrandCard;
