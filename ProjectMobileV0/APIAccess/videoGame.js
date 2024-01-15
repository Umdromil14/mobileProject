import axios from "axios";
import { API_URL } from "../tools/constants";

/**
 * Get all video games or video games by name or id
 *
 * @param {number=} id the id of the video game
 * @param {string=} name the name of the video game
 *
 * @throws {Error} if the request failed
 * @returns {Promise<Object[]>} A promise containing an array of video games
 *
 */
async function getVideoGames(id, name, token) {
    return (
        await axios.get(`${API_URL}/videoGame`, {
            headers: { Authorization: token },
            params: { id, name },
        })
    ).data;
}

export { getVideoGames };
