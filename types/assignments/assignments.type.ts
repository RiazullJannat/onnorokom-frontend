export type CreateAssignmentPayload = {
    title: string;
    description: string;
    deadline: string;
    maxMarks: number;
    isPublished: boolean;
    courseId: number;
    subjectId: number;
}

export type TAssignment = {
    id: number,
    title: string,
    description: string,
    deadline: string,
    maxMarks: number,
    isPublished: boolean,
    courseId: number,
    courseName: string,
    subjectId: number,
    subjectName: string,
    teacherId: number,
    teacherName: string,
    createdAt: string,
    updatedAt: string
}

export type TUpdateAssignmentPayload = {
    title: string,
    description: string,
    deadline: string,
    maxMarks: number,
    isPublished: boolean,
}


//------------------------------Review-------------------
export type TSubmissionStatus = "Submitted" | "Graded" | "Late";

export type CreateAssignmentReviewPayload = {
    marksAwarded: number;
    teacherFeedback: string;
    status: TSubmissionStatus;
}


export type TAssignmentSubmission = {
    id: number,
    assignmentId: number,
    studentId: number,
    studentName: string,
    content: string,
    submittedAt: string,
    marksAwarded: number | null,
    teacherFeedback: string | null,
    status: TSubmissionStatus,
    updatedAt: string
}