const USER_INFO_KEY = "user_info";

export const storageService = {
    set(key, value) {
        localStorage.setItem(key, value);
    },
    get(key) {
        return localStorage.getItem(key);
    },
    remove(key) {
        localStorage.removeItem(key);
    },

    setUserInfo(user) {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
    },
    getUserInfo() {
        const user = localStorage.getItem(USER_INFO_KEY);
        try {
            return user ? JSON.parse(user) : null;
        } catch (e) {
            return null;
        }
    },
    removeUserInfo() {
        localStorage.removeItem(USER_INFO_KEY);
    },

    clear() {
        localStorage.clear();
    },
};
