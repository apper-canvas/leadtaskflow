import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const TaskCounter = ({ 
  className,
  totalTasks = 0,
  activeTasks = 0,
  completedTasks = 0,
  completionRate = 0
}) => {
  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "List",
      color: "from-slate-500 to-slate-600"
    },
    {
      label: "Active",
      value: activeTasks,
      icon: "Clock",
      color: "from-primary to-secondary"
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "CheckCircle",
      color: "from-success to-green-600"
    }
  ]

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                {stat.label}
              </p>
              <p className={cn(
                "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                stat.color
              )}>
                {stat.value}
              </p>
            </div>
            <div className={cn(
              "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-sm",
              stat.color
            )}>
              <ApperIcon name={stat.icon} size={20} className="text-white" />
            </div>
          </div>
        </div>
      ))}
      
      {totalTasks > 0 && (
        <div className="sm:col-span-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm font-bold text-primary">{completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCounter