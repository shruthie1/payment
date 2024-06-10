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