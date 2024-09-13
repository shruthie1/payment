import axios from "axios";
export function parseError(
    err
) {
    let status = 'UNKNOWN';
    let message = 'An unknown error occurred';
    let error = 'UnknownError';

    const extractMessage = (data) => {
        if (Array.isArray(data)) {
            return data.join(', ');
        } else if (typeof data === 'string') {
            return data;
        } else if (typeof data === 'object' && data !== null) {
            let resultString = ''
            for (const key in data) {
                const value = data[key]
                if (Array.isArray(data[key]) && data[key].every(item => typeof item === 'string')) {
                    resultString = resultString + data[key].join(', ');
                } else {
                    const result = extractMessage(value);
                    if (result) {
                        resultString = resultString + result;
                    }
                }
            }
            return resultString
        }
        return JSON.stringify(data);
    };

    if (err.response) {
        const response = err.response;
        status = response.data?.status || response.status || err.status || 'UNKNOWN';
        message =
            response.data?.message ||
            response.data?.errors ||
            response.message ||
            response.statusText ||
            response.data ||
            err.message ||
            'An error occurred';
        error = response.data?.error || response.error || err.name || err.code || 'Error';
    } else if (err.request) {
        status = 'NO_RESPONSE';
        message = err.data?.message ||
            err.data?.errors ||
            err.message ||
            err.statusText ||
            err.data ||
            err.message ||
            'The request was made but no response was received';
        error = err.name || err.code || 'NoResponseError';
    } else if (err.message) {
        status = 'UNKNOWN';
        message = err.message;
        error = err.name || err.code || 'Error';
    }

    const msg = extractMessage(message);

    return { status, message: msg, error };
}

let botCount = 0;
function ppplbot(chatId, botToken) {
    let token = botToken;
    if (!token) {
        if (botCount % 2 === 1) {
            token = 'bot6624618034:AAHoM3GYaw3_uRadOWYzT7c2OEp6a7A61mY';
        }
        else {
            token = 'bot6607225097:AAG6DJg9Ll5XVxy24Nr449LTZgRb5bgshUA';
        }
        botCount++;
    }
    const targetChatId = chatId || '-1001801844217';
    const apiUrl = `https://api.telegram.org/${token}/sendMessage?chat_id=${targetChatId}`;
    return apiUrl;
}

export async function fetchWithTimeout(resource, options = {}, sendErr = true, maxRetries = 1) {
    options.timeout = options.timeout || 50000;
    options.method = options.method || 'GET';

    const fetchWithProtocol = async (url, version) => {
        const source = axios.CancelToken.source();
        const id = setTimeout(() => {
            source.cancel(`Request timed out after ${options.timeout}ms`);
        }, options.timeout);
        const defaultHeaders = {
            'Content-Type': 'application/json'
        };
        const headers = { ...defaultHeaders, ...options.headers };
        try {
            const response = await axios({
                headers,
                ...options,
                url,
                cancelToken: source.token,
                family: version
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            console.log(`Error at URL (IPv${version}): `, url);
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message, url);
                return undefined;
            }
            throw error; // Rethrow the error to handle retry logic outside
        }
    };

    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
        try {
            const responseIPv4 = await fetchWithProtocol(resource, 4);
            if (responseIPv4) return responseIPv4;
            const responseIPv6 = await fetchWithProtocol(resource, 6);
            if (responseIPv6) return responseIPv6;
        } catch (error) {
            console.log("Error at URL : ", resource)
            const errorDetails = parseError(error, undefined)
            if (errorDetails.status.toString() !== '429' && errorDetails.status.toString() !== 'NO_RESPONSE' && error.code !== 'ERR_NETWORK' && error.code !== "ECONNABORTED" && error.code !== "ETIMEDOUT" && !errorDetails.message.toLowerCase().includes('too many req') && !axios.isCancel(error)) {
                if (retryCount < maxRetries) {
                    console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
                } else {
                    console.log(`All ${maxRetries + 1} retries failed for ${resource}`);
                    if (sendErr) {
                        console.log("Sending error")
                        axios.get(`${ppplbot("-1001823103248")}&text=${encodeURIComponent(`Portal :All ${maxRetries + 1} retries failed for ${resource}\n${errorDetails.message}`)}`)
                    }
                    return undefined;
                }
            }
        }
    }
}