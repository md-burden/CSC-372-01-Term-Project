"user strict";

const connection_string = process.env.FFXIV_API;

const getAllMinions = async () => {
    try {
        const response = await fetch(`${connection_string}/minions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching minions: ${error.message}`);
    }   
};

const getMinionById = async (id) => {
    try {
        const response = await fetch(`${connection_string}/minions/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching minion: ${error.message}`);
    }
};

module.exports = { getAllMinions, getMinionById };