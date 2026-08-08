import { CreateCoursePayload } from "@/types/course/course.type";
import { createData, deleteData, putData, readData, readPublicData } from "../apiService/crud";
import { Query } from "@/types/shared/shared.types";


export async function getCourses(query?: Query) {
    return await readData(`/courses`, ["Courses"], query);
}

export async function getCourse(id: number) {
    return await readData(`/courses/${id}`, ["Courses"]);
}

export async function updateCourse(id: number, data: any) {
    return await putData(`/courses/${id}`, "/dashboard/courses", data);
}

export async function deleteCourse(id: number) {
    return await deleteData(`/courses/${id}`, "/dashboard/courses");
}

export async function createCourse(data: CreateCoursePayload) {
    return await createData(`/courses`, "/dashboard/courses", data);
}