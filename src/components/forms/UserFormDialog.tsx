import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
}

const UserFormDialog = ({ open, onOpenChange, mode = "create" }: UserFormDialogProps) => {
  const [attrs, setAttrs] = useState([
    { attribute: "Cleartext-Password", op: ":=", value: "" },
  ]);
  const [replyAttrs, setReplyAttrs] = useState<{ attribute: string; op: string; value: string }[]>([]);

  const addAttr = (type: "check" | "reply") => {
    const newAttr = { attribute: "", op: ":=", value: "" };
    if (type === "check") setAttrs([...attrs, newAttr]);
    else setReplyAttrs([...replyAttrs, newAttr]);
  };

  const removeAttr = (type: "check" | "reply", idx: number) => {
    if (type === "check") setAttrs(attrs.filter((_, i) => i !== idx));
    else setReplyAttrs(replyAttrs.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    toast({ title: mode === "create" ? "User created" : "User updated", description: "Changes have been saved successfully." });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create User" : "Edit User"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="check">Check Attributes</TabsTrigger>
            <TabsTrigger value="reply">Reply Attributes</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input id="username" placeholder="john.doe" className="font-mono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@acme.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="group">Primary Group</Label>
                <Select>
                  <SelectTrigger id="group"><SelectValue placeholder="Select group..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employees">employees</SelectItem>
                    <SelectItem value="contractors">contractors</SelectItem>
                    <SelectItem value="guests">guests</SelectItem>
                    <SelectItem value="vpn-users">vpn-users</SelectItem>
                    <SelectItem value="iot-devices">iot-devices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-type">Auth Type</Label>
                <Select>
                  <SelectTrigger id="auth-type"><SelectValue placeholder="Select auth type..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PAP">PAP</SelectItem>
                    <SelectItem value="CHAP">CHAP</SelectItem>
                    <SelectItem value="MS-CHAPv2">MS-CHAPv2</SelectItem>
                    <SelectItem value="EAP-TLS">EAP-TLS</SelectItem>
                    <SelectItem value="PEAP">PEAP</SelectItem>
                    <SelectItem value="EAP-TTLS">EAP-TTLS</SelectItem>
                    <SelectItem value="MAC">MAC Auth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenant">Tenant</Label>
                <Select defaultValue="acme">
                  <SelectTrigger id="tenant"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Corporation</SelectItem>
                    <SelectItem value="globex">Globex Inc</SelectItem>
                    <SelectItem value="initech">Initech Labs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiration">Expiration Date</Label>
                <Input id="expiration" type="date" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="check" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">radcheck attributes applied during authorization</p>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => addAttr("check")}>
                <Plus className="h-3.5 w-3.5" /> Add Attribute
              </Button>
            </div>
            <div className="space-y-2">
              {attrs.map((attr, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Select value={attr.attribute} onValueChange={(v) => { const next = [...attrs]; next[i].attribute = v; setAttrs(next); }}>
                    <SelectTrigger className="flex-1 font-mono text-xs"><SelectValue placeholder="Attribute..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cleartext-Password">Cleartext-Password</SelectItem>
                      <SelectItem value="NT-Password">NT-Password</SelectItem>
                      <SelectItem value="Crypt-Password">Crypt-Password</SelectItem>
                      <SelectItem value="Simultaneous-Use">Simultaneous-Use</SelectItem>
                      <SelectItem value="Login-Time">Login-Time</SelectItem>
                      <SelectItem value="Expiration">Expiration</SelectItem>
                      <SelectItem value="Auth-Type">Auth-Type</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={attr.op} onValueChange={(v) => { const next = [...attrs]; next[i].op = v; setAttrs(next); }}>
                    <SelectTrigger className="w-20 font-mono text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value=":=">:=</SelectItem>
                      <SelectItem value="==">==</SelectItem>
                      <SelectItem value="+=">+=</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={attr.value}
                    onChange={(e) => { const next = [...attrs]; next[i].value = e.target.value; setAttrs(next); }}
                    placeholder="Value"
                    className="flex-1 font-mono text-xs"
                  />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => removeAttr("check", i)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reply" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">radreply attributes sent back to the NAS</p>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => addAttr("reply")}>
                <Plus className="h-3.5 w-3.5" /> Add Attribute
              </Button>
            </div>
            <div className="space-y-2">
              {replyAttrs.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">No reply attributes. Click "Add Attribute" to configure VLAN, bandwidth, or other reply attributes.</p>
              )}
              {replyAttrs.map((attr, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Select value={attr.attribute} onValueChange={(v) => { const next = [...replyAttrs]; next[i].attribute = v; setReplyAttrs(next); }}>
                    <SelectTrigger className="flex-1 font-mono text-xs"><SelectValue placeholder="Attribute..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tunnel-Type">Tunnel-Type</SelectItem>
                      <SelectItem value="Tunnel-Medium-Type">Tunnel-Medium-Type</SelectItem>
                      <SelectItem value="Tunnel-Private-Group-Id">Tunnel-Private-Group-Id</SelectItem>
                      <SelectItem value="Framed-IP-Address">Framed-IP-Address</SelectItem>
                      <SelectItem value="Framed-IP-Netmask">Framed-IP-Netmask</SelectItem>
                      <SelectItem value="Session-Timeout">Session-Timeout</SelectItem>
                      <SelectItem value="Idle-Timeout">Idle-Timeout</SelectItem>
                      <SelectItem value="WISPr-Bandwidth-Max-Down">WISPr-Bandwidth-Max-Down</SelectItem>
                      <SelectItem value="WISPr-Bandwidth-Max-Up">WISPr-Bandwidth-Max-Up</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={attr.op} onValueChange={(v) => { const next = [...replyAttrs]; next[i].op = v; setReplyAttrs(next); }}>
                    <SelectTrigger className="w-20 font-mono text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value=":=">:=</SelectItem>
                      <SelectItem value="=">= </SelectItem>
                      <SelectItem value="+=">+=</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={attr.value}
                    onChange={(e) => { const next = [...replyAttrs]; next[i].value = e.target.value; setReplyAttrs(next); }}
                    placeholder="Value"
                    className="flex-1 font-mono text-xs"
                  />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => removeAttr("reply", i)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === "create" ? "Create User" : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
