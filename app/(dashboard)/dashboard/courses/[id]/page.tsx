import ButtonComponent from "@/components/ui/ButtonComponent";
import PageHeader from "@/components/ui/PageHeader";
import { useGetRole } from "@/hooks/useGetRole";
import { getCourse } from "@/service/courseService/course.service";

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await getCourse(Number(id));
    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Course Details" subtitle="Manage course" />
                {/* <div className="flex gap-2">
                    {role == 'Admin' && <ButtonComponent varient="yellow" buttonName="Add Teacher" />}
                    {(role == 'Admin' || role == 'Teacher') && <ButtonComponent varient="green" buttonName="Add Student" />}
                    {role == 'Admin' && <ButtonComponent varient="purple" buttonName="Add Subjects" />}
                </div> */}
            </div>
        </div>
    );
};