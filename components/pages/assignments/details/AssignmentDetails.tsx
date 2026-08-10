import { TAssignment } from "@/types/assignments/assignments.type";
import PageHeader from "@/components/ui/PageHeader";
import { format } from "date-fns";
import { BookOpen, Calendar, CheckCircle2, FileText, UserCheck, XCircle } from "lucide-react";
import SubmitAnswer from "./SubmitAnswer";

const AssignmentDetails = ({ assignment }: { assignment: TAssignment }) => {
    return (
        <div className="space-y-6">
            <div className="flex  justify-between items-center">
                <PageHeader
                    title={assignment.title || "Assignment Details"}
                    subtitle={`For ${assignment.courseName} • ${assignment.subjectName}`}
                />
                <SubmitAnswer assignmentId={assignment.id} />
            </div>

            {/* Quick Stats/Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="effect p-4 rounded-xl border border-white/5 bg-white/5 flex flex-col gap-2">
                    <p className="text-white/50 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <FileText size={14} className="text-[var(--accent-yellow)]" /> Total Marks
                    </p>
                    <h4 className="text-2xl font-bold text-white">{assignment.maxMarks || 0}</h4>
                </div>
                <div className="effect p-4 rounded-xl border border-white/5 bg-white/5 flex flex-col gap-2">
                    <p className="text-white/50 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Calendar size={14} className="text-[var(--accent-blue)]" /> Deadline
                    </p>
                    <h4 className="text-lg font-bold text-white truncate" title={assignment.deadline ? format(new Date(assignment.deadline), "PPp") : "No deadline"}>
                        {assignment.deadline ? format(new Date(assignment.deadline), "MMM dd, yyyy") : "N/A"}
                    </h4>
                </div>
                <div className="effect p-4 rounded-xl border border-white/5 bg-white/5 flex flex-col gap-2">
                    <p className="text-white/50 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <UserCheck size={14} className="text-[var(--accent-green)]" /> Teacher
                    </p>
                    <h4 className="text-lg font-bold text-white truncate" title={assignment.teacherName}>
                        {assignment.teacherName || "Not assigned"}
                    </h4>
                </div>
                <div className="effect p-4 rounded-xl border border-white/5 bg-white/5 flex flex-col gap-2">
                    <p className="text-white/50 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        Status
                    </p>
                    <div className="mt-1">
                        {assignment.isPublished ? (
                            <span className="inline-flex bg-green-500/20 text-green-400 border border-green-500/30 text-sm px-3 py-1.5 rounded-full items-center gap-1.5">
                                <CheckCircle2 size={16} /> Published
                            </span>
                        ) : (
                            <span className="inline-flex bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-sm px-3 py-1.5 rounded-full items-center gap-1.5">
                                <XCircle size={16} /> Draft
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Description Box */}
                <div className="lg:col-span-2 effect p-6 rounded-xl border border-white/5 bg-black/20">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="text-[var(--accent-yellow)]" /> Instructions
                    </h3>
                    {assignment.description ? (
                        <div className="prose prose-invert max-w-none">
                            <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                                {assignment.description}
                            </p>
                        </div>
                    ) : (
                        <div className="py-8 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
                            <p className="text-white/50">No description or instructions provided.</p>
                        </div>
                    )}
                </div>

                {/* Submissions or Action Sidebar */}
                <div className="effect p-6 rounded-xl border border-white/5 bg-black/20 flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        Assignment Info
                    </h3>
                    <div className="space-y-4 mt-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-white/50 text-sm">Course</span>
                            <span className="text-white font-medium">{assignment.courseName}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-white/50 text-sm">Subject</span>
                            <span className="text-white font-medium">{assignment.subjectName}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-white/50 text-sm">Created On</span>
                            <span className="text-white font-medium">
                                {assignment.createdAt ? format(new Date(assignment.createdAt), "PPP") : "N/A"}
                            </span>
                        </div>
                        {assignment.updatedAt && (
                            <div className="flex flex-col gap-1">
                                <span className="text-white/50 text-sm">Last Updated</span>
                                <span className="text-white font-medium">
                                    {format(new Date(assignment.updatedAt), "PPP")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;