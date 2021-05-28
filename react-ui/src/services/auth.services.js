import http from "../auth.http-common";



class ADAuthService {
    authenticate(creds) {
        return http.post("/authenticate", creds)
    };

}

export default new ADAuthService();
