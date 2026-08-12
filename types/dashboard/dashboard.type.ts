export interface DashboardSummary {
  totalClasses: number;
  totalSubjects: number;
  totalTeachers: number;
  totalStudents: number;
  newSubmissionsToday: number;
  overdueAssignments: number;
}

export interface EnrollmentTrend {
  month: number;
  monthName: string;
  count: number;
}

export interface SubmissionStatus {
  onTime: number;
  pending: number;
  late: number;
  onTimePercentage: number;
  pendingPercentage: number;
  latePercentage: number;
}

export interface ClassPerformance {
  courseId: number;
  courseName: string;
  totalAssignments: number;
  totalStudents: number;
  averageSubmissionRate: number;
  lastSubmissionDate: string | null;
}

export interface DashboardData {
  summary: DashboardSummary;
  enrollmentTrends: EnrollmentTrend[];
  submissionStatus: SubmissionStatus;
  classPerformance: ClassPerformance[];
  generatedAt: string;
}