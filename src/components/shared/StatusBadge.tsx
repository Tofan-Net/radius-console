import { cn } from "@/lib/utils";

type StatusType = "online" | "offline" | "warning" | "error" | "pending";

const statusConfig: Record<StatusType, { dot: string; className: string }> = {
  online: { dot: "bg-[hsl(var(--status-online))]", className: "status-badge-online" },
  offline: { dot: "bg-[hsl(var(--status-offline))]", className: "status-badge-offline" },
  warning: { dot: "bg-[hsl(var(--status-warning))]", className: "status-badge-warning" },
  error: { dot: "bg-[hsl(var(--status-error))]", className: "status-badge-error" },
  pending: { dot: "bg-[hsl(var(--status-pending))]", className: "status-badge-pending" },
};

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span className={cn("status-badge", config.className, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {label}
    </span>
  );
};

export default StatusBadge;
