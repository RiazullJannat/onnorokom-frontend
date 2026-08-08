import CreateCourse from "@/components/pages/courses/CreateCourse";
import AllCourses from "@/components/pages/courses/AllCourses";
import PageHeader from "@/components/ui/PageHeader";
import { getCourses } from "@/service/courseService/course.service";
import { getAllSubjects } from "@/service/subjects/subjects.service";
import { getAllTeachers } from "@/service/authService";

export default async function CoursesPage() {
    const res = await getCourses();
    const subRes = await getAllSubjects();
    const techRes = await getAllTeachers();
    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Courses" subtitle="Manage all the courses" />
                <CreateCourse subjects ={subRes.data || []}  teachers = {techRes.data || []} />
            </div>
            <div>
                <AllCourses courses={res.data || []} />
            </div>
        </div>
    );
}