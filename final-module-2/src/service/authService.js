// import { storage } from "../utils/storage";
// import { STORAGE_KEYS } from "../utils/constants";

// export const authService = {
//     login(accessToken, user) {
//         storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
//         storage.set(STORAGE_KEYS.USER, user);
//     },

//     logout() {
//         storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
//         storage.remove(STORAGE_KEYS.USER);
//     },

//     getToken() {
//         return storage.get(STORAGE_KEYS.ACCESS_TOKEN);
//     },

//     getUser() {
//         return storage.get(STORAGE_KEYS.USER);
//     },

//     isAuthenticated() {
//         return !!this.getToken();
//     },
// };
