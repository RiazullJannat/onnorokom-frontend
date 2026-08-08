"use client";

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateCourse } from "@/service/courseService/course.service";
import { Course } from "@/types/course/course.type";

export default function UpdateCourseModal({
  course,
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  course: Course | null;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setName(course.name || "");
      setDescription(course.description || "");
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    
    const toastId = toast.loading("Updating course...");
    
    if (!name) {
      toast.error("Name is required", { id: toastId });
      return;
    }

    setLoading(true);
    try {
      const res = await updateCourse(course.id, { name, description });
      if (res) {
        toast.success(res.message || "Course updated successfully", { id: toastId });
        setIsOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to update course", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred while updating course", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton className="w-[90%] max-h-[85vh] overflow-y-auto md:max-w-2xl! bg-[#0d0a1f] border-white/10 text-white custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">Update Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Course Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Introduction to React"
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of this course..."
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30 min-h-[100px]"
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
              buttonName={loading ? "Updating..." : "Update Course"}
              varient="yellow"
              disabled={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
