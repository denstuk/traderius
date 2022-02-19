export const tryNotEmptyAndNotUndefined = (value: string): boolean => {
    if (!value || value === "") return false;
    return true;
}

export const tryLength = (value: string, len: number): boolean => {
    return value.length >= len;
}

export const tryEmail = (value: string): boolean => {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(value).toLowerCase());
}
