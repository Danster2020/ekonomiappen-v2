/**
 * Logs the error to console.
 * @param error - The error.
 * @param response - The response.
 * @param {string} error_msg - The internal message to be displayed in console logs.
 */
export const handleError = (error, response, error_msg = "") => {
    console.error("Error" + error_msg + ":", error);
    return response.status(500).json({ message: "Internal server error!" });
};