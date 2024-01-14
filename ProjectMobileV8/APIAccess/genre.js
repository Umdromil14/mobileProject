import axios from "axios";
import { getAuthorizationHeader } from "./AxiosInstance";
import { API_URL } from "../tools/constants";

/**
 * Get genres
 *
 * @param {number=} id the id of the genre to get; if not specified, all genres are returned
 *
 * @returns {Array} Array of genres
 *
 * @throws {Error} if the request failed
 */
async function getGenres(id, alphabetical) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${API_URL}/genre`, {
        headers: { Authorization: Authorization },
        params: { id, alphabetical },
    });
    return response.data;
}

export { getGenres };