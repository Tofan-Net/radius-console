import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Shield } from "lucide-react";
import RoleFormDialog from "@/components/forms/RoleFormDialog";

const roles = [
  { name: "Administrator", description: "Full system access", members: 3, builtIn: true },
  { name: "Operator", description: "Day-to-day operations, user management, session control", members: 8, builtIn: true },
  { name: "Helpdesk", description: "View users, reset passwords, view sessions", members: 12, builtIn: true },
  { name: "Auditor", description: "Read-only access to all data and audit logs", members: 4, builtIn: true },
  { name: "Tenant Admin", description: "Full access within tenant scope", members: 6, builtIn: false },
];

const permissionMatrix = [
  { resource: "Users", admin: "CRUD", operator: "CRUD", helpdesk: "R, Reset Pwd", auditor: "R" },
  { resource: "Sessions", admin: "R, Disconnect", operator: "R, Disconnect", helpdesk: "R", auditor: "R" },
  { resource: "Groups", admin: "CRUD", operator: "CRU", helpdesk: "R", auditor: "R" },
  { resource: "Profiles", admin: "CRUD", operator: "RU", helpdesk: "R", auditor: "R" },
  { resource: "Certificates", admin: "CRUD, Revoke", operator: "R, Issue", helpdesk: "R", auditor: "R" },
  { resource: "Config", admin: "CRUD, Deploy", operator: "R", helpdesk: "—", auditor: "R" },
  { resource: "Tenants", admin: "CRUD", operator: "R", helpdesk: "—", auditor: "R" },
  { resource: "RBAC", admin: "CRUD", operator: "—", helpdesk: "—", auditor: "R" },
  { resource: "Audit Logs", admin: "R, Export", operator: "R", helpdesk: "R (own)", auditor: "R, Export" },
  { resource: "Backup", admin: "CRUD", operator: "R", helpdesk: "—", auditor: "R" },
  { resource: "NAS Devices", admin: "CRUD", operator: "RU", helpdesk: "R", auditor: "R" },
  { resource: "Approvals", admin: "Approve/Deny", operator: "Request", helpdesk: "Request", auditor: "R" },
];

const RBACPage = () => {
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Roles & Permissions</h1>
          <p className="page-description">RBAC configuration — every action is gated and audit-logged</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setCreateDialog(true)}>
          <Plus className="h-3.5 w-3.5" /> Create Role
        </Button>
      </div>

      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="matrix">Permissions Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card key={role.name} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm">{role.name}</CardTitle>
                    </div>
                    {role.builtIn && <Badge variant="secondary" className="text-[10px]">Built-in</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">{role.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{role.members} members</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setEditDialog(true)}>Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="mt-4">
          <Card>
            <CardContent className="pt-6 overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b">
                    <th className="data-table-header text-left p-3 sticky left-0 bg-card">Resource</th>
                    <th className="data-table-header text-left p-3">Administrator</th>
                    <th className="data-table-header text-left p-3">Operator</th>
                    <th className="data-table-header text-left p-3">Helpdesk</th>
                    <th className="data-table-header text-left p-3">Auditor</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionMatrix.map((row) => (
                    <tr key={row.resource} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium sticky left-0 bg-card">{row.resource}</td>
                      <td className="p-3 text-xs font-mono">{row.admin}</td>
                      <td className="p-3 text-xs font-mono">{row.operator}</td>
                      <td className="p-3 text-xs font-mono">{row.helpdesk}</td>
                      <td className="p-3 text-xs font-mono">{row.auditor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <RoleFormDialog open={createDialog} onOpenChange={setCreateDialog} mode="create" />
      <RoleFormDialog open={editDialog} onOpenChange={setEditDialog} mode="edit" />
    </div>
  );
};

export default RBACPage;
