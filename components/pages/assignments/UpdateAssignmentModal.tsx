"use client";

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateAssignment } from "@/service/assignments/assignments.service";
import { TAssignment } from "@/types/assignments/assignments.type";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function UpdateAssignmentModal({
  assignment,
  isOpen,
  setIsOpen,
}: {
  assignment: TAssignment | null;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [maxMarks, setMaxMarks] = useState<number | "">("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title || "");
      setDescription(assignment.description || "");
      
      // format deadline for datetime-local input
      if (assignment.deadline) {
        try {
          const date = new Date(assignment.deadline);
          // YYYY-MM-DDThh:mm
          const formatted = date.toISOString().slice(0, 16);
          setDeadline(formatted);
        } catch {
          setDeadline("");
        }
      } else {
        setDeadline("");
      }
      
      setMaxMarks(assignment.maxMarks || "");
      setIsPublished(assignment.isPublished || false);
    }
  }, [assignment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignment) return;
    
    const toastId = toast.loading("Updating assignment...");
    
    if (!title || !deadline || maxMarks === "") {
      toast.error("Please fill in all required fields", { id: toastId });
      return;
    }

    setLoading(true);
    try {
      // Need to cast to any since the service might still use CreateAssignmentPayload
      const res = await updateAssignment(assignment.id, { 
        title, 
        description,
        deadline,
        maxMarks: Number(maxMarks),
        isPublished,
      } as any);
      
      if (res) {
        toast.success(res.message || "Assignment updated successfully", { id: toastId });
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to update assignment", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred while updating assignment", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton className="w-[90%] max-h-[85vh] overflow-y-auto md:max-w-xl! bg-[#0d0a1f] border-white/10 text-white custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">Update Assignment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midterm Project"
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about the assignment..."
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Deadline *</label>
              <Input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-black/20 border-white/10 text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Max Marks *</label>
              <Input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value) || "")}
                placeholder="e.g. 100"
                min="0"
                className="bg-black/20 border-white/10 text-white placeholder:text-white/30"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
            <input
              type="checkbox"
              id="updateIsPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-5 h-5 rounded border-white/10 bg-black/20 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)] focus:ring-offset-0"
            />
            <div className="flex flex-col">
              <label htmlFor="updateIsPublished" className="text-sm font-medium text-white cursor-pointer">Publish immediately</label>
              <span className="text-xs text-white/50">If unchecked, this assignment will be saved as a draft.</span>
            </div>
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
              buttonName={loading ? "Updating..." : "Update Assignment"}
              varient="yellow"
              disabled={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
