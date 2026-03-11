import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/shared/StatusBadge";
import { Plus, Shield, Copy, Eye, FileText } from "lucide-react";

const templates = [
  { name: "Employee – Wired", attrs: 8, vlan: "100", usage: 4200, status: "Active" },
  { name: "Employee – WiFi", attrs: 7, vlan: "110", usage: 3100, status: "Active" },
  { name: "Contractor – Limited", attrs: 6, vlan: "200", usage: 1240, status: "Active" },
  { name: "Guest – Internet Only", attrs: 4, vlan: "300", usage: 2890, status: "Active" },
  { name: "IoT – Restricted", attrs: 3, vlan: "400", usage: 1340, status: "Active" },
  { name: "VPN – Full Access", attrs: 9, vlan: "50", usage: 560, status: "Draft" },
];

const ProfilesPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Profiles & Policies</h1>
        <p className="page-description">Reusable attribute templates for users and groups. Includes VLAN and Framed-IP builders.</p>
      </div>
      <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Create Profile</Button>
    </div>

    <Tabs defaultValue="templates">
      <TabsList>
        <TabsTrigger value="templates">Profile Templates</TabsTrigger>
        <TabsTrigger value="attributes">Attribute Catalog</TabsTrigger>
        <TabsTrigger value="vlan">VLAN Builder</TabsTrigger>
        <TabsTrigger value="ip">Framed-IP Builder</TabsTrigger>
      </TabsList>

      <TabsContent value="templates" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <Card key={t.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">{t.name}</CardTitle>
                  <Badge variant={t.status === "Active" ? "default" : "secondary"} className="text-[10px]">{t.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{t.attrs} attributes</span>
                  <span>VLAN {t.vlan}</span>
                  <span>{t.usage.toLocaleString()} users</span>
                </div>
                <div className="flex gap-1 mt-3">
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Eye className="h-3 w-3" /> View</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><Copy className="h-3 w-3" /> Clone</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><FileText className="h-3 w-3" /> Apply</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="attributes" className="mt-4"><Card><CardContent className="pt-6 text-sm text-muted-foreground">Searchable attribute dictionary with standard and vendor-specific attributes, operators, and validation rules.</CardContent></Card></TabsContent>
      <TabsContent value="vlan" className="mt-4"><Card><CardContent className="pt-6 text-sm text-muted-foreground">Guided VLAN assignment builder: select Tunnel-Type, Tunnel-Medium-Type, and Tunnel-Private-Group-Id with validation.</CardContent></Card></TabsContent>
      <TabsContent value="ip" className="mt-4"><Card><CardContent className="pt-6 text-sm text-muted-foreground">Framed-IP-Address and Framed-IP-Netmask assignment builder with subnet validation and conflict detection.</CardContent></Card></TabsContent>
    </Tabs>
  </div>
);

export default ProfilesPage;
