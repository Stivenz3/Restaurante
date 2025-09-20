import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import './Gallery.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState(new Set())

  const galleryImages = [
    { id: 1, src: '/img/11.jpg', alt: 'Evento 1', category: 'eventos' },
    { id: 2, src: '/img/22.jpg', alt: 'Evento 2', category: 'eventos' },
    { id: 3, src: '/img/33.jpg', alt: 'Evento 3', category: 'eventos' },
    { id: 4, src: '/img/44.jpg', alt: 'Evento 4', category: 'eventos' },
    { id: 5, src: '/img/55.jpg', alt: 'Evento 5', category: 'eventos' },
    { id: 6, src: '/img/66.jpg', alt: 'Evento 6', category: 'eventos' },
    { id: 7, src: '/img/77.jpg', alt: 'Evento 7', category: 'eventos' },
    { id: 8, src: '/img/88.jpg', alt: 'Evento 8', category: 'eventos' },
    { id: 9, src: '/img/asada.jpg', alt: 'Carne Asada', category: 'comida' },
    { id: 10, src: '/img/pechuga.jpg', alt: 'Pechuga Asada', category: 'comida' },
    { id: 11, src: '/img/cerdo.jpg', alt: 'Cerdo Asado', category: 'comida' },
    { id: 12, src: '/img/pollo.jpg', alt: 'Pollo Guisado', category: 'comida' }
  ]

  // Mostrar todas las imágenes sin filtros
  const filteredImages = galleryImages

  // Cargar todas las imágenes inmediatamente para mejor rendimiento
  useEffect(() => {
    filteredImages.forEach((image) => {
      if (!loadedImages.has(image.src)) {
        const img = new Image()
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(image.src))
        }
        img.src = image.src
      }
    })
  }, [filteredImages, loadedImages])

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setCurrentIndex(nextIndex)
    setSelectedImage(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedImage(filteredImages[prevIndex])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <motion.section 
        className="gallery-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ¡Nuestra Galería!
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre los momentos especiales y la deliciosa comida de Mi Llanerita
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      <motion.section 
        className="gallery-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.div 
            className="gallery-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="gallery-item"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="gallery-image-container">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="gallery-image"
                    />
                    <div className="gallery-overlay">
                      <FaExpand className="expand-icon" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <FaTimes />
              </button>
              
              <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              
              <button className="lightbox-nav lightbox-next" onClick={nextImage}>
                <FaChevronRight />
              </button>
              
              <img src={selectedImage.src} alt={selectedImage.alt} />
              
              <div className="lightbox-info">
                <h3>{selectedImage.alt}</h3>
                <p>{currentIndex + 1} de {filteredImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
