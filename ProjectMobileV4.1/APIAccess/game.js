import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";

/**
 * Get games of the user
 *
 * @param {number=} publicationId the id of the publication; if not specified, all games are returned
 *
 * @returns {Array} Array of games
 *
 * @throws {Error} if the request failed
 */
async function getGames(publicationId) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/game/user`, {
        headers: { Authorization: Authorization },
        params: { publicationId },
    });
    return response.data;
}

export { getGames };