
export const formatErrorBadRq = (error) => {
    let message = {};
    for (let key in error) {
        message[error[key].field] = error[key].message;
    }
    return message;
}