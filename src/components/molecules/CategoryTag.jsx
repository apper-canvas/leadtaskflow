import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const CategoryTag = ({ 
  className,
  category,
  size = "md",
  clickable = false,
  onClick
}) => {
  if (!category) return null

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  }

  const baseStyles = cn(
    "inline-flex items-center space-x-1.5 rounded-full font-medium text-white shadow-sm transition-all duration-200",
    sizes[size],
    clickable && "cursor-pointer hover:shadow-md hover:scale-105",
    className
  )

  return (
    <div
      className={baseStyles}
      style={{ backgroundColor: category.color }}
      onClick={clickable ? onClick : undefined}
    >
      <ApperIcon name={category.icon} size={size === "sm" ? 12 : size === "md" ? 14 : 16} />
      <span>{category.name}</span>
    </div>
  )
}

export default CategoryTag