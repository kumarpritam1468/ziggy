import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [token, setToken] = useState('');
    const [cartItems, setCartItems] = useState({});
    // const [ordersData, setOrdersData] = useState({});
    const [foodList, setFoodList] = useState([]);

    const fetchFoodList = async () => {
        try {
            const response = await axios.get('/api/food/all');

            setFoodList(response.data);
            // console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const fetchCart = async (token) => {
        try {
            const respopnse = await axios.get('/api/cart/all', { headers: { token } });

            setCartItems(respopnse.data);
            console.log(respopnse.data);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            try {
                // console.log({token});
                await axios.post(`/api/cart/add/${itemId}`, null, { headers: { token } });
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        try {
            if (token) {
                await axios.post(`/api/cart/remove/${itemId}`, null, { headers: { token } });
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    let itemInfo = foodList.find((product) => product._id === item);
                    totalAmount += itemInfo.price * cartItems[item];
                }
            } catch (error) {
                toast.error(error.message);
            }

        }
        return totalAmount;
    }


    const placeOrder = (deliveryData) => {

        console.log(deliveryData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await fetchCart(localStorage.getItem('token'));
            }
        };
        loadData();
    }, []);

    const contextValue = {
        foodList,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;