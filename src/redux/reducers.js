import {
    combineReducers
} from "redux";
import cart from "./slices/cartSlice";
import products from "./slices/productsSlice";
const reducers = combineReducers({
    cart,
    products,
});
export default reducers;