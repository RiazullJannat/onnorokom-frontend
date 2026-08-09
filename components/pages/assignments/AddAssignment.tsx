"use client";

import { useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createAssignment } from "@/service/assignments/assignments.service";
import { Course } from "@/types/course/course.type";
import { Subject } from "@/types/subjects/subjects.type";
import { Plus } from "lucide-react";
import { useGetRole } from "@/hooks/useGetRole";
import { useRouter } from "next/navigation";

export default function AddAssignment({ courses, subjects }: { courses: Course[], subjects: Subject[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [maxMarks, setMaxMarks] = useState<number | "">("");
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [courseId, setCourseId] = useState<string>("");
    const [subjectId, setSubjectId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const { role } = useGetRole();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading("Creating assignment...");

        if (!title || !deadline || maxMarks === "" || !courseId || !subjectId) {
            toast.error("Please fill in all required fields", { id: toastId });
            return;
        }

        setLoading(true);
        try {
            const res = await createAssignment({
                title,
                description,
                deadline,
                maxMarks: Number(maxMarks),
                isPublished,
                courseId: Number(courseId),
                subjectId: Number(subjectId)
            });

            if (res) {
                toast.success(res?.message || "Assignment created successfully", { id: toastId });
                setIsOpen(false);
                setTitle("");
                setDescription("");
                setDeadline("");
                setMaxMarks("");
                setIsPublished(false);
                setCourseId("");
                setSubjectId("");
                router.refresh();
            } else {
                toast.error("Failed to create assignment", { id: toastId });
            }
        } catch (error) {
            toast.error("An error occurred while creating assignment", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {(role === 'Admin' || role === 'Teacher') && (
                <ButtonComponent
                    type="button"
                    buttonName="Add Assignment"
                    varient="yellow"
                    icon={Plus}
                    onClick={() => setIsOpen(true)}
                />
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent showCloseButton className="w-[90%] max-h-[85vh] overflow-y-auto md:max-w-2xl! bg-[#0d0a1f] border-white/10 text-white custom-scrollbar">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white mb-2">Create Assignment</DialogTitle>
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
                                <label className="text-sm font-medium text-white/80">Course *</label>
                                <Select value={courseId} onValueChange={setCourseId} required>
                                    <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                        <SelectValue placeholder="Select Course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses?.map((c) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Subject *</label>
                                <Select value={subjectId} onValueChange={setSubjectId} required>
                                    <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                        <SelectValue placeholder="Select Subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects?.map((s) => (
                                            <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
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
                                id="isPublished"
                                checked={isPublished}
                                onChange={(e) => setIsPublished(e.target.checked)}
                                className="w-5 h-5 rounded border-white/10 bg-black/20 text-[var(--accent-yellow)] focus:ring-[var(--accent-yellow)] focus:ring-offset-0"
                            />
                            <div className="flex flex-col">
                                <label htmlFor="isPublished" className="text-sm font-medium text-white cursor-pointer">Publish immediately</label>
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
                                buttonName={loading ? "Creating..." : "Create Assignment"}
                                varient="yellow"
                                disabled={loading}
                            />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}