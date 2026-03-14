import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fingerprint, Smartphone, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OTPEnrollDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OTPEnrollDialog = ({ open, onOpenChange }: OTPEnrollDialogProps) => {
  const [method, setMethod] = useState<string>("");
  const [step, setStep] = useState<"select" | "setup" | "verify">("select");

  const reset = () => { setMethod(""); setStep("select"); onOpenChange(false); };

  const handleVerify = () => {
    toast({ title: "OTP enrolled", description: "Two-factor authentication has been enabled." });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); else onOpenChange(v); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Enroll 2FA</DialogTitle>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp-user">Username *</Label>
              <Input id="otp-user" placeholder="john.doe" className="font-mono" />
            </div>
            <Label>Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setMethod("totp"); setStep("setup"); }}
                className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors text-center"
              >
                <Smartphone className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">TOTP App</span>
                <span className="text-xs text-muted-foreground">Google/Microsoft Authenticator</span>
              </button>
              <button
                onClick={() => { setMethod("yubikey"); setStep("setup"); }}
                className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors text-center"
              >
                <Key className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">YubiKey</span>
                <span className="text-xs text-muted-foreground">Hardware security key</span>
              </button>
            </div>
          </div>
        )}

        {step === "setup" && method === "totp" && (
          <div className="space-y-4">
            <div className="flex justify-center py-4">
              <div className="h-40 w-40 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
                <div className="text-center">
                  <Fingerprint className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">QR Code</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Manual entry key</Label>
              <Input value="JBSWY3DPEHPK3PXP" readOnly className="font-mono text-xs text-center bg-muted/50" />
            </div>
            <Button className="w-full" onClick={() => setStep("verify")}>Next: Verify Code</Button>
          </div>
        )}

        {step === "setup" && method === "yubikey" && (
          <div className="space-y-4 py-4 text-center">
            <Key className="h-12 w-12 mx-auto text-primary" />
            <p className="text-sm">Insert your YubiKey and press the button</p>
            <p className="text-xs text-muted-foreground">Waiting for hardware key...</p>
            <Button className="w-full" onClick={() => setStep("verify")}>Simulate Key Press</Button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Enter the 6-digit code from your {method === "totp" ? "authenticator app" : "YubiKey"} to verify enrollment.</p>
            <div className="space-y-2">
              <Label htmlFor="otp-code">Verification Code</Label>
              <Input id="otp-code" placeholder="000000" className="font-mono text-center text-lg tracking-widest" maxLength={6} />
            </div>
          </div>
        )}

        <DialogFooter>
          {step !== "select" && <Button variant="outline" onClick={() => setStep(step === "verify" ? "setup" : "select")}>Back</Button>}
          {step === "select" && <Button variant="outline" onClick={reset}>Cancel</Button>}
          {step === "verify" && <Button onClick={handleVerify}>Verify & Enable</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OTPEnrollDialog;
