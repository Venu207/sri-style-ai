import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ShieldCheck, Phone } from "lucide-react";
import Footer from "@/components/Footer";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!state?.phone) {
      navigate("/checkout");
      return;
    }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(code);
    toast.info(`Demo OTP: ${code}`, { duration: 15000, description: `Sent to ${state.phone}` });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResend = () => {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(code);
    setTimeLeft(60);
    toast.info(`Demo OTP: ${code}`, { duration: 15000, description: `Resent to ${state?.phone}` });
  };

  const handleVerify = () => {
    if (otp.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      if (otp === generatedOtp) {
        toast.success("OTP Verified Successfully!");
        navigate("/order-confirmed", { state: state?.orderData });
      } else {
        toast.error("Invalid OTP. Please try again.");
        setOtp("");
        setIsVerifying(false);
      }
    }, 1000);
  };

  const maskedPhone = state?.phone
    ? state.phone.replace(/(\d{2})\d+(\d{2})/, "$1******$2")
    : "";

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-background">
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-primary/10">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full gradient-gold mx-auto flex items-center justify-center">
              <ShieldCheck size={32} className="text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-display">Verify Your Order</CardTitle>
            <CardDescription className="text-sm">
              We've sent a 4-digit OTP to{" "}
              <span className="font-semibold text-foreground flex items-center justify-center gap-1 mt-1">
                <Phone size={14} /> {maskedPhone}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying || otp.length !== 4}
              className="w-full btn-gold rounded-sm"
            >
              {isVerifying ? "Verifying..." : "Verify & Confirm Order"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {timeLeft > 0 ? (
                <span>Resend OTP in <strong className="text-foreground">{timeLeft}s</strong></span>
              ) : (
                <button onClick={handleResend} className="text-primary font-semibold hover:underline">
                  Resend OTP
                </button>
              )}
            </div>

            <p className="text-xs text-center text-muted-foreground">
              This is a demo. The OTP is shown as a notification above.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default OTPVerification;
