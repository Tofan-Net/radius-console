import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CSVImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CSVImportDialog = ({ open, onOpenChange }: CSVImportDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<"upload" | "preview" | "result">("upload");

  const mockPreview = [
    { username: "alice.johnson", email: "alice@acme.com", group: "employees", authType: "PAP" },
    { username: "mark.taylor", email: "mark@acme.com", group: "contractors", authType: "PEAP" },
    { username: "sara.williams", email: "sara@acme.com", group: "guests", authType: "PAP" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setStep("preview"); }
  };

  const handleImport = () => {
    setStep("result");
    setTimeout(() => {
      toast({ title: "Import complete", description: "3 users imported, 0 errors." });
    }, 500);
  };

  const reset = () => { setFile(null); setStep("upload"); onOpenChange(false); };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); else onOpenChange(v); }}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>CSV Import</DialogTitle>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload a CSV with columns: <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">username, email, group, auth_type, password</code>
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm mb-2">Drop CSV file here or click to browse</p>
              <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="csv-upload" />
              <Button variant="outline" size="sm" onClick={() => document.getElementById("csv-upload")?.click()}>
                Select File
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Default Group</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select default group..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="employees">employees</SelectItem>
                  <SelectItem value="contractors">contractors</SelectItem>
                  <SelectItem value="guests">guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{file?.name}</span>
              <span className="text-muted-foreground">— 3 rows detected</span>
            </div>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="data-table-header text-left p-2">Username</th>
                    <th className="data-table-header text-left p-2">Email</th>
                    <th className="data-table-header text-left p-2">Group</th>
                    <th className="data-table-header text-left p-2">Auth Type</th>
                    <th className="data-table-header text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPreview.map((r) => (
                    <tr key={r.username} className="border-b">
                      <td className="p-2 font-mono text-xs">{r.username}</td>
                      <td className="p-2 text-xs">{r.email}</td>
                      <td className="p-2 font-mono text-xs">{r.group}</td>
                      <td className="p-2 text-xs">{r.authType}</td>
                      <td className="p-2"><CheckCircle2 className="h-3.5 w-3.5 text-success" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" /> 3 valid rows, 0 errors
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 mx-auto text-success" />
            <p className="text-lg font-semibold">Import Successful</p>
            <p className="text-sm text-muted-foreground">3 users created, 0 skipped, 0 errors</p>
          </div>
        )}

        <DialogFooter>
          {step === "upload" && <Button variant="outline" onClick={reset}>Cancel</Button>}
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={() => setStep("upload")}>Back</Button>
              <Button onClick={handleImport}>Import 3 Users</Button>
            </>
          )}
          {step === "result" && <Button onClick={reset}>Done</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CSVImportDialog;
