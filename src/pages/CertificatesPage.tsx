import DataTable, { Column } from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, RefreshCw } from "lucide-react";

const mockCerts = [
  { serial: "01:AB:CD", subject: "CA-Root-2024", type: "CA", issuer: "Self-signed", notAfter: "2030-01-01", status: "online" as const, statusLabel: "Valid" },
  { serial: "02:EF:01", subject: "radius-server-01", type: "Server", issuer: "CA-Root-2024", notAfter: "2027-06-15", status: "online" as const, statusLabel: "Valid" },
  { serial: "03:23:45", subject: "john.doe@acme.com", type: "Client", issuer: "CA-Root-2024", notAfter: "2026-09-30", status: "warning" as const, statusLabel: "Expiring" },
  { serial: "04:67:89", subject: "old-server", type: "Server", issuer: "CA-Root-2022", notAfter: "2025-12-31", status: "error" as const, statusLabel: "Revoked" },
  { serial: "05:AB:CD", subject: "bob.wilson@acme.com", type: "Client", issuer: "CA-Root-2024", notAfter: "2026-12-15", status: "online" as const, statusLabel: "Valid" },
];

const columns: Column<typeof mockCerts[0]>[] = [
  { key: "serial", label: "Serial", render: (r) => <span className="font-mono text-xs">{r.serial}</span> },
  { key: "subject", label: "Subject", render: (r) => <span className="font-medium">{r.subject}</span> },
  { key: "type", label: "Type" },
  { key: "issuer", label: "Issuer", render: (r) => <span className="text-xs">{r.issuer}</span> },
  { key: "notAfter", label: "Expires", render: (r) => <span className="font-mono text-xs">{r.notAfter}</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} label={r.statusLabel} /> },
  { key: "actions", label: "", render: (r) => r.status !== "error" ? <Button variant="outline" size="sm" className="h-7 text-xs text-destructive">Revoke</Button> : null },
];

const CertificatesPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Certificates</h1>
        <p className="page-description">Manage CA, server, and client certificates for EAP-TLS authentication</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Import</Button>
        <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Issue Certificate</Button>
      </div>
    </div>
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All Certificates</TabsTrigger>
        <TabsTrigger value="ca">CA</TabsTrigger>
        <TabsTrigger value="server">Server</TabsTrigger>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="crl">CRL / Revoked</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <DataTable columns={columns} data={mockCerts} searchPlaceholder="Search by serial, subject, or issuer..." onExport={() => {}} />
      </TabsContent>
      <TabsContent value="ca" className="mt-4"><DataTable columns={columns} data={mockCerts.filter(c => c.type === "CA")} searchPlaceholder="Search CA certs..." /></TabsContent>
      <TabsContent value="server" className="mt-4"><DataTable columns={columns} data={mockCerts.filter(c => c.type === "Server")} searchPlaceholder="Search server certs..." /></TabsContent>
      <TabsContent value="client" className="mt-4"><DataTable columns={columns} data={mockCerts.filter(c => c.type === "Client")} searchPlaceholder="Search client certs..." /></TabsContent>
      <TabsContent value="crl" className="mt-4"><DataTable columns={columns} data={mockCerts.filter(c => c.status === "error")} searchPlaceholder="Search revoked certs..." /></TabsContent>
    </Tabs>
  </div>
);

export default CertificatesPage;
