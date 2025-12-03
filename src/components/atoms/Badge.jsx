import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  size = "md",
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200"
  
  const variants = {
    default: "bg-slate-100 text-slate-800",
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-sm",
    secondary: "bg-gradient-to-r from-secondary to-accent text-white shadow-sm",
    success: "bg-gradient-to-r from-success to-green-600 text-white shadow-sm",
    warning: "bg-gradient-to-r from-warning to-orange-600 text-white shadow-sm",
    danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-sm",
    outline: "border-2 border-slate-300 text-slate-600 bg-white"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  }

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge