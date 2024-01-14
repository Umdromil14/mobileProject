import axios from "axios";
import { API_URL } from "../tools/constants";

/**
 * Get games of the user
 *
 * @param {number=} publicationId the id of the publication; if not specified, all games are returned
 *
 * @returns {Promise<Array>} Array of games
 *
 * @throws {Error} if the request failed
 */
async function getGames(publicationId, token) {
    return (
        await axios.get(`${API_URL}/game/user`, {
            headers: { Authorization: token },
            params: { publicationId },
        })
    ).data;
}

/**
 * Get games of the user for a video game
 *
 * @param {number=} videoGameId the id of the publication; if not specified, all games are returned
 *
 * @returns {Promise<Array>} Array of games
 *
 * @throws {Error} if the request failed
 */
async function getGamesByVideoGame(videoGameId, token) {
    return (
        await axios.get(`${API_URL}/game/user`, {
            headers: { Authorization: token },
            params: { videoGameId: videoGameId },
        })
    ).data;
}

async function updateGame(publicationId, updateValues, token) {
    await axios.patch(`${API_URL}/game/user/${publicationId}`, updateValues, {
        headers: { Authorization: token },
    });
}

async function createGame(valuesToAdd, token) {
    return (
        await axios.post(`${API_URL}/game/user`, valuesToAdd, {
            headers: { Authorization: token },
        })
    ).status;
}

export { getGames, getGamesByVideoGame, updateGame, createGame };
