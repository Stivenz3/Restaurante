import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaStar, FaLeaf, FaFire } from 'react-icons/fa'
import './Menu.css'

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [showSearchBar, setShowSearchBar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const menuItems = [
    {
      id: 1,
      name: 'Carne Asada',
      price: 15000,
      image: '/img/asada.jpg',
      category: 'carnes',
      description: 'Carne de res asada al carbón de la mejor calidad, acompañada de patacón, ensalada, arroz y lentejas.',
      popular: true,
      spicy: false,
      vegetarian: false
    },
    {
      id: 2,
      name: 'Pechuga Asada',
      price: 15000,
      image: '/img/pechuga.jpg',
      category: 'carnes',
      description: 'Pechuga de res asada al carbón de la mejor calidad, acompañada de patacón, ensalada, arroz y lentejas.',
      popular: true,
      spicy: false,
      vegetarian: false
    },
    {
      id: 3,
      name: 'Cerdo Asado',
      price: 15000,
      image: '/img/cerdo.jpg',
      category: 'carnes',
      description: 'Cerdo asado al carbón de la mejor calidad, acompañada de patacón, ensalada, arroz y lentejas.',
      popular: false,
      spicy: false,
      vegetarian: false
    },
    {
      id: 4,
      name: 'Sopa de Hueso',
      price: 6000,
      image: '/img/sopa de hueso.jpg',
      category: 'sopas',
      description: 'El mejor consomé del pueblo, hueso fresco y delicioso.',
      popular: true,
      spicy: false,
      vegetarian: false
    },
    {
      id: 5,
      name: 'Sopa con Arroz',
      price: 7000,
      image: '/img/sopa con arroz.jpg',
      category: 'sopas',
      description: 'Nuestra tradicional sopa de hueso con una pequeña porción de arroz.',
      popular: false,
      spicy: false,
      vegetarian: false
    },
    {
      id: 6,
      name: 'Limonada',
      price: 2000,
      image: '/img/limonada.jpeg',
      category: 'bebidas',
      description: 'Elaborada con los mejores limones y panela de la región.',
      popular: true,
      spicy: false,
      vegetarian: true
    },
    {
      id: 7,
      name: 'Carne Desmechada',
      price: 15000,
      image: '/img/carne desmechada.webp',
      category: 'carnes',
      description: 'Carne Desmechada, acompañada de patacón, ensalada, arroz y lentejas.',
      popular: false,
      spicy: false,
      vegetarian: false
    },
    {
      id: 8,
      name: 'Pollo Guisado',
      price: 13000,
      image: '/img/pollo.jpg',
      category: 'carnes',
      description: 'Pollo Guisado, acompañado de patacón, ensalada, arroz y lentejas.',
      popular: false,
      spicy: false,
      vegetarian: false
    }
  ]

  const filteredItems = menuItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  // Controlar la visibilidad de la barra de búsqueda al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setShowSearchBar(false)
      } else {
        // Scrolling up
        setShowSearchBar(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <motion.section 
        className="menu-hero"
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
            ¡Nuestro Menú Llanerita!
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre los sabores auténticos de la cocina llanera
          </motion.p>
        </div>
      </motion.section>

      {/* Filters Section */}
      <AnimatePresence>
        {showSearchBar && (
          <motion.section 
            className="filters-section"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <div className="filters-container">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Buscar platos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="sort-filters">
                  <FaFilter className="filter-icon" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="name">Ordenar por nombre</option>
                    <option value="price-low">Precio: menor a mayor</option>
                    <option value="price-high">Precio: mayor a menor</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <motion.section 
        className="menu-items-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${searchTerm}-${sortBy}`}
              className="menu-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="menu-item"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  layout
                >
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} />
                    <div className="menu-item-badges">
                      {item.popular && (
                        <span className="badge popular">
                          <FaStar />
                          Popular
                        </span>
                      )}
                      {item.spicy && (
                        <span className="badge spicy">
                          <FaFire />
                          Picante
                        </span>
                      )}
                      {item.vegetarian && (
                        <span className="badge vegetarian">
                          <FaLeaf />
                          Vegetariano
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="menu-item-content">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-footer">
                      <span className="menu-item-price">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>No se encontraron platos con los filtros seleccionados.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Limpiar filtros
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  )
}

export default Menu
