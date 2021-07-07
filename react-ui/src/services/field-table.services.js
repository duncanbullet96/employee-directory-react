import http from "../http-common";



class FieldTableService {
    getallFields() {
        return http.get("/admin/fields/all")
    }

    getFieldByName(field){
        return http.get(`/admin/fields/find/${field}`);
    }

    getFieldDatabyName(field) {
        return http.get(`/admin/fields/${field}`);
    }

    delete(field,id) {
        return http.delete(`/admin/fields/${field}/${id}`);
    }


    create(field,data){
        return http.post(`/admin/fields/${field}/new`, data )

    }


}

export default new FieldTableService();
