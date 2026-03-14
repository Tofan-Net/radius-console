import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface CertificateFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CertificateFormDialog = ({ open, onOpenChange }: CertificateFormDialogProps) => {
  const handleSubmit = () => {
    toast({ title: "Certificate issued", description: "The certificate has been generated and is ready for download." });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Issue Certificate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cert-type">Certificate Type *</Label>
            <Select>
              <SelectTrigger id="cert-type"><SelectValue placeholder="Select type..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client (EAP-TLS)</SelectItem>
                <SelectItem value="server">Server</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-cn">Common Name (CN) *</Label>
            <Input id="cert-cn" placeholder="john.doe@acme.com or radius-server-01" className="font-mono" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-ca">Signing CA *</Label>
            <Select>
              <SelectTrigger id="cert-ca"><SelectValue placeholder="Select CA..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="CA-Root-2024">CA-Root-2024</SelectItem>
                <SelectItem value="CA-Intermediate">CA-Intermediate-2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cert-validity">Validity (days)</Label>
              <Input id="cert-validity" type="number" defaultValue={365} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-key">Key Size</Label>
              <Select defaultValue="2048">
                <SelectTrigger id="cert-key"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2048">RSA 2048</SelectItem>
                  <SelectItem value="4096">RSA 4096</SelectItem>
                  <SelectItem value="ec256">EC P-256</SelectItem>
                  <SelectItem value="ec384">EC P-384</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-san">Subject Alternative Names (SAN)</Label>
            <Textarea id="cert-san" placeholder="DNS:radius.acme.com&#10;IP:10.0.0.1" className="font-mono text-xs min-h-[60px]" />
            <p className="text-xs text-muted-foreground">One per line. Prefix with DNS: or IP:</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-format">Download Format</Label>
            <Select defaultValue="p12">
              <SelectTrigger id="cert-format"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="p12">PKCS#12 (.p12)</SelectItem>
                <SelectItem value="pem">PEM (.pem)</SelectItem>
                <SelectItem value="der">DER (.der)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Issue Certificate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateFormDialog;
