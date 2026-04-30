import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  coupon: null,
  discount: 0,
};

const COUPONS = {
  'NEW50': { discount: 20, description: '20% off for new customers', minOrder: 299 }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );
      
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += action.payload.quantity;
        const newTotal = calculateTotal(newItems);
        const newDiscount = calculateDiscount(newTotal, state.coupon);
        return { ...state, items: newItems, total: newTotal, discount: newDiscount };
      }
      
      const newItems = [...state.items, action.payload];
      const newTotal = calculateTotal(newItems);
      const newDiscount = calculateDiscount(newTotal, state.coupon);
      return { ...state, items: newItems, total: newTotal, discount: newDiscount };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      );
      const newTotal = calculateTotal(newItems);
      const newDiscount = calculateDiscount(newTotal, state.coupon);
      return { ...state, items: newItems, total: newTotal, discount: newDiscount };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = calculateTotal(newItems);
      const newDiscount = calculateDiscount(newTotal, state.coupon);
      return { ...state, items: newItems, total: newTotal, discount: newDiscount };
    }
    case 'APPLY_COUPON': {
      const couponCode = action.payload.toUpperCase().trim();
      const coupon = COUPONS[couponCode];
      if (coupon && state.total >= coupon.minOrder) {
        const newDiscount = calculateDiscount(state.total, coupon);
        return { ...state, coupon: coupon, discount: newDiscount };
      }
      return state;
    }
    case 'REMOVE_COUPON': {
      return { ...state, coupon: null, discount: 0 };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateDiscount(total, coupon) {
  if (!coupon) return 0;
  return Math.round(total * (coupon.discount / 100));
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const saved = localStorage.getItem('nectarnest-cart');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('nectarnest-cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}