"use client";

import { useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitAssignmentReview } from "@/service/assignments/assignments.service";
import { toast } from "sonner";
import { TSubmissionStatus } from "@/types/assignments/assignments.type";

export type TSubmitReviewInitialData = {
    marksAwarded: number | null;
    teacherFeedback: string | null;
    status: TSubmissionStatus;
};

const SubmitReview = ({ assignmentId, submissionId, initialData }: { assignmentId: number, submissionId: number, initialData?: TSubmitReviewInitialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [marks, setMarks] = useState<number | "">(initialData?.marksAwarded ?? "");
    const [feedback, setFeedback] = useState(initialData?.teacherFeedback || "");
    const [status, setStatus] = useState<TSubmissionStatus>(initialData?.status || "Graded");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading("Submitting review...");

        if (marks === "") {
            toast.error("Please provide marks.", { id: toastId });
            return;
        }

        try {
            setLoading(true);
            const payload = {
                marksAwarded: Number(marks),
                teacherFeedback: feedback,
                status: status
            };

            const res = await submitAssignmentReview(assignmentId, submissionId, payload);

            if (res?.success) {
                toast.success(res?.message || "Review submitted successfully", { id: toastId });
                setOpen(false);
            } else {
                toast.error(res?.message || "Failed to submit review", { id: toastId });
            }
        } catch (error) {
            toast.error("An error occurred while submitting.", { id: toastId });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="inline-block">
                    <ButtonComponent varient="yellow" buttonName={initialData ? "Update Review" : "Review"} />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg! bg-black/90 border border-white/10 text-white">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl">{initialData ? "Update Review" : "Submit Review"}</DialogTitle>
                        <DialogDescription className="text-white/60">
                            Grade the submission and provide feedback to the student.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="marks" className="text-white/80">Marks Awarded</Label>
                                <Input
                                    id="marks"
                                    type="number"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value ? Number(e.target.value) : "")}
                                    placeholder="e.g. 85"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[var(--accent-yellow)]"
                                    disabled={loading}
                                    min={0}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label className="text-white/80">Status</Label>
                                <Select value={status} onValueChange={(val: TSubmissionStatus) => setStatus(val)} disabled={loading}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[var(--accent-yellow)]">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111] border-white/10 text-white">
                                        <SelectItem value="Submitted">Submitted</SelectItem>
                                        <SelectItem value="Graded">Graded</SelectItem>
                                        <SelectItem value="Late">Late</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="feedback" className="text-white/80">Teacher Feedback</Label>
                            <Textarea
                                id="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Write your feedback here..."
                                className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[var(--accent-yellow)]"
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
                        <button type="submit" disabled={loading} className="inline-block ml-2">
                            <ButtonComponent
                                buttonName={loading ? "Submitting..." : "Submit Review"}
                                varient="yellow"
                            />
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SubmitReview;