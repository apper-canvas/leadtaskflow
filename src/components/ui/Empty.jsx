import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  className,
  title = "No tasks yet",
  description = "Create your first task to get started on your productivity journey!",
  actionText = "Add Your First Task",
  onAction,
  icon = "CheckSquare",
  variant = "default"
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "search":
        return {
          icon: "Search",
          title: "No tasks found",
          description: "Try adjusting your search terms or filters to find what you're looking for."
        }
      case "completed":
        return {
          icon: "Trophy",
          title: "No completed tasks yet",
          description: "Complete some tasks to see them here and celebrate your achievements!"
        }
      case "category":
        return {
          icon: "Tag",
          title: "No tasks in this category",
          description: "Create a task in this category to see it organized here."
        }
      default:
        return { icon, title, description }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className={cn("flex items-center justify-center p-8 min-h-[400px]", className)}>
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <ApperIcon name={styles.icon} size={32} className="text-primary" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 h-8 w-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <ApperIcon name="Plus" size={16} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {styles.title}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {styles.description}
          </p>
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 space-x-2 group"
          >
            <ApperIcon name="Plus" size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>{actionText}</span>
          </button>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
          <ApperIcon name="Sparkles" size={14} />
          <span>Start organizing your productivity</span>
          <ApperIcon name="Sparkles" size={14} />
        </div>
      </div>
    </div>
  )
}

export default Empty