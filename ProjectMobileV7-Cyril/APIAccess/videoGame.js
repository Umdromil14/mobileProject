import axios from "axios";
import { API_URL, getAuthorizationHeader } from "./AxiosInstance";

/**
 * Get all video games or video games by name or id
 *
 * @param {number=} id the id of the video game
 * @param {string=} name the name of the video game
 *
 * @returns {Promise<Array>} Array of video games
 *
 * @throws {Error} if the request failed
 */
async function getVideoGames(id, name) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${API_URL}/videoGame`, {
        headers: { Authorization: Authorization },
        params: { id, name },
    });
    return response.data;
}

export { getVideoGames };