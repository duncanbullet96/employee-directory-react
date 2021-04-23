import http from "../auth.http-common";



class ADAuthService {
    authenticate(creds) {
        return http.post("/login", creds)
    }

}

export default new ADAuthService();
