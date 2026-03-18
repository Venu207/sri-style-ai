import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, totalPrice, placeOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all fields");
      return;
    }
    const order = placeOrder(form);
    const orderData = {
      items: order.items.map(i => ({ product: { id: i.name, name: i.name, price: i.price }, quantity: i.qty })),
      totalPrice: order.total,
      address: form,
    };
    navigate("/verify-otp", { state: { phone: form.phone, orderData } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground font-display text-lg">Your cart is empty</p>
        <Link to="/" className="btn-gold rounded-sm">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">Checkout</span>
        </div>

        <h1 className="text-3xl font-display font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="font-display text-lg font-semibold mb-4">Delivery Details</h2>
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "phone", label: "Mobile Number", type: "tel", placeholder: "+91 98765 43210" },
              { key: "address", label: "Address", type: "text", placeholder: "House/Flat, Street" },
              { key: "city", label: "City", type: "text", placeholder: "Chennai" },
              { key: "pincode", label: "Pincode", type: "text", placeholder: "600001" },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            ))}

            <div className="pt-4">
              <h3 className="font-display text-sm font-semibold mb-3">Payment Method</h3>
              <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary bg-primary/5">
                <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm font-medium">Cash on Delivery (COD)</span>
              </div>
            </div>

            <button type="submit" className="btn-gold w-full rounded-sm mt-6">
              Place Order · ₹{totalPrice.toLocaleString()}
            </button>
          </form>

          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center py-3 border-b border-border">
                  <div>
                    <p className="font-display text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-6 mt-4 border-t border-border">
              <span className="font-display font-semibold text-lg">Total</span>
              <span className="font-display font-bold text-xl text-primary">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
