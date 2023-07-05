import axios from "axios"

const UNIVERSITY_BASE_URL = "http://localhost:8080/university/"

class UniversityService{
    //define a function
    getUniversities(){
        return axios.get(UNIVERSITY_BASE_URL);
    }
}

export default new UniversityService()