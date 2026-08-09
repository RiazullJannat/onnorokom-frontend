"use client";

import { useState } from "react";
import { TAssignment } from "@/types/assignments/assignments.type";
import { format } from "date-fns";
import { Eye, Pencil, Trash2, Calendar, FileText, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteAssignment } from "@/service/assignments/assignments.service";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ButtonComponent from "@/components/ui/ButtonComponent";
import UpdateAssignmentModal from "./UpdateAssignmentModal";
import { useGetRole } from "@/hooks/useGetRole";
import { useRouter } from "next/navigation";

export default function AllAssignment({ assignments }: { assignments: TAssignment[] }) {
    const [updateAssignmentState, setUpdateAssignmentState] = useState<TAssignment | null>(null);
    const [deleteAssignmentId, setDeleteAssignmentId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const { role } = useGetRole();
    const router = useRouter();

    const handleDelete = async () => {
        if (!deleteAssignmentId) return;
        setIsDeleting(true);
        try {
            const res = await deleteAssignment(deleteAssignmentId);
            if (res?.message || !res?.error) {
                toast.success("Assignment deleted successfully");
                router.refresh();
            } else {
                toast.error("Failed to delete assignment");
            }
        } catch (error) {
            toast.error("An error occurred while deleting assignment");
        } finally {
            setIsDeleting(false);
            setDeleteAssignmentId(null);
        }
    };

    if (!assignments || assignments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5 mt-8">
                <FileText className="w-12 h-12 text-white/20 mb-4" />
                <p className="text-white/60 mb-2 text-center max-w-sm">No assignments found.</p>
                <p className="text-white/40 text-sm text-center">Create one to get started.</p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="effect flex flex-col rounded-xl overflow-hidden group relative border border-white/5 hover:border-white/15 transition-all duration-300 transform hover:-translate-y-1">
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            {assignment.isPublished ? (
                                <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                                    <CheckCircle2 size={12} /> Published
                                </span>
                            ) : (
                                <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                                    <XCircle size={12} /> Draft
                                </span>
                            )}
                        </div>

                        {/* Thumbnail placeholder gradient */}
                        <div className="w-full h-32 relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex flex-col items-start justify-end p-4 overflow-hidden">
                            <h2 className="text-2xl font-bold text-white mb-1 line-clamp-1">{assignment.title}</h2>
                            <p className="text-white/70 text-sm">{assignment.courseName} • {assignment.subjectName}</p>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1 bg-black/20">
                            <p className="text-sm text-white/50 mb-4 line-clamp-2 flex-1 min-h-[40px]">
                                {assignment.description || "No description provided."}
                            </p>

                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex items-center justify-between text-xs text-white/60 bg-white/5 p-2 rounded-lg border border-white/5">
                                    <span className="flex items-center gap-1"><Calendar size={14} className="text-[var(--accent-blue)]"/> Deadline</span>
                                    <span className="text-white font-medium">{format(new Date(assignment.deadline || new Date()), "MMM dd, yyyy - hh:mm a")}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-white/60 bg-white/5 p-2 rounded-lg border border-white/5">
                                    <span className="flex items-center gap-1"><FileText size={14} className="text-[var(--accent-yellow)]"/> Max Marks</span>
                                    <span className="text-white font-medium text-[var(--accent-yellow)]">{assignment.maxMarks}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-xs text-white/40">
                                    Created: {format(new Date(assignment.createdAt || new Date()), "MMM dd, yyyy")}
                                </span>

                                <div className="flex items-center gap-3">
                                    {(role === 'Admin' || role === 'Teacher') && (
                                        <>
                                            <button
                                                onClick={() => setUpdateAssignmentState(assignment)}
                                                className="text-white/50 hover:text-[var(--accent-yellow)] transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteAssignmentId(assignment.id)}
                                                className="text-white/50 hover:text-[var(--accent-red)] transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </>
                                    )}
                                    <Link
                                        href={`/dashboard/assignments/${assignment.id}`}
                                        className="text-white/50 hover:text-[var(--accent-blue)] transition-colors"
                                        title="View"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <UpdateAssignmentModal
                assignment={updateAssignmentState}
                isOpen={!!updateAssignmentState}
                setIsOpen={(open) => !open && setUpdateAssignmentState(null)}
            />

            <Dialog open={!!deleteAssignmentId} onOpenChange={(open) => !open && setDeleteAssignmentId(null)}>
                <DialogContent showCloseButton className="w-[90%] md:max-w-md! bg-[#0d0a1f] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">Delete Assignment</DialogTitle>
                        <DialogDescription className="text-white/60 mt-2">
                            Are you sure you want to delete this assignment? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                        <ButtonComponent
                            type="button"
                            buttonName="Cancel"
                            varient="default"
                            onClick={() => setDeleteAssignmentId(null)}
                            className="text-white/70 hover:bg-white/10"
                        />
                        <ButtonComponent
                            type="button"
                            buttonName={isDeleting ? "Deleting..." : "Delete"}
                            varient="red"
                            disabled={isDeleting}
                            onClick={handleDelete}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}