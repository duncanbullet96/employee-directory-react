import http from "../http-common";



class UserTableService {

    getAll() {
        return http.get("/admin/users/all");
    }

    create(data) {
        return http.post("/admin/users/new", data);
    }
    delete(id) {
        return http.delete(`/admin/users/${id}` );
    }

    getUserByUsername(data){
        return http.get(`/admin/users/${data}`);
    }

    getUser(id){
        return http.get(`/admin/users/${id}`);
    }

    getUserRole(id, data){
        return http.get(`/admin/users/${id}`, data);
    }



}

export default new UserTableService();
