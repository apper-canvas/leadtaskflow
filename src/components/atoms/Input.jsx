import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
  
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
  
  const iconStyles = {
    left: icon ? "pl-11" : "",
    right: icon ? "pr-11" : ""
  }

  return (
    <div className="relative">
      {icon && (
        <div className={cn(
          "absolute top-1/2 -translate-y-1/2 text-slate-400",
          iconPosition === "left" ? "left-4" : "right-4"
        )}>
          <ApperIcon name={icon} size={16} />
        </div>
      )}
      
      <input
        type={type}
        className={cn(
          baseStyles,
          iconStyles[iconPosition],
          errorStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})

Input.displayName = "Input"

export default Input