import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";

/**
 * Get categories
 *
 * @param {number=} genreId the id of the genre
 * @param {number=} videoGameId the id of the video game
 *
 * @returns {Array} Array of categories
 *
 * @throws {Error} if the request failed
 */
async function getCategory(genreId, videoGameId) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/category`, {
        headers: { Authorization: Authorization },
        params: { genreId, videoGameId },
    });
    return response.data;
}

export { getCategory };