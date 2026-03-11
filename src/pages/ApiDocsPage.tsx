import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Terminal, Code2 } from "lucide-react";

const ApiDocsPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">API & CLI Documentation</h1>
        <p className="page-description">Automate common tasks via REST API or CLI commands</p>
      </div>
    </div>

    <Tabs defaultValue="rest">
      <TabsList>
        <TabsTrigger value="rest" className="gap-1.5"><Code2 className="h-3.5 w-3.5" /> REST API</TabsTrigger>
        <TabsTrigger value="cli" className="gap-1.5"><Terminal className="h-3.5 w-3.5" /> CLI</TabsTrigger>
        <TabsTrigger value="examples" className="gap-1.5"><BookOpen className="h-3.5 w-3.5" /> Examples</TabsTrigger>
      </TabsList>

      <TabsContent value="rest" className="mt-4 space-y-4">
        {[
          { method: "GET", path: "/api/v1/users", desc: "List all users with pagination and filters" },
          { method: "POST", path: "/api/v1/users", desc: "Create a new user with check/reply attributes" },
          { method: "PUT", path: "/api/v1/users/:id", desc: "Update user attributes" },
          { method: "DELETE", path: "/api/v1/users/:id", desc: "Delete user (requires reason)" },
          { method: "POST", path: "/api/v1/sessions/:id/disconnect", desc: "Send Disconnect-Request to NAS" },
          { method: "GET", path: "/api/v1/accounting", desc: "Query accounting records" },
          { method: "POST", path: "/api/v1/config/deploy", desc: "Deploy configuration changes" },
          { method: "POST", path: "/api/v1/config/simulate", desc: "Simulate config with test packet" },
        ].map((ep) => (
          <Card key={ep.path + ep.method}>
            <CardContent className="flex items-center gap-4 py-3">
              <Badge variant={ep.method === "GET" ? "secondary" : ep.method === "POST" ? "default" : ep.method === "PUT" ? "outline" : "destructive"} className="font-mono text-[10px] w-16 justify-center">
                {ep.method}
              </Badge>
              <span className="font-mono text-sm flex-1">{ep.path}</span>
              <span className="text-xs text-muted-foreground">{ep.desc}</span>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="cli" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md bg-foreground/5 p-4 font-mono text-sm space-y-3">
              <div><span className="text-muted-foreground"># List users</span>{"\n"}$ radmin users list --tenant acme --status active</div>
              <div><span className="text-muted-foreground"># Create user</span>{"\n"}$ radmin users create --username john.doe --group employees --vlan 100</div>
              <div><span className="text-muted-foreground"># Disconnect session</span>{"\n"}$ radmin sessions disconnect --session-id abc123 --reason "maintenance"</div>
              <div><span className="text-muted-foreground"># Deploy config</span>{"\n"}$ radmin config deploy --version v2.4.1 --dry-run</div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="examples" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold mb-3">Common Automation Tasks</h3>
            <div className="space-y-4 text-sm">
              <div><p className="font-medium">Bulk user import via CSV</p><p className="text-muted-foreground text-xs mt-1">POST /api/v1/users/import with multipart/form-data containing CSV file</p></div>
              <div><p className="font-medium">Scheduled session cleanup</p><p className="text-muted-foreground text-xs mt-1">DELETE /api/v1/sessions/stale?older_than=24h via cron job</p></div>
              <div><p className="font-medium">Certificate auto-renewal</p><p className="text-muted-foreground text-xs mt-1">POST /api/v1/certificates/renew?expiring_within=30d</p></div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

export default ApiDocsPage;
