import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const ProfileFormDialog = ({ open, onOpenChange, mode = "create" }: ProfileFormDialogProps) => {
  const [attrs, setAttrs] = useState<{ attribute: string; op: string; value: string }[]>([]);

  const handleSubmit = () => {
    toast({ title: mode === "create" ? "Profile created" : "Profile updated" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Profile Template" : "Edit Profile"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prof-name">Profile Name *</Label>
            <Input id="prof-name" placeholder="e.g. Employee – Wired" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prof-desc">Description</Label>
            <Textarea id="prof-desc" placeholder="Describe what this profile is used for..." className="min-h-[60px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prof-vlan">Default VLAN</Label>
              <Input id="prof-vlan" type="number" placeholder="100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prof-status">Status</Label>
              <Select defaultValue="active">
                <SelectTrigger id="prof-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Attributes</Label>
              <Button variant="outline" size="sm" className="gap-1.5 h-7 text-xs" onClick={() => setAttrs([...attrs, { attribute: "", op: ":=", value: "" }])}>
                <Plus className="h-3 w-3" /> Add
              </Button>
            </div>
            {attrs.length === 0 && <p className="text-xs text-muted-foreground py-2">No attributes. Add RADIUS attributes that will be applied when this profile is assigned.</p>}
            {attrs.map((attr, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input value={attr.attribute} onChange={(e) => { const n = [...attrs]; n[i].attribute = e.target.value; setAttrs(n); }} placeholder="Attribute" className="flex-1 font-mono text-xs" />
                <Select value={attr.op} onValueChange={(v) => { const n = [...attrs]; n[i].op = v; setAttrs(n); }}>
                  <SelectTrigger className="w-20 font-mono text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value=":=">:=</SelectItem>
                    <SelectItem value="==">==</SelectItem>
                    <SelectItem value="+=">+=</SelectItem>
                  </SelectContent>
                </Select>
                <Input value={attr.value} onChange={(e) => { const n = [...attrs]; n[i].value = e.target.value; setAttrs(n); }} placeholder="Value" className="flex-1 font-mono text-xs" />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => setAttrs(attrs.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Profile" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileFormDialog;
