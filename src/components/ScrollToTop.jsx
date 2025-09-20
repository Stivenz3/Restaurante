import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Función para detectar si es un dispositivo móvil
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
             window.innerWidth <= 768
    }

    // Función para hacer scroll al inicio
    const scrollToTop = () => {
      if (isMobile()) {
        // En móviles, usar scroll instantáneo para evitar problemas de posicionamiento
        window.scrollTo(0, 0)
        // También intentar con document.documentElement para mayor compatibilidad
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      } else {
        // En escritorio, usar scroll suave
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }

    // Pequeño delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(scrollToTop, 100)

    // Cleanup
    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}

export default ScrollToTop
