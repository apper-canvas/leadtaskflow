import { useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
            404
          </div>
          <div className="absolute -top-4 -right-4 h-16 w-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <ApperIcon name="AlertTriangle" size={32} className="text-white" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Oops! Looks like this task got lost. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleGoHome}
            icon="Home"
            className="shadow-lg"
          >
            Back to TaskFlow
          </Button>
          
          <div className="text-sm text-slate-500">
            Let's get back to organizing your productivity!
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center space-x-2 pt-8">
          <div className="h-2 w-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-gradient-to-r from-secondary to-accent rounded-full animate-pulse delay-100"></div>
          <div className="h-2 w-2 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound