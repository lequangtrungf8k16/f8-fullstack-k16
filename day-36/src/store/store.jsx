import { combineReducers, legacy_createStore as createStore } from "redux";
import { cartReducer } from "../reducer/cartReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
});
export const store = createStore(rootReducer);
