import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Step = "phone" | "otp" | "success";

const LOGIN_KEY = "sri_designs_logged_in";

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(LOGIN_KEY);
    if (!isLoggedIn) {
      setOpen(true);
    }
  }, []);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      const fullPhone = `+91${phone}`;
      const { data, error } = await supabase.functions.invoke("twilio-send-otp", {
        body: { phone: fullPhone },
      });
      if (error) throw new Error(error.message || "Failed to send OTP");
      if (!data?.success) throw new Error(data?.error || "Failed to send OTP");
      toast.success("OTP sent to your mobile number!");
      setStep("otp");
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const fullPhone = `+91${phone}`;
      const { data, error } = await supabase.functions.invoke("twilio-verify-otp", {
        body: { phone: fullPhone, code: otp },
      });
      if (error) throw new Error(error.message || "Verification failed");
      if (!data?.success) throw new Error("Invalid OTP. Please try again.");
      toast.success("Login Successful!");
      setStep("success");
      localStorage.setItem(LOGIN_KEY, "true");
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || "Invalid OTP. Please try again.");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="bg-transparent border-none shadow-none p-0 max-w-md [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="gradient-dark rounded-2xl p-8 md:p-10 shadow-2xl border border-gold/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-br from-gold-light via-transparent to-gold-light" />

          <AnimatePresence mode="wait">
            {step === "phone" && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative space-y-6"
              >
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 rounded-full gradient-gold mx-auto flex items-center justify-center shadow-lg">
                    <Phone size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-cream">
                    Welcome to <span className="text-gradient-gold">Sri Designs</span>
                  </h3>
                  <p className="text-cream/60 text-sm font-body">
                    Sign in with your mobile number to explore our exclusive collection
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-cream/80 text-xs font-medium tracking-wider uppercase">
                      Mobile Number
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-cream bg-charcoal-light/50 border border-gold/20 rounded-md h-12 px-3 flex items-center text-base select-none">+91</span>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="98765 43210"
                        className="bg-charcoal-light/50 border-gold/20 text-cream placeholder:text-cream/30 focus-visible:ring-gold h-12 text-base"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="w-full btn-gold rounded-lg h-12 text-sm"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative space-y-6"
              >
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 rounded-full gradient-gold mx-auto flex items-center justify-center shadow-lg">
                    <ShieldCheck size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-cream">Verify OTP</h3>
                  <p className="text-cream/60 text-sm font-body">
                    Enter the 6-digit code sent to{" "}
                    <span className="text-gold-light font-semibold">{phone}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="bg-charcoal-light/50 border-gold/20 text-cream w-11 h-12"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length !== 6}
                    className="w-full btn-gold rounded-lg h-12 text-sm"
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </Button>
                  <button
                    onClick={() => { setStep("phone"); setOtp(""); }}
                    className="w-full text-cream/40 text-xs hover:text-cream/60 transition-colors"
                  >
                    Change number
                  </button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative space-y-6 text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-gold mx-auto flex items-center justify-center shadow-lg">
                  <Sparkles size={28} className="text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-cream">
                    Login Successful!
                  </h3>
                  <p className="text-cream/60 text-sm font-body">
                    Welcome to <span className="text-gradient-gold">Sri Designs</span>. Enjoy exploring our exclusive collection.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
