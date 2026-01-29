import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-primary shadow-lg hover:bg-accent-400 active:scale-[0.98]",
        primary:
          "bg-primary text-white shadow-lg hover:bg-primary-700 active:scale-[0.98]",
        secondary:
          "bg-secondary text-white shadow hover:bg-secondary-600 active:scale-[0.98]",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
        "outline-accent":
          "border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-primary",
        ghost:
          "hover:bg-primary-100 hover:text-primary",
        link:
          "text-secondary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-full gap-1.5 px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        xl: "h-14 rounded-full px-10 text-lg",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
