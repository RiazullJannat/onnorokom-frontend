import { readData } from "../apiService/crud"

export const dashboardReports = async () => {
    return readData("/reports/dashboard",[""])
}