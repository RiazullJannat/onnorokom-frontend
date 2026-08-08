"use client";

import { useState } from "react";
import { Subject } from "@/types/subjects/subjects.type";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteSubject } from "@/service/subjects/subjects.service";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ButtonComponent from "@/components/ui/ButtonComponent";
import UpdateSubjectModal from "./UpdateSubjectModal";

export default function AllSubjects({ subjects }: { subjects: Subject[] }) {
    const [updateSubjectState, setUpdateSubjectState] = useState<Subject | null>(null);
    const [deleteSubjectId, setDeleteSubjectId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteSubjectId) return;
        setIsDeleting(true);
        try {
            const res = await deleteSubject(deleteSubjectId);
            if (res?.message || !res?.error) {
                toast.success("Subject deleted successfully");
            } else {
                toast.error("Failed to delete subject");
            }
        } catch (error) {
            toast.error("An error occurred while deleting subject");
        } finally {
            setIsDeleting(false);
            setDeleteSubjectId(null);
        }
    };

    if (!subjects || subjects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5 mt-8">
                <p className="text-white/60 mb-4 text-center max-w-sm">You don't have any subjects yet. Create one to get started.</p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjects.map((subject) => (
                    <div key={subject.id} className="effect flex flex-col rounded-xl overflow-hidden group relative border border-white/5 hover:border-white/15 transition-all duration-300 transform hover:-translate-y-1">
                        {/* Thumbnail placeholder gradient */}
                        <div className="w-full h-24 relative bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                            <h2 className="text-3xl font-bold text-white/30">{subject.name.charAt(0).toUpperCase()}</h2>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1 bg-black/20">
                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                                {subject.name}
                            </h3>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-xs text-white/40">
                                    {format(new Date(subject.createdAt || new Date()), "MMM dd, yyyy")}
                                </span>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setUpdateSubjectState(subject)}
                                        className="text-white/50 hover:text-[var(--accent-yellow)] transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteSubjectId(subject.id)}
                                        className="text-white/50 hover:text-[var(--accent-red)] transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <UpdateSubjectModal
                subject={updateSubjectState}
                isOpen={!!updateSubjectState}
                setIsOpen={(open) => !open && setUpdateSubjectState(null)}
            />

            <Dialog open={!!deleteSubjectId} onOpenChange={(open) => !open && setDeleteSubjectId(null)}>
                <DialogContent showCloseButton className="w-[90%] md:max-w-md! bg-[#0d0a1f] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">Delete Subject</DialogTitle>
                        <DialogDescription className="text-white/60 mt-2">
                            Are you sure you want to delete this subject? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                        <ButtonComponent
                            type="button"
                            buttonName="Cancel"
                            varient="default"
                            onClick={() => setDeleteSubjectId(null)}
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