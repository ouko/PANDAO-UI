import { useEffect, useState } from 'react'

const useMobileDetection = (options = {}) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkIfMobile = () => {
      if (options.router && options.excludedRoutes) {
        const currentPath = window.location.pathname
        
        // Remove trailing slash for consistency
        const normalizedCurrentPath = currentPath.endsWith('/') 
          ? currentPath.slice(0, -1) 
          : currentPath

        // Check if the current path exactly matches any excluded route
        const isExcluded = options.excludedRoutes.some(route => {
          const normalizedRoute = route.endsWith('/') ? route.slice(0, -1) : route
          
          // For root path '/'
          if (normalizedRoute === '') {
            return normalizedCurrentPath === ''
          }
          
          // For other paths, check exact match or if it's a direct child of excluded path
          return normalizedCurrentPath === normalizedRoute ||
                 (normalizedRoute === '/' && normalizedCurrentPath === '')
        })

        if (isExcluded) {
          setIsMobile(false)
          return
        }
      }

      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const isMobileDevice = /android|iphone|ipad|ipod|opera mini|blackberry|mobile/i.test(
        userAgent
      )
      setIsMobile(isMobileDevice)
    }

    checkIfMobile()

    // Handle resize events
    const handleResize = () => {
      checkIfMobile()
    }
    window.addEventListener('resize', handleResize)

    // Handle URL changes
    const handlePopState = () => {
      checkIfMobile()
    }
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [options.router, options.excludedRoutes])

  return isMobile
}
export default useMobileDetection
