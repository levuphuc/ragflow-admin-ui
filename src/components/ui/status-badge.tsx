import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all",
  {
    variants: {
      status: {
        ready: "bg-success/10 text-success border border-success/20",
        processing: "bg-warning/10 text-warning border border-warning/20 animate-pulse",
        failed: "bg-destructive/10 text-destructive border border-destructive/20",
        disabled: "bg-muted text-muted-foreground border border-border",
        indexed: "bg-success/10 text-success border border-success/20",
        pending: "bg-warning/10 text-warning border border-warning/20",
        online: "bg-success/10 text-success border border-success/20",
        offline: "bg-destructive/10 text-destructive border border-destructive/20",
      },
    },
    defaultVariants: {
      status: "ready",
    },
  }
)

export interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode
  className?: string
  showIndicator?: boolean
}

export function StatusBadge({ status, children, className, showIndicator = true, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      {showIndicator && (
        <span className={cn(
          "h-2 w-2 rounded-full",
          status === "ready" || status === "indexed" || status === "online" ? "bg-success" :
          status === "processing" || status === "pending" ? "bg-warning animate-pulse" :
          status === "failed" || status === "offline" ? "bg-destructive" :
          "bg-muted-foreground"
        )} />
      )}
      {children}
    </span>
  )
}