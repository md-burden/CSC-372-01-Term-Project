import axios from 'axios';

const MOUNTS_API_BASE_URL = 'http://localhost:3000/api/ownedMounts';

class MountsService {

    getOwnedMountsByGoogleId(googleId){
        return axios.get(`${MOUNTS_API_BASE_URL}/${googleId}`);
    }

    addToOwnedMounts(googleId, mountData){
        const body = { mount_id: mountData };
        return axios.post(`${MOUNTS_API_BASE_URL}/${googleId}`, body);
    }

    removeFromOwnedMounts(googleId, mountId){
        return axios.delete(`${MOUNTS_API_BASE_URL}/${googleId}/${mountId}`);
    }

    checkOwnedMount(googleId, mountId){
        return axios.get(`${MOUNTS_API_BASE_URL}/check/${googleId}/${mountId}`);
    }
}

export default new MountsService();