export type CreateCoursePayload = {
    name: string;
    description: string;
}

export type Course = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}