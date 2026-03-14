import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface NASFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const NASFormDialog = ({ open, onOpenChange, mode = "create" }: NASFormDialogProps) => {
  const handleSubmit = () => {
    toast({ title: mode === "create" ? "NAS device added" : "NAS device updated" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add NAS Device" : "Edit NAS Device"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nas-ip">IP Address / Hostname *</Label>
              <Input id="nas-ip" placeholder="10.0.0.1" className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nas-short">Short Name *</Label>
              <Input id="nas-short" placeholder="core-sw-01" className="font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nas-type">Vendor / Type</Label>
              <Select>
                <SelectTrigger id="nas-type"><SelectValue placeholder="Select vendor..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cisco">Cisco</SelectItem>
                  <SelectItem value="aruba">Aruba / HPE</SelectItem>
                  <SelectItem value="juniper">Juniper</SelectItem>
                  <SelectItem value="fortinet">Fortinet</SelectItem>
                  <SelectItem value="ruckus">Ruckus</SelectItem>
                  <SelectItem value="meraki">Meraki</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nas-ports">Ports</Label>
              <Input id="nas-ports" type="number" placeholder="48" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nas-secret">Shared Secret *</Label>
            <Input id="nas-secret" type="password" placeholder="Enter RADIUS shared secret" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nas-desc">Description</Label>
            <Input id="nas-desc" placeholder="Core Switch Building A" />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <Label>CoA / Disconnect-Messages</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Enable RFC 5176 Change of Authorization support</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coa-port">CoA Port</Label>
              <Input id="coa-port" type="number" defaultValue={3799} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nas-community">SNMP Community</Label>
              <Input id="nas-community" placeholder="public" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Add NAS" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NASFormDialog;
