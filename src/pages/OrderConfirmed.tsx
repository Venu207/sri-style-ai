import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const OrderConfirmed = () => {
  const location = useLocation();
  const state = location.state as any;

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full gradient-gold mx-auto mb-6 flex items-center justify-center">
            <CheckCircle size={36} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. Your clothes will be delivered by <strong className="text-foreground">Santhosh Kumar</strong>.
          </p>

          {state?.items && (
            <div className="bg-muted/50 rounded-xl p-6 text-left mb-8">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Package size={18} className="text-primary" /> Order Details
              </h3>
              <div className="space-y-2">
                {state.items.map((item: any) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between font-display font-bold">
                <span>Total</span>
                <span className="text-primary">₹{state.totalPrice?.toLocaleString()}</span>
              </div>
              {state.address && (
                <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Delivery Address:</p>
                  <p>{state.address.name}, {state.address.address}, {state.address.city} - {state.address.pincode}</p>
                  <p>Phone: {state.address.phone}</p>
                </div>
              )}
            </div>
          )}

          <Link to="/" className="btn-gold rounded-sm inline-block">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmed;
