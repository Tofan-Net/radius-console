import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface GroupFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const GroupFormDialog = ({ open, onOpenChange, mode = "create" }: GroupFormDialogProps) => {
  const [checkAttrs, setCheckAttrs] = useState<{ attribute: string; op: string; value: string }[]>([]);
  const [replyAttrs, setReplyAttrs] = useState<{ attribute: string; op: string; value: string }[]>([]);

  const addAttr = (type: "check" | "reply") => {
    const a = { attribute: "", op: ":=", value: "" };
    type === "check" ? setCheckAttrs([...checkAttrs, a]) : setReplyAttrs([...replyAttrs, a]);
  };

  const handleSubmit = () => {
    toast({ title: mode === "create" ? "Group created" : "Group updated" });
    onOpenChange(false);
  };

  const AttrRows = ({ items, setItems, type }: { items: typeof checkAttrs; setItems: (v: typeof checkAttrs) => void; type: "check" | "reply" }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{type === "check" ? "Check Attributes (radgroupcheck)" : "Reply Attributes (radgroupreply)"}</Label>
        <Button variant="outline" size="sm" className="gap-1.5 h-7 text-xs" onClick={() => addAttr(type)}>
          <Plus className="h-3 w-3" /> Add
        </Button>
      </div>
      {items.length === 0 && <p className="text-xs text-muted-foreground py-2">No {type} attributes configured.</p>}
      {items.map((attr, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={attr.attribute} onChange={(e) => { const n = [...items]; n[i].attribute = e.target.value; setItems(n); }} placeholder="Attribute" className="flex-1 font-mono text-xs" />
          <Select value={attr.op} onValueChange={(v) => { const n = [...items]; n[i].op = v; setItems(n); }}>
            <SelectTrigger className="w-20 font-mono text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value=":=">:=</SelectItem>
              <SelectItem value="==">==</SelectItem>
              <SelectItem value="+=">+=</SelectItem>
            </SelectContent>
          </Select>
          <Input value={attr.value} onChange={(e) => { const n = [...items]; n[i].value = e.target.value; setItems(n); }} placeholder="Value" className="flex-1 font-mono text-xs" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => setItems(items.filter((_, j) => j !== i))}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Group" : "Edit Group"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name *</Label>
              <Input id="group-name" placeholder="e.g. vpn-users" className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Input id="priority" type="number" defaultValue={1} min={0} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="group-desc">Description</Label>
            <Textarea id="group-desc" placeholder="Describe the purpose of this group..." className="min-h-[60px]" />
          </div>
          <AttrRows items={checkAttrs} setItems={setCheckAttrs} type="check" />
          <AttrRows items={replyAttrs} setItems={setReplyAttrs} type="reply" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create Group" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupFormDialog;
