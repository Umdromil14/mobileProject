import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";

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
    const response = await axios.get(`${APIURL}/genre`, {
        headers: { Authorization: Authorization },
        params: { id, alphabetical },
    });
    return response.data;
}

export { getGenres };