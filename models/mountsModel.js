"user strict";

const connection_string = process.env.FFXIV_API;

const getAllMounts = async () => {

    try {
        const response = await fetch(`${connection_string}/mounts`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching mounts: ${error.message}`);
    }
};

const getMountById = async (id) => {
    try {
        const response = await fetch(`${connection_string}/mounts/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching mount: ${error.message}`);
    }
};

module.exports = { getAllMounts, getMountById };