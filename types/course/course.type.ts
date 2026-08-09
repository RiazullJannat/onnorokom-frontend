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
    createdAt?: string | Date;
    subjectsAndTeachers: {
        subjectId: number;
        subjectName: string;
        teacherId: number;
        teacherName: string;
    }[];
    students: {
        studentId: number;
        studentName: string;
    }[];
}


export type Student = {
    id: number;
    name: string;
    email: string;
    role: TRole;
}

export type TRole = "Admin" | "Teacher" | "Student";