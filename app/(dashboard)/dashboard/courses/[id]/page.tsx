import AllAssignment from "@/components/pages/assignments/AllAssignment";
import CourseDetails from "@/components/pages/courses/details/CourseDetails";
import PageHeader from "@/components/ui/PageHeader";
import { getAssignmentsByCourse } from "@/service/assignments/assignments.service";
import { getAllStudents } from "@/service/authService";
import { getCourse } from "@/service/courseService/course.service";

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await getCourse(Number(id));
    const assignmentRes = await getAssignmentsByCourse(Number(id));
    const stdRes = await getAllStudents();

    return (
        <div>
            <CourseDetails course={res?.data || {}} students={stdRes.data || []} />
            <div className="my-6">
                <PageHeader title="Assignments" />
                <AllAssignment assignments={assignmentRes?.data || []} />
            </div>
        </div>
    );
};