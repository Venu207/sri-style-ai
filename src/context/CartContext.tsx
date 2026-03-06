import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  deliveryBoy: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  address: { name: string; phone: string; address: string; city: string; pincode: string };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (address: { name: string; phone: string; address: string; city: string; pincode: string }) => Order;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const loadOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem("sri-orders");
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem("sri-orders", JSON.stringify(orders));
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setItems(prev => prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const placeOrder = useCallback((address: { name: string; phone: string; address: string; city: string; pincode: string }): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
      status: "Confirmed",
      deliveryBoy: "Santhosh Kumar",
      items: items.map(i => ({ name: i.product.name, qty: i.quantity, price: i.product.price })),
      total: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      address,
    };
    const updated = [order, ...orders];
    setOrders(updated);
    saveOrders(updated);
    setItems([]);
    return order;
  }, [items, orders]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen, orders, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
