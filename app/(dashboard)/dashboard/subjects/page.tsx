import AllSubjects from "@/components/pages/subjects/AllSubjects"
import CreateSubjects from "@/components/pages/subjects/CreateSubjects"
import PageHeader from "@/components/ui/PageHeader"
import { getAllSubjects } from "@/service/subjects/subjects.service"

const Page = async () => {
    const sub = await getAllSubjects()

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Subjects" subtitle="Manage subjects" />
                <CreateSubjects />
            </div>
            <div>
                <AllSubjects subjects={sub?.data || []} />
            </div>
        </div>
    )
}

export default Page