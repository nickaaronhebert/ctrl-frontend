import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Pill, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type ModalType = "organization" | "pharmacy";

interface PreInvitationDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalType: ModalType;
  handleContinue: () => void;
}

const PreInvitationDialog = ({
  isModalOpen,
  setIsModalOpen,
  modalType,
  handleContinue,
}: PreInvitationDialogProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-lg h-[230px] border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
        <DialogHeader className="text-center space-y-2 pt-6">
          <div className="mx-auto relative">
            <div className="w-16 h-16 bg-gradient-to-br bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              {modalType === "organization" ? (
                <Building2 className="w-8 h-8 text-white relative z-10" />
              ) : (
                <Pill className="w-8 h-8 text-white relative z-10" />
              )}
              <Sparkles className="w-3 h-3 text-blue-200 absolute top-2 right-2 z-10" />
            </div>
          </div>
          <div className="space-y-3">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Invite a New{" "}
              <span className="bg-primary hover:bg-primary bg-clip-text text-transparent">
                {modalType === "organization" ? "Organization" : "Pharmacy"}
              </span>
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">
              To invite an admin, you must first create the {modalType} profile
              to get started.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-center pt-3 pb-6">
          <Button
            onClick={handleContinue}
            className="bg-gradient-to-r cursor-pointer bg-primary hover:bg-primary text-white px-8 py-3 rounded-xl flex items-center gap-3 font-semibold text-base transition-all duration-200 hover:scale-105 border-0"
          >
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
              <Plus className="w-3 h-3" />
            </div>
            Continue to Create{" "}
            {modalType === "organization" ? "Organization" : "Pharmacy"}
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-500/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      </DialogContent>
    </Dialog>
  );
};

export default PreInvitationDialog;
