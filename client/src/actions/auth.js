import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
}

export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key);
    }
}

export const getCookie = (key) => {
    if (process.browser) {
        return cookie.get(key);
    } 
}

export const setToLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const removeFromLocalStorage = (key) => {
    if (process.browse) {
        localStorage.removeItem(key);
    }
}

export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setToLocalStorage('user', data.user);
    next();
}

export const isAuth = () => {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user);
        }
    }
    return false;
}