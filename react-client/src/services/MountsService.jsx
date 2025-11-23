import axios from 'axios';

const MOUNTS_API_BASE_URL = 'http://localhost:3000/api/mounts';

class MountsService {

    getAllMount(){
        return axios.get(MOUNTS_API_BASE_URL);
    }

    getMountById(id){
        return axios.get(`${MOUNTS_API_BASE_URL}/${id}`);
    }
}

export default new MountsService();