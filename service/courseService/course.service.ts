import { CreateCoursePayload } from "@/types/course/course.type";
import { createData, deleteData, putData, readPublicData } from "../apiService/crud";


export async function getCourses() {
    return await readPublicData("/courses", ["Courses"]);
}

export async function getCourse(id: number) {
    return await readPublicData(`/courses/${id}`, ["Courses"]);
}

export async function updateCourse(id: number, data: any) {
    return await putData(`/courses/${id}`, "", data);
}

export async function deleteCourse(id: number) {
    return await deleteData(`/courses/${id}`, "");
}

export async function createCourse(data: CreateCoursePayload) {
    return await createData(`/courses`, "", data);
}