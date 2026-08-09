import { CreateAssignmentPayload } from "@/types/assignments/assignments.type";
import { createData, deleteData, putData, readData } from "../apiService/crud";
import { Query } from "@/types/shared/shared.types";

export const createAssignment = async (data: CreateAssignmentPayload) => {
    return await createData(`/assignments`, "/dashboard/assignments", data);
}   

export const getAssignments = async (query?:Query) => {
    return await readData(`/assignments`, ["Assignments"], query);
}   

export const getAssignmentById = async (id: number) => {
    return await readData(`/assignments/${id}`, ["Assignments"]);
}   

export const updateAssignment = async (id: number, data: CreateAssignmentPayload) => {
    return await putData(`/assignments/${id}`, "/dashboard/assignments", data);
}   

export const deleteAssignment = async (id: number) => {
    return await deleteData(`/assignments/${id}`, "/dashboard/assignments");
}   


export const getAssignmentsByCourse = async (id: number) => {
    return await readData(`/courses/${id}/assignments`, ["Assignments"]);
}   


// ---------------------------------submishion --------------------------------

export const submitAssignment = async (assignmentId: number | string,data: {Content:string}) => {
    return await createData(`/assignments/${assignmentId}/submissions`, "/dashboard/assignments", data);    
}

export const updateAssignmentSubmission = async (assignmentId: number | string,submissionId: number | string,data: {Content:string}) => {
    return await putData(`/assignments/${assignmentId}/submissions/${submissionId}`, "/dashboard/assignments", data);    
}

export const getAssignmentSubmission = async (assignmentId: number | string) => {
    return await readData(`/assignments/${assignmentId}/submissions`, ["Assignments"]);
}
