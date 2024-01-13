import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";
import { getCategory } from "./category";

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
 * @param {number=} options.page the page of the results
 * @param {number=} options.limit the number of results per page
 *
 * @returns {Promise<Object[]>} A promise containing an array of publications
 *
 * @throws {Error} if the request failed
 */
async function getPublications(options) {
    options.genresIds =
        options.genresIds?.map((genreId) => genreId.toString()).join(",") ||
        undefined;

    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/publication`, {
        headers: { Authorization: Authorization },
        params: options,
        data: { genresIds: options.genresIds },
    });

    return response.data;
}

/**
 * @typedef {Object} VideoGame
 * @property {number} id the id of the video game
 * @property {string} name the name of the video game
 * @property {string} description the description of the video game
 * @property {string[]} platforms the platforms of the video game
 * @property {number[]} genresIds the genres of the video game
 */

// TODO promise return
/**
 * Get all video games with their platforms and genres
 *
 * @param {string=} platformCode the platform code of the video game
 * @param {number[]=} genresIds the genres of the video game
 * @param {string=} videoGameName the name of the video game
 * @param {boolean=} getOwnGames if `true`, only the games of the user are returned; default `false`
 * @param {number=} page the page of the results
 * @param {number=} limit the number of results per page
 *
 * @returns {Promise<VideoGame[]>} A promise containing an array of video games (keys: `id`, `name`, `description`, `platforms`, `genresIds`)
 *
 * @throws {Error} if the request failed
 */
async function getVideoGamesWithPlatformsAndGenres(
    platformCode,
    videoGameName,
    genresIds,
    getOwnGames = false,
    page,
    limit
) {
    const videoGames = [];
    const categories = await getCategory();
    const publications = await getPublications({
        platformCode,
        videoGameName,
        genresIds,
        getVideoGamesInfo: true,
        getOwnGames,
        alphabetical: true,
        page,
        limit,
    });
    publications.forEach((publication) => {
        const videoGame = videoGames.find(
            (videoGame) => videoGame.id === publication.video_game_id
        );
        if (videoGame) {
            videoGame.platforms.push(publication.platform_code);
        } else {
            videoGames.push({
                id: publication.video_game_id,
                name: publication.name,
                description: publication.description,
                platforms: [publication.platform_code],
                genresIds: categories
                    .filter(
                        (category) =>
                            category.video_game_id === publication.video_game_id
                    )
                    .map((category) => category.genre_id),
            });
        }
    });

    return videoGames;
}

export { getPublications, getVideoGamesWithPlatformsAndGenres };