import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className, 
  checked,
  onChange,
  label,
  ...props 
}, ref) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 rounded-md border-2 transition-all duration-200 cursor-pointer flex items-center justify-center",
            checked 
              ? "bg-gradient-to-r from-primary to-secondary border-primary shadow-sm" 
              : "border-slate-300 bg-white hover:border-primary/50",
            className
          )}
          onClick={() => onChange?.({ target: { checked: !checked } })}
        >
          {checked && (
            <ApperIcon 
              name="Check" 
              size={12} 
              className="text-white animate-in zoom-in-50 duration-150" 
            />
          )}
        </div>
      </div>
      
      {label && (
        <label 
          className="ml-2 text-sm text-slate-700 cursor-pointer select-none"
          onClick={() => onChange?.({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox