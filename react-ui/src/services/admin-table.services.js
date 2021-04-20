import http from "../http-common";



class AdminTableService {
    getAll() {
        return http.get("/admin")
    }

    get(id) {
        return http.get(`/empDir/${id}`);
    }

    create(data) {
        return http.post("/admin/", data);
    }

    createNewLocation(data) {
        return http.post("/admin/", data);
    }

    update(id, data) {
        return http.put(`/empDir/${id}`, data);
    }

    delete(id) {
        return http.delete(`/admin/${id}`);
    }

    deleteAll() {
        return http.delete(`/empDir`);
    }

    findByTitle(title) {
        return http.get(`/empDir?title=${title}`);
    }

}

export default new AdminTableService();
