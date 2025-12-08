import axios from 'axios';

const MINIONS_API_BASE_URL = 'http://localhost:3000/api/ownedMinions';

class MinionsService {

    getOwnedMinionsByGoogleId(googleId){
        return axios.get(`${MINIONS_API_BASE_URL}/${googleId}`);
    }

    addToOwnedMinions(googleId, minionData){
        const body = { minion_id: minionData };
        return axios.post(`${MINIONS_API_BASE_URL}/${googleId}`, body);
    }

    removeFromOwnedMinions(googleId, minionId){
        return axios.delete(`${MINIONS_API_BASE_URL}/${googleId}/${minionId}`);
    }

    checkOwnedMinion(googleId, minionId){
        return axios.get(`${MINIONS_API_BASE_URL}/check/${googleId}/${minionId}`);
    }
}

export default new MinionsService();