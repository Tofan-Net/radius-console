import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, Calendar } from "lucide-react";

const authByDay = [
  { day: "Mon", success: 4200, failed: 120 },
  { day: "Tue", success: 4500, failed: 98 },
  { day: "Wed", success: 4800, failed: 145 },
  { day: "Thu", success: 4600, failed: 110 },
  { day: "Fri", success: 4100, failed: 88 },
  { day: "Sat", success: 1200, failed: 25 },
  { day: "Sun", success: 900, failed: 18 },
];

const authByType = [
  { name: "EAP-TLS", value: 45 },
  { name: "PEAP", value: 30 },
  { name: "PAP", value: 15 },
  { name: "MAC", value: 10 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

const ReportsPage = () => (
  <div>
    <div className="page-header">
      <div>
        <h1 className="page-title">Reports</h1>
        <p className="page-description">Authentication analytics, usage trends, and scheduled reports</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1.5"><Calendar className="h-3.5 w-3.5" /> Last 7 Days</Button>
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export PDF</Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle className="text-sm">Authentications by Day</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={authByDay}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="success" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Auth by Protocol</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={authByType} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {authByType.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {authByType.map((t, i) => (
              <div key={t.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                {t.name} ({t.value}%)
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ReportsPage;
