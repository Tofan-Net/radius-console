import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface TenantFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const TenantFormDialog = ({ open, onOpenChange, mode = "create" }: TenantFormDialogProps) => {
  const handleSubmit = () => {
    toast({ title: mode === "create" ? "Tenant created" : "Tenant updated" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Tenant" : "Edit Tenant"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tenant-name">Organization Name *</Label>
            <Input id="tenant-name" placeholder="Acme Corporation" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tenant-realm">Realm *</Label>
              <Input id="tenant-realm" placeholder="acme.com" className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenant-mode">Integration Mode</Label>
              <Select defaultValue="sql">
                <SelectTrigger id="tenant-mode"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="rest">REST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenant-ips">Allowed Caller IPs</Label>
            <Input id="tenant-ips" placeholder="10.0.0.0/8, 172.16.0.0/12" className="font-mono" />
            <p className="text-xs text-muted-foreground">Comma-separated CIDR blocks. Use * for any.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenant-prefix">Username Prefix/Suffix</Label>
            <Input id="tenant-prefix" placeholder="@acme.com" className="font-mono" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenant-max">Max Users</Label>
            <Input id="tenant-max" type="number" placeholder="10000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenant-contact">Admin Contact Email</Label>
            <Input id="tenant-contact" type="email" placeholder="admin@acme.com" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Tenant" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TenantFormDialog;
