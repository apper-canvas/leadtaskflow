import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const ErrorView = ({ 
  className, 
  error = "Something went wrong", 
  onRetry,
  title = "Oops! Something went wrong",
  description = "We encountered an error while loading your tasks. Please try again."
}) => {
  return (
    <div className={cn("flex items-center justify-center p-8 min-h-[400px]", className)}>
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
            <ApperIcon name="AlertTriangle" size={32} className="text-red-600" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name="X" size={16} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {description}
          </p>
          {error !== "Something went wrong" && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
              Error: {error}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 space-x-2"
            >
              <ApperIcon name="RotateCcw" size={16} />
              <span>Try Again</span>
            </button>
          )}
          
          <div className="text-sm text-slate-500">
            If the problem persists, please refresh the page
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorView