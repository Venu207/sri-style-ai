import { Link } from "react-router-dom";
import { CheckCircle, Truck, Package } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const orders = [
  {
    id: "ORD-20260306-001",
    date: "March 6, 2026",
    status: "Confirmed",
    deliveryBoy: "Santhosh Kumar",
    items: [
      { name: "Royal Silk Saree", qty: 1, price: 8500 },
      { name: "Designer Blouse", qty: 1, price: 2200 },
    ],
    total: 10700,
    address: "12, Gandhi Nagar, Chennai - 600020",
  },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-display text-lg">No orders yet</p>
            <Link to="/" className="btn-gold rounded-sm inline-block mt-4">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6 max-w-2xl">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-muted/50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Order #{order.id}</p>
                    <p className="text-sm font-medium text-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                    <CheckCircle size={14} className="text-green-500" />
                    <span className="text-xs font-semibold text-green-600">{order.status}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-2">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.name} × {item.qty}</span>
                      <span className="font-medium">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 mt-3 flex justify-between font-display font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="px-6 py-4 bg-muted/30 border-t border-border flex flex-wrap items-center gap-3 text-sm">
                  <Truck size={16} className="text-primary" />
                  <span className="text-muted-foreground">Delivery by</span>
                  <span className="font-semibold text-foreground">{order.deliveryBoy}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
