import http from "../http-common";

class EmployeeDataService {
    getAll() {
        return http.get("/CMS/GetCMSPage");
    }

    get(id) {

        return http.get("/Employee/GetEmployeeById/${id}");
    }

    create(data) {
        return http.post("/employees", data);
    }

    login(data) {
        return http.post("/ApplicationUser/Login", data);
    }

    update(id, data) {
        return http.put(`/Employee/UpdateEmployee`, data);
    }

    delete(id) {
        return http.delete(`/employees/${id}`);
    }

    deleteAll() {
        return http.delete(`/employees`);
    }

    findByTitle(title) {
        return http.get(`/employees?title=${title}`);
    }
}

export default new EmployeeDataService();