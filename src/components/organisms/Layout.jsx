import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Outlet />
    </div>
  )
}

export default Layout