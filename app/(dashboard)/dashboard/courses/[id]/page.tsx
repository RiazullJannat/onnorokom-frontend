import CourseDetails from "@/components/pages/courses/details/CourseDetails";
import { getAllStudents } from "@/service/authService";
import { getCourse } from "@/service/courseService/course.service";

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await getCourse(Number(id));
    const stdRes = await getAllStudents();

    return (
        <div>
            <CourseDetails course={res?.data || {}} students={stdRes.data || []} />
        </div>
    );
};