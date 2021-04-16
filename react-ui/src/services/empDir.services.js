import http from "../http-common";

class EmployeeDirectoryService {
    getAll() {
        return http.get("/empDir")
    }

    get(id) {
        return http.get(`/empDir/${id}`);
    }

    create(data) {
        return http.post("/empDir", data);
    }

    update(id, data) {
        return http.put(`/empDir/${id}`, data);
    }

    delete(id) {
        return http.delete(`/empDir/${id}`);
    }

    deleteAll() {
        return http.delete(`/empDir`);
    }

    findByTitle(title) {
        return http.get(`/empDir?title=${title}`);
    }

}

export default new EmployeeDirectoryService();
