import AddAssignment from "@/components/pages/assignments/AddAssignment";
import AllAssignment from "@/components/pages/assignments/AllAssignment";
import PageHeader from "@/components/ui/PageHeader";
import { getAssignments } from "@/service/assignments/assignments.service";
import { getCourses } from "@/service/courseService/course.service";
import { getAllSubjects } from "@/service/subjects/subjects.service";

const AssignmentPage = async () => {
    const res = await getAssignments();
    const courseRes = await getCourses();
    const subRes = await getAllSubjects();
    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Assignments" subtitle="Manage assignments" />
                <AddAssignment courses={courseRes?.data || []} subjects={subRes?.data || []}/>
            </div>
            <div>
                <AllAssignment assignments={res?.data || []} />
            </div>
        </div>
    );
};

export default AssignmentPage;