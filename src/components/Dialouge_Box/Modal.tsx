// Modal.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Modal = ({ open, onOpenChange }: ModalProps) => {
    const router = useRouter();
    const handleRoute = () => {
      router.push('/login');
    }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please sign in</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be signed in to access your cart. Would you like to continue to the login page?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={
            // You can add redirect logic here if needed
            handleRoute
            // router.push('/login') — but router must come from parent
          }>
            Go to Login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};