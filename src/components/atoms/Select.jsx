import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ 
  className, 
  error,
  children,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
  
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""

  return (
    <div className="relative">
      <select
        className={cn(
          baseStyles,
          errorStyles,
          "pr-10",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <ApperIcon name="ChevronDown" size={16} />
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select