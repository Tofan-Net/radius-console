import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Upload, UserPlus, MoreHorizontal, Eye, Edit, Lock, Trash2 } from "lucide-react";
import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import UserFormDialog from "@/components/forms/UserFormDialog";
import CSVImportDialog from "@/components/forms/CSVImportDialog";

const mockUsers = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  username: [`john.doe`, `jane.smith`, `bob.wilson`, `alice.brown`, `charlie.davis`, `diana.evans`, `frank.garcia`, `grace.harris`][i % 8] + (i > 7 ? i : ""),
  email: [`john@acme.com`, `jane@acme.com`, `bob@acme.com`, `alice@acme.com`, `charlie@acme.com`, `diana@acme.com`, `frank@acme.com`, `grace@acme.com`][i % 8],
  status: (["online", "online", "online", "offline", "offline", "pending", "error", "warning"] as const)[i % 8],
  statusLabel: ["Active", "Active", "Active", "Disabled", "Disabled", "Pending", "Locked", "Expiring"][i % 8],
  group: ["employees", "contractors", "admins", "guests"][i % 4],
  authType: ["PAP", "EAP-TLS", "PEAP", "MAC"][i % 4],
  lastAuth: ["2 min ago", "1 hr ago", "3 hrs ago", "1 day ago", "Never"][i % 5],
  sessions: [1, 0, 3, 0, 2][i % 5],
  tenant: "acme",
}));

const UsersPage = () => {
  const [disableDialog, setDisableDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [csvDialog, setCsvDialog] = useState(false);

  const columns: Column<typeof mockUsers[0]>[] = [
    {
      key: "username",
      label: "Username",
      render: (row) => (
        <Link to={`/users/${row.id}`} className="text-primary hover:underline font-medium font-mono text-sm">
          {row.username}
        </Link>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} label={row.statusLabel} />,
    },
    { key: "group", label: "Group" },
    { key: "authType", label: "Auth Type" },
    { key: "lastAuth", label: "Last Auth" },
    {
      key: "sessions",
      label: "Sessions",
      render: (row) => (
        <span className={row.sessions > 0 ? "font-semibold text-success" : "text-muted-foreground"}>
          {row.sessions}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Row actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild><Link to={`/users/${row.id}`} className="flex items-center"><Eye className="h-3.5 w-3.5 mr-2" /> View Details</Link></DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditDialog(true)}><Edit className="h-3.5 w-3.5 mr-2" /> Edit User</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDisableDialog(true)}>
              <Lock className="h-3.5 w-3.5 mr-2" /> Disable User
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteDialog(true)}>
              <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-description">Manage RADIUS user accounts, credentials, and access policies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setCsvDialog(true)}>
            <Upload className="h-3.5 w-3.5" /> CSV Import
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setCreateDialog(true)}>
            <UserPlus className="h-3.5 w-3.5" /> Add User
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockUsers}
        searchPlaceholder="Search users by name, email, or group..."
        onExport={() => {}}
        bulkActions={
          <>
            <Button variant="outline" size="sm" className="h-8 text-xs">Enable</Button>
            <Button variant="outline" size="sm" className="h-8 text-xs text-destructive">Disable</Button>
          </>
        }
      />

      <UserFormDialog open={createDialog} onOpenChange={setCreateDialog} mode="create" />
      <UserFormDialog open={editDialog} onOpenChange={setEditDialog} mode="edit" />
      <CSVImportDialog open={csvDialog} onOpenChange={setCsvDialog} />

      <ConfirmDialog
        open={disableDialog}
        onOpenChange={setDisableDialog}
        title="Disable User Account"
        description="This will immediately terminate all active sessions and prevent future authentication. The user's data will be preserved."
        confirmLabel="Disable User"
        variant="destructive"
        requireReason
        onConfirm={() => setDisableDialog(false)}
      />
      <ConfirmDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        title="Delete User Account"
        description="This will permanently delete the user and all associated radcheck, radreply, and radusergroup entries. This cannot be undone."
        confirmLabel="Delete User"
        variant="destructive"
        requireReason
        onConfirm={() => setDeleteDialog(false)}
      />
    </div>
  );
};

export default UsersPage;
