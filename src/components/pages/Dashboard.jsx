import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Header from "@/components/organisms/Header"
import FilterBar from "@/components/molecules/FilterBar"
import TaskList from "@/components/organisms/TaskList"
import TaskModal from "@/components/organisms/TaskModal"
import Button from "@/components/atoms/Button"
import { taskService } from "@/services/api/taskService"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [taskStats, setTaskStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    completionRate: 0
  })
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    loadTaskStats()
  }, [refreshTrigger])

  const loadTaskStats = async () => {
    try {
      const tasks = await taskService.getAll()
      const total = tasks.length
      const completed = tasks.filter(task => task.completed).length
      const active = total - completed
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

      setTaskStats({ total, active, completed, completionRate })
    } catch (error) {
      console.error("Error loading task stats:", error)
    }
  }

  const handleAddTask = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleModalSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
    toast.success(editingTask ? "Task updated successfully!" : "Task created successfully!")
  }

  const taskCounts = {
    all: taskStats.total,
    active: taskStats.active,
    completed: taskStats.completed
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Header
          onSearch={setSearchQuery}
          onAddTask={handleAddTask}
          taskStats={taskStats}
          className="mb-8"
        />

        {/* Filter Bar */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          taskCounts={taskCounts}
          className="mb-8"
        />

        {/* Task List */}
        <div className="relative">
          <TaskList
            searchQuery={searchQuery}
            filter={activeFilter}
            sortBy={sortBy}
            onEditTask={handleEditTask}
            onAddTask={handleAddTask}
            refreshTrigger={refreshTrigger}
          />
        </div>

        {/* Floating Action Button - Mobile */}
        <div className="fixed bottom-6 right-6 sm:hidden">
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddTask}
            icon="Plus"
            className="h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300"
          />
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={editingTask}
          onSuccess={handleModalSuccess}
        />
      </div>
    </div>
  )
}

export default Dashboard