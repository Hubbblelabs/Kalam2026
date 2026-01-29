import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm text-neutral-dark ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-dark placeholder:text-neutral-dark/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
