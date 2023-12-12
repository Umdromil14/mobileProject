import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";
import { getPublications } from "./publication";


/**
 * Get platforms
 *
 * @param {string=} code the code of the platform; if not specified, all platforms are returned
 *
 * @returns {Promise<Array>} Array of platforms
 *
 * @throws {Error} if the request failed
 */
async function getPlatforms(code) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/platform`, {
        headers: { Authorization: Authorization },
        params: { code },
    });
    return response.data;
}

async function getPlatformsCodeByVideoGame(videoGameId){
    const publications = await getPublications(undefined, videoGameId);
    let platforms = [];
    for (const publication of publications) {
        const platform = publication.platform_code;
        const response = await getPlatforms(platform);
        platforms.push(response[0]);
    }
    return platforms
}

export { getPlatforms, getPlatformsCodeByVideoGame };