import { useEffect } from "react"
import { cn } from "@/utils/cn"
import { motion, AnimatePresence } from "framer-motion"
import TaskForm from "@/components/organisms/TaskForm"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task = null,
  onSuccess
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden",
                "border border-slate-200"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {task ? "Edit Task" : "Create New Task"}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {task ? "Update your task details" : "Add a new task to stay organized"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  icon="X"
                  className="text-slate-400 hover:text-slate-600 p-2"
                />
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <TaskForm
                  task={task}
                  onSuccess={handleSuccess}
                  onCancel={onClose}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TaskModal