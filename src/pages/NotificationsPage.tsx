import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Mail, Webhook } from "lucide-react";
import NotificationRuleDialog from "@/components/forms/NotificationRuleDialog";

const alertRules = [
  { name: "NAS Down", trigger: "NAS unreachable > 5 min", channels: ["Email", "Webhook"], severity: "Critical", enabled: true },
  { name: "High Auth Failures", trigger: "Failure rate > 10% in 5 min", channels: ["Email"], severity: "Warning", enabled: true },
  { name: "Certificate Expiring", trigger: "Cert expires < 30 days", channels: ["Email"], severity: "Warning", enabled: true },
  { name: "Config Deployed", trigger: "Any config deployment", channels: ["Webhook"], severity: "Info", enabled: true },
  { name: "User Locked", trigger: "3+ failed auths in 1 min", channels: ["Email", "Webhook"], severity: "Warning", enabled: false },
];

const NotificationsPage = () => {
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications & Alerts</h1>
          <p className="page-description">Configure alert rules, channels, and escalation policies</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setCreateDialog(true)}>
          <Plus className="h-3.5 w-3.5" /> Create Rule
        </Button>
      </div>
      <div className="space-y-3">
        {alertRules.map((rule) => (
          <Card key={rule.name}>
            <CardContent className="flex items-center gap-4 py-4">
              <Bell className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{rule.name}</span>
                  <Badge variant={rule.severity === "Critical" ? "destructive" : rule.severity === "Warning" ? "default" : "secondary"} className="text-[10px]">
                    {rule.severity}
                  </Badge>
                  {!rule.enabled && <Badge variant="outline" className="text-[10px]">Disabled</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{rule.trigger}</p>
              </div>
              <div className="flex items-center gap-2">
                {rule.channels.map((ch) => (
                  <Badge key={ch} variant="outline" className="text-[10px] gap-1">
                    {ch === "Email" ? <Mail className="h-3 w-3" /> : <Webhook className="h-3 w-3" />}
                    {ch}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setEditDialog(true)}>Edit</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <NotificationRuleDialog open={createDialog} onOpenChange={setCreateDialog} mode="create" />
      <NotificationRuleDialog open={editDialog} onOpenChange={setEditDialog} mode="edit" />
    </div>
  );
};

export default NotificationsPage;
