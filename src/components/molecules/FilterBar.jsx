import { cn } from "@/utils/cn"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"

const FilterBar = ({ 
  className,
  activeFilter = "all",
  onFilterChange,
  sortBy = "createdAt",
  onSortChange,
  taskCounts = { all: 0, active: 0, completed: 0 }
}) => {
  const filters = [
    { key: "all", label: "All Tasks", count: taskCounts.all },
    { key: "active", label: "Active", count: taskCounts.active },
    { key: "completed", label: "Completed", count: taskCounts.completed }
  ]

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "title", label: "Alphabetical" }
  ]

  return (
    <div className={cn("flex flex-col sm:flex-row justify-between gap-4", className)}>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "primary" : "ghost"}
            size="md"
            onClick={() => onFilterChange?.(filter.key)}
            className={cn(
              "relative",
              activeFilter === filter.key 
                ? "shadow-lg" 
                : "hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100"
            )}
          >
            {filter.label}
            <span className={cn(
              "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
              activeFilter === filter.key
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-600"
            )}>
              {filter.count}
            </span>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-600">Sort by:</span>
        <Select
          value={sortBy}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="min-w-[140px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default FilterBar