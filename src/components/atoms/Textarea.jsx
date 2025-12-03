import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className, 
  error,
  rows = 3,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
  
  const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""

  return (
    <textarea
      rows={rows}
      className={cn(
        baseStyles,
        errorStyles,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea