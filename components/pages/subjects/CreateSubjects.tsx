"use client";

import { useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useGetRole } from "@/hooks/useGetRole";
import { createSubject } from "@/service/subjects/subjects.service";

export default function CreateSubjects({ onSuccess }: { onSuccess?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const { role } = useGetRole();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading("Creating subject...");

        if (!name) {
            toast.error("Name is required", { id: toastId });
            return;
        }

        setLoading(true);
        try {
            const res = await createSubject({ name });
            if (res) {
                toast.success(res.message || "Subject created successfully", { id: toastId });
                setIsOpen(false);
                setName("");
                if (onSuccess) onSuccess();
            } else {
                toast.error("Failed to create subject", { id: toastId });
            }
        } catch (error) {
            toast.error("An error occurred while creating subject", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {role === 'Admin' && (
                <ButtonComponent
                    type="button"
                    buttonName="Create Subject"
                    varient="yellow"
                    icon={Plus}
                    onClick={() => setIsOpen(true)}
                />
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent showCloseButton className="w-[90%] max-h-[85vh] overflow-y-auto md:max-w-md! bg-[#0d0a1f] border-white/10 text-white custom-scrollbar">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white mb-2">Create Subject</DialogTitle>
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
                                buttonName={loading ? "Creating..." : "Create Subject"}
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