import axios from "axios";
import { getAuthorizationHeader } from "./AxiosInstance";
import { API_URL } from "../tools/constants";

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
    const response = await axios.get(`${API_URL}/category`, {
        headers: { Authorization: Authorization },
        params: { genreId, videoGameId },
    });
    return response.data;
}

export { getCategory };