"use client";

import { DashboardData } from "@/types/dashboard/dashboard.type";
import { format } from "date-fns";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  FileCheck2,
  GraduationCap,
  Layers,
  PieChart as PieChartIcon,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SEQUENTIAL_BLUE = "#3987e5";

const STATUS = {
  good: "#0ca30c",
  warning: "#fab219",
  critical: "#d03b3b",
};

const tooltipStyle = {
  backgroundColor: "#0d0a1f",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  fontSize: 12,
};

const RADIAN = Math.PI / 180;

type PieLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  payload: { textColor: string };
};

const renderPieLabel = (props: PieLabelProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } = props;
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill={payload.textColor}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

const rateTone = (rate: number) => {
  if (rate >= 80) return STATUS.good;
  if (rate >= 50) return STATUS.warning;
  return STATUS.critical;
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  accent: string;
}) => (
  <div className="effect p-5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-4">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${accent}20`, color: accent }}
    >
      <Icon size={22} />
    </div>
    <div>
      <p className="text-white/50 text-sm">{label}</p>
      <h4 className="text-2xl font-bold text-white">{value ?? 0}</h4>
    </div>
  </div>
);

const DashboardReports = ({ dashboardReports }: { dashboardReports: DashboardData }) => {
  if (!dashboardReports?.summary) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5 mt-4">
        <BarChart3 className="w-12 h-12 text-white/20 mb-4" />
        <p className="text-white/60 mb-2 text-center max-w-sm">No report data available.</p>
      </div>
    );
  }

  const { summary, enrollmentTrends, submissionStatus, classPerformance, generatedAt } =
    dashboardReports;

  const submissionData = [
    {
      key: "onTime",
      name: "Submitted (On Time)",
      value: submissionStatus?.onTime ?? 0,
      color: STATUS.good,
      textColor: "#ffffff",
    },
    {
      key: "pending",
      name: "Pending",
      value: submissionStatus?.pending ?? 0,
      color: STATUS.warning,
      textColor: "#1a1207",
    },
    {
      key: "late",
      name: "Late Submissions",
      value: submissionStatus?.late ?? 0,
      color: STATUS.critical,
      textColor: "#ffffff",
    },
  ];

  const hasSubmissionData = submissionData.some((d) => d.value > 0);

  return (
    <div className="mt-4 space-y-6">
      {generatedAt && (
        <p className="text-white/30 text-xs">
          Generated: {format(new Date(generatedAt), "MMM dd, yyyy - hh:mm a")}
        </p>
      )}

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Layers} label="Total Classes" value={summary.totalClasses} accent="var(--accent-blue, #3987e5)" />
        <StatCard icon={BookOpen} label="Total Subjects" value={summary.totalSubjects} accent="var(--accent-yellow, #eda100)" />
        <StatCard icon={Users} label="Total Teachers" value={summary.totalTeachers} accent="var(--accent-green, #1baf7a)" />
        <StatCard icon={GraduationCap} label="Total Students" value={summary.totalStudents} accent="var(--accent-blue, #3987e5)" />
        <StatCard icon={FileCheck2} label="New Submissions (Today)" value={summary.newSubmissionsToday} accent="var(--accent-green, #1baf7a)" />
        <StatCard icon={AlertTriangle} label="Overdue Assignments" value={summary.overdueAssignments} accent="var(--accent-red, #d03b3b)" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment trends */}
        <div className="effect p-6 rounded-xl border border-white/5 bg-black/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="text-(--accent-blue,#3987e5)" /> Enrollment Trends - Monthly
          </h3>
          {enrollmentTrends && enrollmentTrends.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentTrends} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="monthName"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar
                  dataKey="count"
                  name="Enrollments"
                  fill={SEQUENTIAL_BLUE}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="py-16 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
              <p className="text-white/50 text-sm">No enrollment data available.</p>
            </div>
          )}
        </div>

        {/* Submission status */}
        <div className="effect p-6 rounded-xl border border-white/5 bg-black/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <PieChartIcon className="text-(--accent-yellow,#eda100)" /> Assignment Submission Status
          </h3>
          {hasSubmissionData ? (
            <div className="flex flex-col items-center w-full">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={submissionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    stroke="none"
                    label={renderPieLabel}
                    labelLine={false}
                    isAnimationActive={false}
                  >
                    {submissionData.map((entry) => (
                      <Cell key={entry.key} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
                {submissionData.map((entry) => (
                  <div key={entry.key} className="flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-white/60">{entry.name}</span>
                    <span className="text-white/40">({entry.value})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
              <p className="text-white/50 text-sm">No submission data available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Class performance table */}
      <div className="effect p-6 rounded-xl border border-white/5 bg-black/20">
        <h3 className="text-xl font-semibold text-white mb-1">Class Performance Overview</h3>
        <p className="text-white/40 text-sm mb-4">
          Assignments, students, and submission rates per class.
        </p>
        {classPerformance && classPerformance.length > 0 ? (
          <div className="overflow-x-auto custom-scrollbar-horizontal">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left font-medium text-white/50 text-xs uppercase tracking-wide py-3 px-4">Class Name</th>
                  <th className="text-left font-medium text-white/50 text-xs uppercase tracking-wide py-3 px-4">Total Assignments</th>
                  <th className="text-left font-medium text-white/50 text-xs uppercase tracking-wide py-3 px-4">Total Students</th>
                  <th className="text-left font-medium text-white/50 text-xs uppercase tracking-wide py-3 px-4">Average Submission Rate (%)</th>
                  <th className="text-left font-medium text-white/50 text-xs uppercase tracking-wide py-3 px-4">Last Submission Date</th>
                </tr>
              </thead>
              <tbody>
                {classPerformance.map((row) => (
                  <tr key={row.courseId} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{row.courseName}</td>
                    <td className="py-3 px-4 text-white/70">{row.totalAssignments}</td>
                    <td className="py-3 px-4 text-white/70">{row.totalStudents}</td>
                    <td className="py-3 px-4 font-medium" style={{ color: rateTone(row.averageSubmissionRate) }}>
                      {row.averageSubmissionRate.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-white/50">
                      {row.lastSubmissionDate ? format(new Date(row.lastSubmissionDate), "yyyy-MM-dd") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-white/10 rounded-lg bg-white/5">
            <p className="text-white/50 text-sm">No class performance data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardReports;
