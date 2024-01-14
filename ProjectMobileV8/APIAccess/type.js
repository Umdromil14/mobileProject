import axios from "axios";
import { getAuthorizationHeader } from "./AxiosInstance";
import { API_URL } from "../tools/constants";

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
    const response = await axios.get(`${API_URL}/type`, {
        headers: { Authorization: Authorization },
        params: { id },
    });
    return response.data;
}

export { getTypes };