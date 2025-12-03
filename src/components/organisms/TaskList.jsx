import { useState, useEffect, useMemo } from "react"
import { cn } from "@/utils/cn"
import { toast } from "react-toastify"
import { compareAsc, compareDesc } from "date-fns"
import TaskCard from "@/components/organisms/TaskCard"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"
import { taskService } from "@/services/api/taskService"
import { categoryService } from "@/services/api/categoryService"

const TaskList = ({ 
  className,
  searchQuery = "",
  filter = "all",
  sortBy = "createdAt",
  onEditTask,
  onAddTask,
  refreshTrigger = 0
}) => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadData()
  }, [refreshTrigger])

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
    } catch (err) {
      console.error("Error loading data:", err)
      setError(err.message || "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ))
    } catch (error) {
      console.error("Error toggling task:", error)
      throw error
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.Id !== taskId))
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error("Error deleting task:", error)
      toast.error("Failed to delete task")
    }
  }

  const getCategoryForTask = (taskCategory) => {
    return categories.find(cat => cat.name === taskCategory)
  }

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (filter === "active") {
      filtered = filtered.filter(task => !task.completed)
    } else if (filter === "completed") {
      filtered = filtered.filter(task => task.completed)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return compareAsc(new Date(a.dueDate), new Date(b.dueDate))

        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]

        case "title":
          return a.title.localeCompare(b.title)

        case "createdAt":
        default:
          return compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      }
    })

    return filtered
  }, [tasks, searchQuery, filter, sortBy])

  if (loading) {
    return <Loading variant="cards" className={className} />
  }

  if (error) {
    return (
      <ErrorView
        className={className}
        error={error}
        onRetry={loadData}
        title="Failed to load tasks"
        description="We couldn't load your tasks. Please try again."
      />
    )
  }

  if (filteredAndSortedTasks.length === 0) {
    let emptyVariant = "default"
    let emptyTitle = "No tasks yet"
    let emptyDescription = "Create your first task to get started on your productivity journey!"

    if (searchQuery.trim()) {
      emptyVariant = "search"
      emptyTitle = "No tasks found"
      emptyDescription = `No tasks match "${searchQuery}". Try adjusting your search terms.`
    } else if (filter === "completed") {
      emptyVariant = "completed"
      emptyTitle = "No completed tasks yet"
      emptyDescription = "Complete some tasks to see them here and celebrate your achievements!"
    } else if (filter === "active") {
      emptyTitle = "No active tasks"
      emptyDescription = "All caught up! Add a new task or check your completed ones."
    }

    return (
      <Empty
        className={className}
        variant={emptyVariant}
        title={emptyTitle}
        description={emptyDescription}
        actionText="Add New Task"
        onAction={onAddTask}
      />
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {filteredAndSortedTasks.map((task) => (
        <TaskCard
          key={task.Id}
          task={task}
          category={getCategoryForTask(task.category)}
          onToggleComplete={handleToggleComplete}
          onEdit={onEditTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </div>
  )
}

export default TaskList