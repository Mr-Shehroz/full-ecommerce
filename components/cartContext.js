import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const ls = typeof window !== 'undefined' ? window.localStorage : null;
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (cart?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCart(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    function addProduct(productId) {
        setCart(prev => [...prev, productId]);
    } 

    return (
        <CartContext.Provider value={{ cart, setCart, addProduct }}>
            {children}
        </CartContext.Provider>
    );
}
