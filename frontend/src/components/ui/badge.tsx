import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent text-primary",
        primary:
          "border-transparent bg-primary text-white",
        secondary:
          "border-transparent bg-secondary text-white",
        outline:
          "border-secondary text-secondary",
        success:
          "border-transparent bg-green-600 text-white",
        warning:
          "border-transparent bg-amber-500 text-white",
        destructive:
          "border-transparent bg-red-600 text-white",
        info:
          "border-transparent bg-soft-yellow text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
