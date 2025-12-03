import { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"

const SearchBar = ({ 
  className,
  placeholder = "Search tasks...",
  onSearch,
  debounceMs = 300,
  showClearButton = true
}) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(query)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, debounceMs, onSearch])

  const handleClear = () => {
    setQuery("")
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        icon="Search"
        className={cn(showClearButton && query && "pr-12")}
      />
      
      {showClearButton && query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 h-auto rounded-lg hover:bg-slate-100"
          icon="X"
        />
      )}
    </div>
  )
}

export default SearchBar