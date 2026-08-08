import { CreateSubjectPayload, Subject } from "@/types/subjects/subjects.type";
import { createData, deleteData, putData, readData } from "../apiService/crud";

export async function getAllSubjects() {
    return await readData("/subjects", [""])
}

export async function createSubject(data: CreateSubjectPayload) {
    return await createData("/subjects", "/dashboard/subjects", data)
}

export async function deleteSubject(id: number) {
    return await deleteData(`/subjects/${id}`, "/dashboard/subjects")
}


export async function updateSubject(id: number, data: CreateSubjectPayload) {
    return await putData(`/subjects/${id}`, "/dashboard/subjects", data)
}