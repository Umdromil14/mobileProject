import axios from "axios";
import { API_URL } from "../tools/constants";

/**
 * Get publications
 *
 * @param {Object} options
 * @param {number=} options.publicationId the id of the publication
 * @param {number=} options.videoGameId the id of the video game
 * @param {string=} options.videoGameName the name of the video game
 * @param {string=} options.platformCode the platform code of the video game
 * @param {boolean=} options.getOwnGames if `true`, only the games of the user are returned; default `false`
 * @param {number[]=} options.genresIds the genres of the video game
 * @param {boolean=} options.getLastGames if `true`, only the last games are returned; default `false`
 * @param {boolean=} options.getVideoGamesInfo if `true`, the video game info is returned; default `false`
 * @param {boolean=} options.alphabetical if `true`, the publications are sorted alphabetically; default `false`
 * @param {boolean=} options.sortByDate if `true`, the publications are sorted by date (newest first); default `false`
 * @param {number=} options.page the page of the results
 * @param {number=} options.limit the number of results per page
 *
 * @returns {Promise<Object[]>} A promise containing an array of publications
 *
 * @throws {Error} if the request failed
 */
async function getPublications(options,token) {
    options.genresIds =
        options.genresIds?.map((genreId) => genreId.toString()).join(",") ||
        undefined;

    return (await axios.get(`${API_URL}/publication`, {
        headers: { Authorization: token },
        params: options,
    })).data;
}

// TODO promise return

export { getPublications };