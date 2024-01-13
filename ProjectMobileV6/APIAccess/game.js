import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";

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
    const response = await axios.get(`${APIURL}/game/user`, {
        headers: { Authorization: Authorization },
        params: { publicationId },
    });
    return response.data;
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
async function getGamesByVideoGame(videoGameId) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/game/user`, {
        headers: { Authorization: Authorization },
        params: { videoGameId: videoGameId },
    });
    return response.data;
}

async function updateGame(publicationId, updateValues){
    try{
        const Authorization = await getAuthorizationHeader();
        const response = await axios.patch(`${APIURL}/game/user/${publicationId}`, updateValues, 
            {headers: { Authorization: Authorization },
        });
        return response.data;
    }
    catch(error){
        console.log(error);
    }
    
}

export { getGames, getGamesByVideoGame, updateGame };
