import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-[1.02] focus:ring-primary/50",
    secondary: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 hover:from-slate-200 hover:to-slate-300 hover:shadow-md focus:ring-slate-400/50",
    outline: "border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white focus:ring-primary/50",
    ghost: "text-slate-600 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 focus:ring-slate-400/50",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:scale-[1.02] focus:ring-red-500/50",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:scale-[1.02] focus:ring-success/50"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
    xl: "px-8 py-4 text-lg rounded-xl"
  }

  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={16} 
          className={cn(
            "animate-spin", 
            children && "mr-2"
          )} 
        />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon 
          name={icon} 
          size={16} 
          className={cn(children && "mr-2")} 
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon 
          name={icon} 
          size={16} 
          className={cn(children && "ml-2")} 
        />
      )}
    </button>
  )
})

Button.displayName = "Button"

export default Button