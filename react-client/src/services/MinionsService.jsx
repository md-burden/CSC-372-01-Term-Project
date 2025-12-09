import axios from "axios";

const MINIONS_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL + "/api/minions" || "http://localhost:3000/api/minions";

class MinionsService {
    getAllMinion() {
        return axios.get(MINIONS_API_BASE_URL);
    }

    getMinionById(id) {
        return axios.get(`${MINIONS_API_BASE_URL}/${id}`);
    }
}
export default new MinionsService();