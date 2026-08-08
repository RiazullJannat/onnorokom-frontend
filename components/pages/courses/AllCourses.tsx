"use client";

import { Course } from "@/types/course/course.type";
import { format } from "date-fns";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AllCourses({ courses }: { courses: Course[] }) {
    if (!courses || courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5 mt-8">
                <p className="text-white/60 mb-4 text-center max-w-sm">You don't have any courses yet. Create one to get started.</p>
            </div>
        );
    }

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

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-xs text-white/40">
                                    {format(new Date(course.createdAt || new Date()), "MMM dd, yyyy")}
                                </span>

                                <div className="flex items-center gap-3">
                                    <button
                                        className="text-white/50 hover:text-[var(--accent-yellow)] transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        className="text-white/50 hover:text-[var(--accent-red)] transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
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
        </div>
    );
}