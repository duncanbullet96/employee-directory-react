import http from "../http-common";



class SearchService {


    search(data) {
        return http.post(`empdir/search/${data}`);
    }



}

export default new SearchService();
