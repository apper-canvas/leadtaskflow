import { useState } from "react"
import { cn } from "@/utils/cn"
import { format, isPast, isToday, isTomorrow } from "date-fns"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Checkbox from "@/components/atoms/Checkbox"
import CategoryTag from "@/components/molecules/CategoryTag"
import PriorityIndicator from "@/components/molecules/PriorityIndicator"
import ApperIcon from "@/components/ApperIcon"

const TaskCard = ({ 
  className,
  task,
  category,
  onToggleComplete,
  onEdit,
  onDelete,
  showActions = true
}) => {
  const [isCompleting, setIsCompleting] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleToggleComplete = async () => {
    if (isCompleting) return
    
    setIsCompleting(true)
    
    try {
      await onToggleComplete?.(task.Id)
      
      if (!task.completed) {
        toast.success("Great job! Task completed! 🎉")
      }
    } catch (error) {
      toast.error("Failed to update task")
    } finally {
      setTimeout(() => setIsCompleting(false), 300)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete?.(task.Id)
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    
    const date = new Date(dateString)
    
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    if (isPast(date)) return `Overdue - ${format(date, "MMM d")}`
    
    return format(date, "MMM d, yyyy")
  }

  const getDueDateColor = (dateString) => {
    if (!dateString) return "text-slate-500"
    
    const date = new Date(dateString)
    
    if (isPast(date) && !task.completed) return "text-red-600 font-semibold"
    if (isToday(date)) return "text-warning font-semibold"
    if (isTomorrow(date)) return "text-primary font-medium"
    
    return "text-slate-600"
  }

  const truncatedDescription = task.description && task.description.length > 100
    ? task.description.substring(0, 100) + "..."
    : task.description

  return (
    <div className={cn(
      "bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01] overflow-hidden",
      task.completed && "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200",
      isCompleting && "animate-task-complete",
      className
    )}>
      {/* Priority bar */}
      <div className="flex">
        <PriorityIndicator priority={task.priority} variant="bar" className="flex-shrink-0" />
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.completed}
                  onChange={handleToggleComplete}
                  className="mt-0.5 flex-shrink-0"
                />
                
                <div className="flex-1">
                  <h3 className={cn(
                    "text-lg font-semibold leading-tight mb-2",
                    task.completed 
                      ? "line-through text-green-700" 
                      : "text-slate-900"
                  )}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <div className="space-y-2">
                      <p className={cn(
                        "text-sm leading-relaxed",
                        task.completed ? "text-green-600" : "text-slate-600"
                      )}>
                        {showFullDescription ? task.description : truncatedDescription}
                      </p>
                      
                      {task.description.length > 100 && (
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="text-xs font-medium text-primary hover:text-secondary transition-colors"
                        >
                          {showFullDescription ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showActions && (
              <div className="flex items-center space-x-1 ml-4 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit?.(task)}
                  icon="Edit2"
                  className="text-slate-400 hover:text-primary p-2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  icon="Trash2"
                  className="text-slate-400 hover:text-red-500 p-2"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {category && (
                <CategoryTag
                  category={category}
                  size="sm"
                />
              )}
              
              <PriorityIndicator 
                priority={task.priority} 
                variant="dot"
                showLabel
              />
            </div>

            {task.dueDate && (
              <div className="flex items-center space-x-1 text-xs">
                <ApperIcon 
                  name="Calendar" 
                  size={12} 
                  className={getDueDateColor(task.dueDate)} 
                />
                <span className={getDueDateColor(task.dueDate)}>
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard