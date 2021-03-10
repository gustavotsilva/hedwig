export const getHeaders = () => {

    const allowOrigins = (process.platform === "darwin") ? "*" : "https://hedwig.app";

    return {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": allowOrigins
    }

}