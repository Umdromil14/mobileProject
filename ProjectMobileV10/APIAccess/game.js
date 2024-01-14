import axios from "axios";
import { getAuthorizationHeader } from "./AxiosInstance";
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
async function getGames(publicationId) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${API_URL}/game/user`, {
        headers: { Authorization: Authorization },
        params: { publicationId },
    });
    return response.data;
}

/**
 * Get games of the user for a video game
 *
 * @param {number=} videoGameId the video game id use to select the user's game
 *
 * @returns {Promise<Array>} Array of games
 *
 * @throws {Error} if the request failed
 */
async function getGamesByVideoGame(videoGameId) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${API_URL}/game/user`, {
        headers: { Authorization: Authorization },
        params: { videoGameId: videoGameId },
    });
    return response.data;
}

/**
 * This function create the different parts displayed on screen
 * 
 * @param {number} publicationId the id of the publication; if not specified, all games are returned
 * @param {object} updateValues the object containing the values to update
 * @param {boolean=} updateValues.is_owned the value to know if the user has the game (true) or no (false).
 * @param {string=} updateValues.review_comment the comment that the user gave to the game
 * @param {number=} updateValues.review_rating the rating the user gave to the game
 *
 * @returns {Number} The status code of the request
 */
async function updateGame(publicationId, updateValues) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.patch(`${API_URL}/game/user/${publicationId}`, updateValues,
        {
            headers: { Authorization: Authorization },
        });
    return response.status;
}

/**
 * This function create the different parts displayed on screen
 * 
 * @param {object} valuesToAdd The object containing the values to add
 * @param {number} valuesToAdd.publication_id The publication id of the review
 * @param {boolean} valuesToAdd.is_owned The boolean if the publication is owned by the user
 * @param {string=} valuesToAdd.review_comment The user's commen on the publication
 * @param {number=} valuesToAdd.review_rating The user's rating on the publication
 * @param {Date=} valuesToAdd.review_date The date when the review was created
 *
 * @returns {number} The status code of the request
 */
async function createGame(valuesToAdd) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.post(`${API_URL}/game/user`, valuesToAdd, { headers: { Authorization: Authorization } });
    return response.status;
}

export { getGames, getGamesByVideoGame, updateGame, createGame };