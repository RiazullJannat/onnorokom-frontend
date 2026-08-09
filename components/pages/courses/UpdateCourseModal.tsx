"use client";

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateCourse } from "@/service/courseService/course.service";
import { Course } from "@/types/course/course.type";
import { Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UpdateCourseModal({
  course,
  isOpen,
  setIsOpen,
  onSuccess,
  subjects = [],
  teachers = []
}: {
  course: Course | null;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSuccess?: () => void;
  subjects?: any[];
  teachers?: any[];
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subjectsAndTeachers, setSubjectsAndTeachers] = useState<{subjectId: number | string, teacherId: number | string}[]>([{ subjectId: "", teacherId: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setName(course.name || "");
      setDescription(course.description || "");
      if (course.subjectsAndTeachers && course.subjectsAndTeachers.length > 0) {
        setSubjectsAndTeachers(course.subjectsAndTeachers.map(st => ({ subjectId: st.subjectId, teacherId: st.teacherId })));
      } else {
        setSubjectsAndTeachers([{ subjectId: "", teacherId: "" }]);
      }
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

    const validPairs = subjectsAndTeachers
        .filter(st => st.subjectId !== "" && st.teacherId !== "")
        .map(st => ({
            subjectId: Number(st.subjectId),
            teacherId: Number(st.teacherId)
        }));

    if (subjectsAndTeachers.length > 0 && validPairs.length !== subjectsAndTeachers.length) {
        toast.error("Please select both a subject and a teacher for all rows.", { id: toastId });
        return;
    }

    setLoading(true);
    try {
      const res = await updateCourse(course.id, { 
          name, 
          description,
          subjectsAndTeachers: validPairs
      });
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
          
          <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white/80">Subjects and Teachers</label>
                  <button 
                      type="button" 
                      onClick={() => setSubjectsAndTeachers([...subjectsAndTeachers, { subjectId: "", teacherId: "" }])}
                      className="text-xs flex items-center gap-1 text-[var(--accent-yellow)] hover:underline"
                  >
                      <Plus size={14} /> Add Another
                  </button>
              </div>
              <div className="space-y-3">
                  {subjectsAndTeachers.map((st, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-black/20 p-3 rounded-xl border border-white/5">
                          <div className="flex-1">
                              <Select value={st.subjectId.toString()} onValueChange={(val) => {
                                  const newArr = [...subjectsAndTeachers];
                                  newArr[idx].subjectId = val;
                                  setSubjectsAndTeachers(newArr);
                              }}>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select Subject" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      {subjects?.map((s) => (
                                          <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                          </div>
                          <div className="flex-1">
                              <Select value={st.teacherId.toString()} onValueChange={(val) => {
                                  const newArr = [...subjectsAndTeachers];
                                  newArr[idx].teacherId = val;
                                  setSubjectsAndTeachers(newArr);
                              }}>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select Teacher" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      {teachers?.map((t) => (
                                          <SelectItem key={t.id || t.Id} value={(t.id || t.Id).toString()}>{t.name}</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                          </div>
                          {subjectsAndTeachers.length > 1 && (
                              <button 
                                  type="button"
                                  onClick={() => setSubjectsAndTeachers(subjectsAndTeachers.filter((_, i) => i !== idx))}
                                  className="text-white/50 hover:text-red-500 transition p-2"
                              >
                                  <X size={18} />
                              </button>
                          )}
                      </div>
                  ))}
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
