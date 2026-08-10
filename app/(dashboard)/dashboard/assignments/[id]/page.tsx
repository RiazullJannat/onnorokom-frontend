import { getAssignmentById, getAssignmentSubmission } from "@/service/assignments/assignments.service";
import AssignmentDetails from "@/components/pages/assignments/details/AssignmentDetails";
import Submissions from "@/components/pages/assignments/details/Submissions";

const AssignmentDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await getAssignmentById(Number(id));
    const submissRes = await getAssignmentSubmission(Number(id));

    return (
        <div>
            <AssignmentDetails assignment={res?.data || {}} />
            <Submissions submissions={submissRes?.data || []} />
        </div>
    );
};

export default AssignmentDetailsPage;