import { getAssignmentById } from "@/service/assignments/assignments.service";
import AssignmentDetails from "@/components/pages/assignments/details/AssignmentDetails";

const AssignmentDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await getAssignmentById(Number(id));
    return (
        <div>
            <AssignmentDetails assignment={res?.data || {}} />
        </div>
    );
};

export default AssignmentDetailsPage;