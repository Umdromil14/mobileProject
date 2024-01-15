import axios from "axios";
import { API_URL } from "../tools/constants";

/**
 * Get platforms
 *
 * @param {string=} code the code of the platform; if not specified, all platforms are returned
 * @throws {Error} if the request failed
 *
 * @returns {Promise<Object[]>} A promise containing an array of platforms
 *
 */
async function getPlatforms(code) {
    const response = await axios.get(`${API_URL}/platform`, {
        params: { code },
    });
    return response.data;
}

export { getPlatforms };
