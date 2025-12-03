import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates
    }

    // Handle completion status change
    if (updates.completed !== undefined) {
      updatedTask.completedAt = updates.completed ? new Date().toISOString() : null
    }

    tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0]
    return { ...deletedTask }
  },

  async search(query) {
    await delay(200)
    const searchTerm = query.toLowerCase().trim()
    if (!searchTerm) return [...tasks]
    
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm) ||
      task.category.toLowerCase().includes(searchTerm)
    )
  },

  async getByCategory(category) {
    await delay(200)
    return tasks.filter(task => task.category === category)
  },

  async getByStatus(completed) {
    await delay(200)
    return tasks.filter(task => task.completed === completed)
  },

  async toggleComplete(id) {
    await delay(200)
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    const task = tasks[taskIndex]
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    }
    
    tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  }
}