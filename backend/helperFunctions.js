/**
 * Logs the error to console.
 * @param error - The error.
 * @param response - The response.
 * @param {string} error_msg - The internal message to be displayed in console logs.
 */
export const handleError = (error, response, error_msg = "", user_msg = "Internal server error!", status_code = 500) => {
    console.error("Error" + error_msg + ":", error);
    return response.status(status_code).json({ message: user_msg });
};