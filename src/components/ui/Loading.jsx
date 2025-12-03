import { cn } from "@/utils/cn"

const Loading = ({ className, variant = "default" }) => {
  if (variant === "cards") {
    return (
      <div className={cn("space-y-6", className)}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md w-3/4 mb-2" />
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-full mb-1" />
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-2/3" />
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <div className="h-6 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full" />
                <div className="h-8 w-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full" />
                <div className="h-4 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded" />
              </div>
              <div className="h-4 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="h-12 w-12 mx-auto rounded-full border-4 border-gradient-to-r from-primary to-secondary animate-spin border-t-transparent"></div>
          <div className="absolute inset-0 h-12 w-12 mx-auto rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></div>
        </div>
        <div className="text-lg font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Loading tasks...
        </div>
        <div className="text-sm text-slate-500">
          Getting your productivity organized
        </div>
      </div>
    </div>
  )
}

export default Loading