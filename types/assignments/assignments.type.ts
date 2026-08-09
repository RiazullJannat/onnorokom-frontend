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