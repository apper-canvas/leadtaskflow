import { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import { toast } from "react-toastify"
import { format } from "date-fns"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import { categoryService } from "@/services/api/categoryService"
import { taskService } from "@/services/api/taskService"
import ApperIcon from "@/components/ApperIcon"

const TaskForm = ({ 
  className,
  task = null,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    category: ""
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadCategories()
    
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || "",
        priority: task.priority || "medium",
        category: task.category || ""
      })
    }
  }, [task])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
      
      // Set default category if creating new task
      if (!task && data.length > 0) {
        setFormData(prev => ({ ...prev, category: data[0].name }))
      }
    } catch (error) {
      console.error("Error loading categories:", error)
      toast.error("Failed to load categories")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      if (task) {
        await taskService.update(task.Id, formData)
        toast.success("Task updated successfully!")
      } else {
        await taskService.create(formData)
        toast.success("Task created successfully!")
      }
      
      onSuccess?.()
    } catch (error) {
      console.error("Error saving task:", error)
      toast.error(task ? "Failed to update task" : "Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Task Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="What needs to be done?"
            error={errors.title}
            icon="Edit3"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Add more details about this task..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Due Date
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              error={errors.dueDate}
              min={format(new Date(), "yyyy-MM-dd")}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Priority
            </label>
            <Select
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Category *
          </label>
          <Select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            error={errors.category}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.Id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-slate-200">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="flex-1"
          icon={task ? "Save" : "Plus"}
        >
          {task ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm