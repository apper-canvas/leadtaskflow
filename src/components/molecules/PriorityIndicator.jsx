import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const PriorityIndicator = ({ 
  className,
  priority,
  showLabel = false,
  variant = "default"
}) => {
  const priorities = {
    low: {
      color: "from-slate-400 to-slate-500",
      bgColor: "bg-slate-100",
      textColor: "text-slate-600",
      icon: "ArrowDown",
      label: "Low Priority"
    },
    medium: {
      color: "from-warning to-orange-600",
      bgColor: "bg-orange-100",
      textColor: "text-orange-700",
      icon: "Minus",
      label: "Medium Priority"
    },
    high: {
      color: "from-error to-red-600",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      icon: "ArrowUp",
      label: "High Priority"
    }
  }

  const config = priorities[priority] || priorities.low

  if (variant === "bar") {
    return (
      <div 
        className={cn(
          "w-1 h-full bg-gradient-to-b rounded-full",
          config.color,
          className
        )}
      />
    )
  }

  if (variant === "dot") {
    return (
      <div className={cn("flex items-center space-x-1", className)}>
        <div 
          className={cn(
            "w-2 h-2 rounded-full bg-gradient-to-r",
            config.color
          )}
        />
        {showLabel && (
          <span className={cn("text-xs font-medium", config.textColor)}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn(
      "inline-flex items-center space-x-1 px-2 py-1 rounded-md",
      config.bgColor,
      className
    )}>
      <ApperIcon name={config.icon} size={12} className={config.textColor} />
      {showLabel && (
        <span className={cn("text-xs font-medium", config.textColor)}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      )}
    </div>
  )
}

export default PriorityIndicator