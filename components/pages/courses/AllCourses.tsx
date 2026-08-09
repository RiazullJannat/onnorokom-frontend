"use client";

import { useState } from "react";
import { Course } from "@/types/course/course.type";
import { format } from "date-fns";
import { Eye, Pencil, Trash2, Users, UserCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteCourse } from "@/service/courseService/course.service";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ButtonComponent from "@/components/ui/ButtonComponent";
import UpdateCourseModal from "./UpdateCourseModal";
import { useGetRole } from "@/hooks/useGetRole";

export default function AllCourses({
    courses,
    subjects = [],
    teachers = []
}: {
    courses: Course[];
    subjects?: any[];
    teachers?: any[];
}) {
    const [updateCourseState, setUpdateCourseState] = useState<Course | null>(null);
    const [deleteCourseId, setDeleteCourseId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteCourseId) return;
        setIsDeleting(true);
        try {
            const res = await deleteCourse(deleteCourseId);
            if (res?.message || !res?.error) {
                toast.success("Course deleted successfully");
            } else {
                toast.error("Failed to delete course");
            }
        } catch (error) {
            toast.error("An error occurred while deleting course");
        } finally {
            setIsDeleting(false);
            setDeleteCourseId(null);
        }
    };

    if (!courses || courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5 mt-8">
                <p className="text-white/60 mb-4 text-center max-w-sm">You don't have any courses yet. Create one to get started.</p>
            </div>
        );
    }

    const { role } = useGetRole()

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="effect flex flex-col rounded-xl overflow-hidden group relative border border-white/5 hover:border-white/15 transition-all duration-300 transform hover:-translate-y-1">
                        {/* Thumbnail placeholder gradient */}
                        <div className="w-full h-32 relative bg-gradient-to-br from-yellow-400/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                            <h2 className="text-4xl font-bold text-white/30">{course.name.charAt(0).toUpperCase()}</h2>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1 bg-black/20">
                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                                {course.name}
                            </h3>
                            <p className="text-sm text-white/50 mb-4 line-clamp-2 flex-1">
                                {course.description}
                            </p>

                            <div className="flex items-center gap-4 mb-4 text-xs text-white/60">
                                <div className="flex items-center gap-1.5" title="Students">
                                    <Users size={14} className="text-[var(--accent-blue)]" />
                                    <span>{course.students?.length || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5" title="Teachers">
                                    <UserCheck size={14} className="text-[var(--accent-yellow)]" />
                                    <span>{new Set(course.subjectsAndTeachers?.map(st => st.teacherId)).size || 0}</span>
                                </div>
                                <div className="flex items-center gap-1.5" title="Subjects">
                                    <BookOpen size={14} className="text-[var(--accent-green)]" />
                                    <span>{new Set(course.subjectsAndTeachers?.map(st => st.subjectId)).size || 0}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-xs text-white/40">
                                    {format(new Date(course.createdAt || new Date()), "MMM dd, yyyy")}
                                </span>

                                <div className="flex items-center gap-3">
                                    {role == "Admin" &&
                                        <>
                                            <button
                                                onClick={() => setUpdateCourseState(course)}
                                                className="text-white/50 hover:text-[var(--accent-yellow)] transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteCourseId(course.id)}
                                                className="text-white/50 hover:text-[var(--accent-red)] transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </>}
                                    <Link
                                        href={`/dashboard/courses/${course.id}`}
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

            <UpdateCourseModal
                course={updateCourseState}
                isOpen={!!updateCourseState}
                setIsOpen={(open) => !open && setUpdateCourseState(null)}
                subjects={subjects}
                teachers={teachers}
            />

            <Dialog open={!!deleteCourseId} onOpenChange={(open) => !open && setDeleteCourseId(null)}>
                <DialogContent showCloseButton className="w-[90%] md:max-w-md! bg-[#0d0a1f] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">Delete Course</DialogTitle>
                        <DialogDescription className="text-white/60 mt-2">
                            Are you sure you want to delete this course? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                        <ButtonComponent
                            type="button"
                            buttonName="Cancel"
                            varient="default"
                            onClick={() => setDeleteCourseId(null)}
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