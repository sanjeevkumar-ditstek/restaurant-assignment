const ReasonPhrases  = {
    502 : "Bad Gateway",
    400 : "Bad Request",
    201 : "Created",
    403 : "Forbidden",
    504 : "Gateway Timeout",
    500 : "Internal Server Error",
    405 : "Method Not Allowed",
    301 : "Moved Permanently",
    302 : "Moved Temporarily",
    204 : "No Content",
    404 : "Not Found",
    200 : "OK",
    401 : "Unauthorized",
    415 : "Unsupported Media Type",
}

export const getStatusMessage = function (statusCode: any) {
    return ReasonPhrases[statusCode]
}
const StatusCodes = {
    BAD_GATEWAY: 502,
    BAD_REQUEST : 400,
    CREATED : 201,
    FORBIDDEN : 403,
    GATEWAY_TIMEOUT : 504,
    INTERNAL_SERVER_ERROR : 500,
    METHOD_NOT_ALLOWED : 405,
    MOVED_PERMANENTLY : 301,
    MOVED_TEMPORARILY : 302,
    NO_CONTENT : 204,
    NOT_FOUND : 404,
    OK : 200,
    UNAUTHORIZED : 401,
    UNSUPPORTED_MEDIA_TYPE : 415,
    getStatusMessage
}
export default StatusCodes




