import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";

/**
 * Get platforms
 *
 * @param {string=} code the code of the platform; if not specified, all platforms are returned
 *
 * @returns {Array} Array of platforms
 *
 * @throws {Error} if the request failed
 */
async function getPlatforms(code) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/platform`, {
        headers: { Authorization: Authorization },
        params: { code },
    });
    return response.data;
}

export { getPlatforms };