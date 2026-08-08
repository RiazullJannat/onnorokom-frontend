"use client";

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateSubject } from "@/service/subjects/subjects.service";
import { Subject } from "@/types/subjects/subjects.type";

export default function UpdateSubjectModal({
  subject,
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  subject: Subject | null;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subject) {
      setName(subject.name || "");
    }
  }, [subject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) return;
    
    const toastId = toast.loading("Updating subject...");
    
    if (!name) {
      toast.error("Name is required", { id: toastId });
      return;
    }

    setLoading(true);
    try {
      const res = await updateSubject(subject.id, { name });
      if (res) {
        toast.success(res.message || "Subject updated successfully", { id: toastId });
        setIsOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to update subject", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred while updating subject", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton className="w-[90%] max-h-[85vh] overflow-y-auto md:max-w-md! bg-[#0d0a1f] border-white/10 text-white custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">Update Subject</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Subject Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mathematics"
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <ButtonComponent
              type="button"
              buttonName="Cancel"
              varient="red"
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:bg-white/10"
            />
            <ButtonComponent
              type="submit"
              buttonName={loading ? "Updating..." : "Update Subject"}
              varient="yellow"
              disabled={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
