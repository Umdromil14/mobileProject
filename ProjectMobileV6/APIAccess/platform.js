import axios from "axios";
import { API_URL, API_BASE_URL, getAuthorizationHeader } from "./AxiosInstance";
import { getPublications } from "./publication";

/**
 * Get platforms
 *
 * @param {string=} code the code of the platform; if not specified, all platforms are returned
 *
 * @returns {Promise<Array>} Array of platforms
 *
 * @throws {Error} if the request failed
 */
async function getPlatforms(code) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${API_URL}/platform`, {
        headers: { Authorization: Authorization },
        params: { code },
    });
    return response.data;
}

async function getPlatformImage(code) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${API_BASE_URL}/platform/${code}.png`, {
        headers: { Authorization: Authorization },
        responseType: "blob",
    });
    return response.data;
}

export {
    getPlatforms,
    getPlatformImage,
};
