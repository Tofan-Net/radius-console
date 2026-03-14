import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface DeviceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const DeviceFormDialog = ({ open, onOpenChange, mode = "create" }: DeviceFormDialogProps) => {
  const handleSubmit = () => {
    toast({ title: mode === "create" ? "Device added" : "Device updated" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add MAC Device" : "Edit Device"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mac">MAC Address *</Label>
            <Input id="mac" placeholder="AA:BB:CC:DD:EE:FF" className="font-mono uppercase" />
            <p className="text-xs text-muted-foreground">Format: AA:BB:CC:DD:EE:FF or AABBCCDDEEFF</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dev-desc">Description</Label>
            <Input id="dev-desc" placeholder="e.g. Printer Floor 3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dev-group">Group</Label>
              <Select>
                <SelectTrigger id="dev-group"><SelectValue placeholder="Select group..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="iot-devices">iot-devices</SelectItem>
                  <SelectItem value="printers">printers</SelectItem>
                  <SelectItem value="phones">phones</SelectItem>
                  <SelectItem value="cameras">cameras</SelectItem>
                  <SelectItem value="access-ctrl">access-ctrl</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dev-vlan">VLAN</Label>
              <Input id="dev-vlan" type="number" placeholder="400" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dev-notes">Notes</Label>
            <Textarea id="dev-notes" placeholder="Optional notes about this device..." className="min-h-[60px]" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Add Device" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceFormDialog;
