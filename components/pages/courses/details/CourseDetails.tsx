import PageHeader from "@/components/ui/PageHeader";
import { Course, Student } from "@/types/course/course.type";
import AddStudent from "./AddStudent";
import { Users, UserCheck, BookOpen, GraduationCap } from "lucide-react";

const CourseDetails = ({ course, students }: { course: Course, students: Student[] }) => {
    return (
        <div className="space-y-8 mt-4">
            <div className="flex justify-between items-center">
                <PageHeader title={course.name || "Course Details"} subtitle={course.description || "Manage course details, subjects, and students"} />
                <AddStudent courseId={course.id} students={students} />
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="effect p-5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)]">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-white/50 text-sm">Subjects</p>
                        <h4 className="text-2xl font-bold text-white">{new Set(course.subjectsAndTeachers?.map(st => st.subjectId)).size || 0}</h4>
                    </div>
                </div>
                <div className="effect p-5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-yellow)]/20 flex items-center justify-center text-[var(--accent-yellow)]">
                        <UserCheck size={24} />
                    </div>
                    <div>
                        <p className="text-white/50 text-sm">Teachers</p>
                        <h4 className="text-2xl font-bold text-white">{new Set(course.subjectsAndTeachers?.map(st => st.teacherId)).size || 0}</h4>
                    </div>
                </div>
                <div className="effect p-5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-[var(--accent-blue)]">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-white/50 text-sm">Students Enrolled</p>
                        <h4 className="text-2xl font-bold text-white">{course.students?.length || 0}</h4>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subjects & Teachers List */}
                <div className="effect p-6 rounded-xl border border-white/5 bg-black/20">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="text-[var(--accent-yellow)]" /> Subjects & Teachers
                    </h3>
                    {course.subjectsAndTeachers && course.subjectsAndTeachers.length > 0 ? (
                        <div className="space-y-3">
                            {course.subjectsAndTeachers.map((st, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors">
                                    <div>
                                        <p className="text-white font-medium">{st.subjectName}</p>
                                        <p className="text-white/50 text-sm flex items-center gap-2 mt-1">
                                            <UserCheck size={14} className="text-white/40" /> {st.teacherName}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
                            <p className="text-white/50">No subjects and teachers assigned.</p>
                        </div>
                    )}
                </div>

                {/* Students List */}
                <div className="effect p-6 rounded-xl border border-white/5 bg-black/20">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <GraduationCap className="text-[var(--accent-blue)]" /> Enrolled Students
                    </h3>
                    {course.students && course.students.length > 0 ? (
                        <div className="space-y-3">
                            {course.students.map((student, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-white/70 font-bold">
                                        {student.studentName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{student.studentName}</p>
                                        <p className="text-white/40 text-xs">ID: {student.studentId}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
                            <p className="text-white/50">No students enrolled yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;