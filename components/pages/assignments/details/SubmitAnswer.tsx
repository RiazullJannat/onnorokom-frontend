"use client";

import { useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitAssignment, updateAssignmentSubmission } from "@/service/assignments/assignments.service";
import { toast } from "sonner";
import { useGetRole } from "@/hooks/useGetRole";

export type TSubmitAnswerInitialData = {
    id: number;
    content: string;
};

const SubmitAnswer = ({ assignmentId, initialData }: { assignmentId: number, initialData?: TSubmitAnswerInitialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState(initialData?.content || "");
    const { role } = useGetRole();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!answer.trim()) {
            toast.error("Answer cannot be empty");
            return;
        }

        try {
            setLoading(true);
            let res;
            if (initialData) {
                res = await updateAssignmentSubmission(assignmentId, initialData.id, { Content: answer });
            } else {
                res = await submitAssignment(assignmentId, { Content: answer });
            }

            if (res?.success) {
                toast.success(res?.message || `Answer ${initialData ? "updated" : "submitted"} successfully`);
                setOpen(false);
                if (!initialData) setAnswer("");
            } else {
                toast.error(res?.message || `Failed to ${initialData ? "update" : "submit"} answer`);
            }
        } catch (error) {
            toast.error(`An error occurred while ${initialData ? "updating" : "submitting"}.`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {role === "Student" &&
                    <div className="inline-block">
                        <ButtonComponent varient="yellow" buttonName={initialData ? "Edit Answer" : "Submit Answer"} />
                    </div>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg! ">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl">{initialData ? "Edit Your Answer" : "Submit Your Answer"}</DialogTitle>
                        <DialogDescription className="text-white/60">
                            Write your answer below. Click {initialData ? "update" : "submit"} when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="answer" className="text-white/80">Answer</Label>
                            <Textarea
                                id="answer"
                                name="answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="min-h-[200px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[var(--accent-yellow)]"
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <div className="inline-block">
                                <ButtonComponent buttonName="Cancel" varient="red" />
                            </div>
                        </DialogClose>
                        <button type="submit" disabled={loading} className="inline-block">
                            <ButtonComponent
                                clasName="ml-2"
                                buttonName={loading ? (initialData ? "Updating..." : "Submitting...") : (initialData ? "Update Answer" : "Submit Answer")}
                                varient="yellow"
                            />
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SubmitAnswer;