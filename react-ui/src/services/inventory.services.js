import http from "../http-common";

class InventoryService {
    getAll() {
        return http.get("/items/all")
    }

    get(id) {
        return http.get(`/empDir/${id}`);
    }

    create(data) {
        return http.post("/items/create", data);
    }

    update(id, data) {
        return http.put(`/empDir/${id}`, data);
    }

    delete(id) {
        return http.delete(`/${id}`);
    }

    deleteAll() {
        return http.delete(`/empDir`);
    }

    findByTitle(title) {
        return http.get(`/empDir?title=${title}`);
    }

}

export default new InventoryService();
