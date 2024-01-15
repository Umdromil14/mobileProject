import axios from "axios";
import { API_URL } from "../tools/constants";

/**
 * Get genres
 *
 * @param {number=} id the id of the genre to get; if not specified, all genres are returned
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<Object[]>} A promise containing an array of genres
 */
async function getGenres(id, alphabetical) {
    return (
        await axios.get(`${API_URL}/genre`, {
            params: { id, alphabetical },
        })
    ).data;
}

export { getGenres };
