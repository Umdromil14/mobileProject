import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";
import { getVideoGames } from "./videoGame";
import { getCategory } from "./category";

/**
 * Get publications
 *
 * @param {number=} publicationId the id of the publication
 * @param {number=} videoGameId the id of the video game
 * @param {string=} videoGameName the name of the video game
 * @param {string=} platformCode the code of the platform
 * @param {boolean=} getOwnGames if `true`, only the games of the user are returned; default `false`
 * @param {boolean=} getVideoGameInfo if `true`, the video game info is returned accessible with the key `video_game`; default `false`
 *
 * @returns {Array} Array of games (keys: `id`, `platform_code`, `video_game_id`, `release_date`, `release_price`, `store_page_url`)
 *
 * @throws {Error} if the request failed
 */
async function getPublications(
    publicationId,
    videoGameId,
    videoGameName,
    platformCode,
    getOwnGames = false,
    getVideoGameInfo = false
) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/publication`, {
        headers: { Authorization: Authorization },
        params: {
            publicationId,
            videoGameId,
            videoGameName,
            platformCode,
            getOwnGames,
        },
    });
    const publications = response.data;

    if (getVideoGameInfo) {
        const videoGames = await getVideoGames();
        publications.forEach((publication) => {
            publication.video_game = videoGames.find(
                (videoGame) => videoGame.id === publication.video_game_id
            );
        });
    }

    return publications;
}

/**
 * @typedef {Object} VideoGame
 * @property {number} id the id of the video game
 * @property {string} name the name of the video game
 * @property {string} description the description of the video game
 * @property {string[]} platforms the platforms of the video game
 * @property {number[]} typesIds the types of the video game
 */

/**
 * Get all video games with their platforms and genres
 *
 * @param {boolean=} getOwnGames if `true`, only the games of the user are returned; default `false`
 *
 * @returns {VideoGame[]} Array of video games (keys: `id`, `name`, `description`, `platforms`, `typesIds`)
 *
 * @throws {Error} if the request failed
 */
async function getVideoGamesWithPlatformsAndGenres(getOwnGames = false) {
    const videoGames = [];
    const categories = await getCategory();
    const publications = await getPublications(
        undefined,
        undefined,
        undefined,
        undefined,
        getOwnGames,
        true
    );
    publications.forEach((publication) => {
        const videoGame = videoGames.find(
            (videoGame) => videoGame.id === publication.video_game_id
        );
        if (videoGame) {
            videoGame.platforms.push(publication.platform_code);
        } else {
            videoGames.push({
                id: publication.video_game.id,
                name: publication.video_game.name,
                description: publication.video_game.description,
                platforms: [publication.platform_code],
                typesIds: categories
                    .filter(
                        (category) =>
                            category.video_game_id === publication.video_game.id
                    )
                    .map((category) => category.type_id),
            });
        }
    });

    return videoGames;
}

export { getPublications, getVideoGamesWithPlatformsAndGenres };
