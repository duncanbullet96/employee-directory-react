import http from "../http-common";



class UserSessionService {


    create(username) {
        return http.post("/session/new", username);
    }

    get(id){
        return http.get(`/session/${id}`);
    }

    delete(id){
        return http.delete(`/session/${id}`);
    }



}

export default new UserSessionService();
