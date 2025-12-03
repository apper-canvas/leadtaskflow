import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import TaskCounter from "@/components/molecules/TaskCounter"
import ApperIcon from "@/components/ApperIcon"
import { useTheme } from "@/context/ThemeContext"

const Header = ({ 
  className,
  onSearch,
  onAddTask,
  taskStats = { total: 0, active: 0, completed: 0, completionRate: 0 }
}) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Theme Toggle */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          icon={theme === 'light' ? "Moon" : "Sun"}
          className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm backdrop-blur-sm transition-all duration-200"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
      </div>

      {/* Title Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
            <ApperIcon name="CheckSquare" size={24} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-200">
          Capture, organize, and complete your tasks with minimal friction. 
          <span className="font-semibold text-primary"> Stay productive, stay focused.</span>
        </p>
      </div>

      {/* Stats */}
      <TaskCounter
        totalTasks={taskStats.total}
        activeTasks={taskStats.active}
        completedTasks={taskStats.completed}
        completionRate={taskStats.completionRate}
      />

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search tasks by title, description, or category..."
            onSearch={onSearch}
            debounceMs={300}
          />
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={onAddTask}
          icon="Plus"
          className="shrink-0 shadow-lg"
        >
          Add Task
        </Button>
      </div>
    </div>
  )
}

export default Header