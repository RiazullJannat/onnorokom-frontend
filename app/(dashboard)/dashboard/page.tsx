import DashboardReports from "@/components/pages/dashboard/DashboardReports";
import PageHeader from "@/components/ui/PageHeader";
import { dashboardReports } from "@/service/dashbaord/dashbaord.service";

const page = async () => {
  const res = await dashboardReports();
  return (
    <div>
      <PageHeader title="Reports" subtitle="Admin analytical overview" />
      <DashboardReports dashboardReports={res?.data} />
    </div>
  );
};

export default page;