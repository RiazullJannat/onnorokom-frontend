"use client";

import { TAssignmentSubmission } from "@/types/assignments/assignments.type";
import { format } from "date-fns";
import { useGetRole } from "@/hooks/useGetRole";
import SubmitReview from "./SubmitReview";
import SubmitAnswer from "./SubmitAnswer";
import { User, Calendar, CheckCircle, FileText, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

const Submissions = ({ submissions }: { submissions: TAssignmentSubmission[] }) => {
    const { role, isLoading } = useGetRole();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Graded":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "Submitted":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "Late":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    if (!submissions || submissions.length === 0) {
        return (
            <div className="mt-8 effect p-8 rounded-xl border border-white/5 bg-black/20 text-center">
                <FileText className="mx-auto h-12 w-12 text-white/20 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Submissions Yet</h3>
                <p className="text-white/50">There are currently no submissions for this assignment.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 space-y-6">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                <FileText className="text-[var(--accent-yellow)]" /> 
                {role === "Student" ? "My Submission" : `Submissions (${submissions.length})`}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {submissions.map((sub) => (
                    <div key={sub.id} className="effect p-5 rounded-xl border border-white/5 bg-black/20 flex flex-col gap-4 transition-all hover:border-white/10 hover:bg-black/30">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <span className="text-white font-medium flex items-center gap-2">
                                    <User size={16} className="text-[var(--accent-yellow)]" />
                                    {sub.studentName}
                                </span>
                                <span className="text-white/50 text-sm flex items-center gap-2">
                                    <Calendar size={14} className="text-white/40" />
                                    {sub.submittedAt ? format(new Date(sub.submittedAt), "PPp") : "Unknown date"}
                                </span>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${getStatusColor(sub.status)}`}>
                                {sub.status === "Graded" && <CheckCircle size={12} />}
                                {sub.status === "Late" && <Clock size={12} />}
                                {sub.status === "Submitted" && <FileText size={12} />}
                                {sub.status}
                            </span>
                        </div>

                        {/* Marks & Feedback Preview */}
                        {sub.status === "Graded" && (
                            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white/60 text-xs uppercase tracking-wider">Marks Awarded</span>
                                    <span className="text-green-400 font-bold text-lg">{sub.marksAwarded}</span>
                                </div>
                                {sub.teacherFeedback && (
                                    <div className="mt-2 text-sm text-white/70 border-t border-green-500/10 pt-3">
                                        <span className="text-white/50 block text-xs mb-1 uppercase tracking-wider">Teacher Feedback</span>
                                        <p className="italic leading-relaxed">&quot;{sub.teacherFeedback}&quot;</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                            {/* View Content Dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-sm text-[var(--accent-blue)] hover:text-[var(--accent-blue)]/80 font-medium transition-colors flex items-center gap-1.5">
                                        <FileText size={14} />
                                        View Answer
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-2xl! bg-black/90 border-white/10 text-white max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl">Answer by {sub.studentName}</DialogTitle>
                                        <DialogDescription className="text-white/50">
                                            Submitted on {sub.submittedAt ? format(new Date(sub.submittedAt), "PPp") : "Unknown"}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4 p-5 rounded-lg bg-white/5 border border-white/10 whitespace-pre-wrap text-white/80 leading-relaxed font-mono text-sm max-h-[50vh] overflow-y-auto custom-scrollbar">
                                        {sub.content || "No content provided."}
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Edit Answer Button for Students */}
                            {!isLoading && role === "Student" && sub.status !== "Graded" && (
                                <div className="ml-auto">
                                    <SubmitAnswer 
                                        assignmentId={sub.assignmentId} 
                                        initialData={{ id: sub.id, content: sub.content }} 
                                    />
                                </div>
                            )}

                            {/* Review Button for Teachers/Admins */}
                            {!isLoading && role !== "Student" && (
                                <div className="ml-auto">
                                    <SubmitReview 
                                        assignmentId={sub.assignmentId}
                                        submissionId={sub.id} 
                                        initialData={{ 
                                            marksAwarded: sub.marksAwarded, 
                                            teacherFeedback: sub.teacherFeedback, 
                                            status: sub.status 
                                        }} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Submissions;