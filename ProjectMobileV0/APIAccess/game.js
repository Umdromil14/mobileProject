import axios from "axios";
import { API_URL } from "../tools/constants";

/**
 * Get games of the user
 *
 * @param {number=} publicationId the id of the publication; if not specified, all games are returned
 * @param {string} token the token of the user
 *
 * @returns {Promise<Object[]>} A promise containing an array of games
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
 * @param {number} videoGameId the video game id use to select the user's game
 * @param {string} token the token of the user
 * @throws {Error} if the request failed
 *
 * @returns {Promise<Object[]>} A promise containing an array of games
 *
 */
async function getGamesByVideoGame(videoGameId, token) {
    return (
        await axios.get(`${API_URL}/game/user`, {
            headers: { Authorization: token },
            params: { videoGameId: videoGameId },
        })
    ).data;
}


/**
 * This function create the different parts displayed on screen
 * 
 * @param {object} newGame The object containing the values to add
 * @param {number} newGame.publication_id The publication id of the review
 * @param {boolean} newGame.is_owned The boolean if the publication is owned by the user
 * @param {string=} newGame.review_comment The user's comment on the publication
 * @param {number=} newGame.review_rating The user's rating on the publication
 * @param {Date=} newGame.review_date The date when the review was created
 * @param {string} token user's token
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<number>} A promise containing the status code of the request
 */
async function createGame(newGame, token) {
    return (
        await axios.post(`${API_URL}/game/user`, newGame, {
            headers: { Authorization: token },
        })
    ).status;
}
/**
 * This function create the different parts displayed on screen
 * 
 * @param {number} publicationId the id of the publication; if not specified, all games are returned
 * @param {object} updateGame the object containing the values to update
 * @param {boolean=} updateGame.is_owned the value to know if the user has the game (true) or no (false).
 * @param {string=} updateGame.review_comment the comment that the user gave to the game
 * @param {number=} updateGame.review_rating the rating the user gave to the game
 * @param {string} token user's token
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<number>} A promise containing the status code of the request
 */
async function updateGame(publicationId, updateGame, token) {
     return (await axios.patch(`${API_URL}/game/user/${publicationId}`, updateGame, {
        headers: { Authorization: token },
    })).status;
}

export { getGames, getGamesByVideoGame, updateGame, createGame };