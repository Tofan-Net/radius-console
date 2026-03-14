import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BackupRestoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BackupRestoreDialog = ({ open, onOpenChange }: BackupRestoreDialogProps) => {
  const [source, setSource] = useState<string>("");

  const handleRestore = () => {
    toast({ title: "Restore initiated", description: "The database restore is in progress. This may take a few minutes." });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Restore from Backup</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-md border border-warning/50 bg-warning/5 p-3 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Destructive Operation</p>
              <p className="text-xs text-muted-foreground mt-1">Restoring will overwrite the current database. All changes since the backup will be lost. This action cannot be undone.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Restore Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger><SelectValue placeholder="Select backup..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="b1">backup-2026-03-11-0900.sql.gz (245 MB)</SelectItem>
                <SelectItem value="b2">backup-2026-03-10-0900.sql.gz (243 MB)</SelectItem>
                <SelectItem value="b3">backup-2026-03-09-0900.sql.gz (241 MB)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Or upload a backup file</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
              <p className="text-xs text-muted-foreground">Drop .sql.gz file here</p>
              <input type="file" accept=".sql,.gz,.sql.gz" className="hidden" id="restore-upload" />
              <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => document.getElementById("restore-upload")?.click()}>
                Browse
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleRestore} disabled={!source}>Restore Database</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackupRestoreDialog;
