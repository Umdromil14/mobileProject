import axios from "axios";
import { APIURL, getAuthorizationHeader } from "./AxiosInstance";

/**
 * Get types
 *
 * @param {number=} id the id of the type to get; if not specified, all types are returned
 *
 * @returns {Array} Array of types
 *
 * @throws {Error} if the request failed
 */
async function getTypes(id) {
    const Authorization = await getAuthorizationHeader();
    const response = await axios.get(`${APIURL}/type`, {
        headers: { Authorization: Authorization },
        params: { id },
    });
    return response.data;
}

export { getTypes };