import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface RoleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const resources = [
  "Users", "Sessions", "Groups", "Profiles", "Certificates",
  "Config", "Tenants", "RBAC", "Audit Logs", "Backup", "NAS Devices", "Approvals",
];

const permissions = ["Read", "Create", "Update", "Delete"];

const RoleFormDialog = ({ open, onOpenChange, mode = "create" }: RoleFormDialogProps) => {
  const handleSubmit = () => {
    toast({ title: mode === "create" ? "Role created" : "Role updated" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Role" : "Edit Role"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name *</Label>
              <Input id="role-name" placeholder="e.g. Tenant Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-scope">Scope</Label>
              <Input id="role-scope" placeholder="Global or Tenant-scoped" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role-desc">Description</Label>
            <Textarea id="role-desc" placeholder="Describe the role's purpose and intended use..." className="min-h-[60px]" />
          </div>

          <div className="space-y-2">
            <Label>Permissions Matrix</Label>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="data-table-header text-left p-2.5">Resource</th>
                    {permissions.map((p) => (
                      <th key={p} className="data-table-header text-center p-2.5 w-20">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resources.map((res) => (
                    <tr key={res} className="border-b">
                      <td className="p-2.5 font-medium text-sm">{res}</td>
                      {permissions.map((p) => (
                        <td key={p} className="p-2.5 text-center">
                          <Checkbox aria-label={`${p} ${res}`} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Role" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleFormDialog;
