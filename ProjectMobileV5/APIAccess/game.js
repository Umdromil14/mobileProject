import axios from "axios";
import { APIURL, getAuthorizationHeader, axiosInstance } from "./AxiosInstance";

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

async function updateGame(publicationId, updateValues){
    try{
        const Authorization = await getAuthorizationHeader();
        const response = await axiosInstance.patch(`${APIURL}/game/user/${publicationId}`, updateValues, 
            {headers: { Authorization: Authorization },
        });
        return response.data;
    }
    catch(error){
        console.log(error.request);
    }
    
}

export { getGames, updateGame };