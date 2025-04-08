import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import useCustomAlertStore from "@/store/customAlertStore"
  
  export function CustomAlert() {

    const {alertText,open,setOpen}=useCustomAlertStore()
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[rgba(169,126,255,0.34)] text-white backdrop-blur-md border-[1px] border-brand3">
          <AlertDialogHeader>

            <AlertDialogDescription >
            {alertText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter >
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  