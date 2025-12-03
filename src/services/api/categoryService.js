import categoriesData from "@/services/mockData/categories.json"

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(200)
    return [...categories]
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(cat => cat.Id === parseInt(id))
    if (!category) {
      throw new Error("Category not found")
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(300)
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id), 0) + 1
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updates) {
    await delay(250)
    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(id))
    if (categoryIndex === -1) {
      throw new Error("Category not found")
    }
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...updates
    }
    
    categories[categoryIndex] = updatedCategory
    return { ...updatedCategory }
  },

  async delete(id) {
    await delay(200)
    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(id))
    if (categoryIndex === -1) {
      throw new Error("Category not found")
    }
    const deletedCategory = categories.splice(categoryIndex, 1)[0]
    return { ...deletedCategory }
  },

  async getByName(name) {
    await delay(150)
    return categories.find(cat => cat.name.toLowerCase() === name.toLowerCase())
  }
}