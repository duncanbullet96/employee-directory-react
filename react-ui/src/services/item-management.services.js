import http from "../http-common";



class ItemManagementService {


    create(data) {
        return http.post("/admin/item_management/new", data);
    }
    delete(id) {
        return http.delete(`/admin/item_management/${id}` );
    }



}

export default new ItemManagementService();
