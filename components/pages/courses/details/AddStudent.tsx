"use client";

import { useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { assignStudentsToCourse } from "@/service/courseService/course.service";
import { Student } from "@/types/course/course.type";
import { Plus, X, UserPlus } from "lucide-react";
import { useGetRole } from "@/hooks/useGetRole";
import { useRouter } from "next/navigation";

export default function AddStudent({ 
    courseId,
    students = [] 
}: { 
    courseId: number;
    students: Student[]; 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([""]);
    const [loading, setLoading] = useState(false);
    const { role } = useGetRole();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading("Adding students...");

        const validStudentIds = selectedStudents
            .filter(id => id !== "")
            .map(id => Number(id));

        if (selectedStudents.length > 0 && validStudentIds.length !== selectedStudents.length) {
            toast.error("Please select a student for all rows.", { id: toastId });
            return;
        }

        if (validStudentIds.length === 0) {
            toast.error("Please select at least one student.", { id: toastId });
            return;
        }

        setLoading(true);
        try {
            const res = await assignStudentsToCourse(courseId, { 
                studentIds: validStudentIds 
            });
            if (res) {
                toast.success(res?.message || "Students added successfully", { id: toastId });
                setIsOpen(false);
                setSelectedStudents([""]);
                router.refresh(); // Refresh the page to show new students
            } else {
                toast.error("Failed to add students", { id: toastId });
            }
        } catch (error) {
            toast.error("An error occurred while adding students", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {role === 'Admin' && (
                <ButtonComponent
                    type="button"
                    buttonName="Add Students"
                    varient="yellow"
                    icon={UserPlus}
                    onClick={() => setIsOpen(true)}
                />
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent showCloseButton className="w-[90%] max-h-[85vh] overflow-y-auto md:max-w-md! bg-[#0d0a1f] border-white/10 text-white custom-scrollbar">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white mb-2">Add Students</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-white/80">Select Students</label>
                                <button 
                                    type="button" 
                                    onClick={() => setSelectedStudents([...selectedStudents, ""])}
                                    className="text-xs flex items-center gap-1 text-[var(--accent-yellow)] hover:underline"
                                >
                                    <Plus size={14} /> Add Another
                                </button>
                            </div>
                            <div className="space-y-3">
                                {selectedStudents.map((studentId, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-black/20 p-3 rounded-xl border border-white/5">
                                        <div className="flex-1">
                                            <Select value={studentId} onValueChange={(val) => {
                                                const newArr = [...selectedStudents];
                                                newArr[idx] = val;
                                                setSelectedStudents(newArr);
                                            }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Student" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {students?.map((s) => (
                                                        <SelectItem key={s.id} value={s.id.toString()}>{s.name} ({s.email})</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {selectedStudents.length > 1 && (
                                            <button 
                                                type="button"
                                                onClick={() => setSelectedStudents(selectedStudents.filter((_, i) => i !== idx))}
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
                                buttonName={loading ? "Adding..." : "Add Students"}
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