import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface NotificationRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const NotificationRuleDialog = ({ open, onOpenChange, mode = "create" }: NotificationRuleDialogProps) => {
  const handleSubmit = () => {
    toast({ title: mode === "create" ? "Rule created" : "Rule updated" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Alert Rule" : "Edit Alert Rule"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name *</Label>
            <Input id="rule-name" placeholder="e.g. NAS Down Alert" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rule-event">Trigger Event *</Label>
            <Select>
              <SelectTrigger id="rule-event"><SelectValue placeholder="Select event..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="nas-down">NAS Unreachable</SelectItem>
                <SelectItem value="auth-fail-rate">High Auth Failure Rate</SelectItem>
                <SelectItem value="cert-expiry">Certificate Expiring</SelectItem>
                <SelectItem value="user-locked">User Account Locked</SelectItem>
                <SelectItem value="config-deploy">Config Deployed</SelectItem>
                <SelectItem value="session-limit">Session Limit Reached</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rule-threshold">Threshold</Label>
              <Input id="rule-threshold" placeholder="e.g. 5 minutes, 10%" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rule-severity">Severity</Label>
              <Select>
                <SelectTrigger id="rule-severity"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <Label>Notification Channels</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="ch-email" defaultChecked />
                <Label htmlFor="ch-email" className="font-normal">Email</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ch-webhook" />
                <Label htmlFor="ch-webhook" className="font-normal">Webhook</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ch-slack" />
                <Label htmlFor="ch-slack" className="font-normal">Slack</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rule-recipients">Email Recipients</Label>
            <Input id="rule-recipients" placeholder="admin@acme.com, ops@acme.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://hooks.example.com/alert" className="font-mono text-xs" />
          </div>
          <div className="flex items-center justify-between py-1">
            <Label>Enabled</Label>
            <Switch defaultChecked />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Rule" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationRuleDialog;
