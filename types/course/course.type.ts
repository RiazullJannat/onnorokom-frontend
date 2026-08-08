export type CreateCoursePayload = {
    name: string;
    description: string;
    subjectsAndTeachers: {
        subjectId: number;
        teacherId: number;
    }[];
}

export type Course = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}