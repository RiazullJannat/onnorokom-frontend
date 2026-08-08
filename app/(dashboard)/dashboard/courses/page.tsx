import CreateCourse from "@/components/pages/courses/CreateCourse";
import AllCourses from "@/components/pages/courses/AllCourses";
import PageHeader from "@/components/ui/PageHeader";
import { getCourses } from "@/service/courseService/course.service";

export default async function CoursesPage() {
    const res = await getCourses();
    console.log(res.data);
    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Courses" subtitle="Manage all the courses" />
                <CreateCourse />
            </div>
            <div>
                <AllCourses courses={res.data || []} />
            </div>
        </div>
    );
}