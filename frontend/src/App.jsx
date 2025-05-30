import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Suspense, useEffect,  } from 'react'
import { toast } from 'sonner'
import { useAccount } from './AccountContext'
import axios from 'axios'
import { formatDate } from './utils/functions/ConvertDate'
import { protectedRoutes, publicRoutes } from './routes/routes'
import ProtectedRoute from './routes/protectedRoutes'
import LoaderPage from './Pages/loaderPage'
import useMobileDetection from './hooks/useIsMobile'

function App() {
  const { accounts } = useAccount()
  const fetchNotification = async () => {
    if (accounts && accounts.length > 0 && accounts[0]?.address) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/notification/${
            accounts[0].address
          }`,
        )

        const notifications = res.data
        if (notifications.length > 0) {
        notifications.forEach((notification) => {
          console.log(notification)
          toast.message(notification.title, {
 
            style: { backgroundColor: "#f0f8ff", color: "black",border:"1px solid #4169E1" },
            duration: Infinity,
            description: `${notification.text}\n${formatDate(
              notification.date,
            )}`,
          })
        })}
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    } else {
      console.warn('Accounts not available or address missing')
    }
  }

  const options = {
    router: true,
    excludedRoutes: ['/' ,'/ourstory'],
  }
  const isMobile = useMobileDetection(options)
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const interval = setInterval(() => {
        fetchNotification()
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [accounts]) // Add accounts as a dependency

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#f8f8f8',
          color: '#333',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div>
          <h1 className="font-bold text-2xl my-2">Desktop Only Application</h1>
          <p className="text-balance">
            This application is designed to work on desktop devices only. Please
            access it from a desktop browser.
          </p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
    <Suspense fallback={<LoaderPage />}>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          >
            {route.children?.map((child) => (
              <Route
                key={child.path || 'index'}
                index={child.index}
                path={child.path}
                element={<Suspense fallback={<LoaderPage />}><child.element /></Suspense>}
              />
            ))}
          </Route>
        ))}

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <route.element />
              </ProtectedRoute>
            }
          >
            {route.children?.map((child) => (
              <Route
                key={child.path || 'index'}
                index={child.index}
                path={child.path}
                element={
                  <Suspense fallback={<LoaderPage />}>
                    <child.element />
                  </Suspense>
                }
              />
            ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
  )
}

export default App
