import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaUtensils, FaCalendarAlt, FaImages } from 'react-icons/fa'
import './Home.css'

const Home = () => {
  const features = [
    {
      icon: FaUtensils,
      title: 'Carta Deliciosa',
      description: 'Disfruta de nuestros platos tradicionales preparados con ingredientes frescos y el amor de siempre.',
      link: '/menu'
    },
    {
      icon: FaCalendarAlt,
      title: 'Eventos Especiales',
      description: 'Organizamos eventos únicos y ofrecemos catering para todas tus celebraciones especiales.',
      link: '/events'
    },
    {
      icon: FaImages,
      title: 'Galería',
      description: 'Conoce nuestro ambiente acogedor y los momentos especiales que vivimos en Mi Llanerita.',
      link: '/gallery'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="particles">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="particle" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
        </div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            ¡BIENVENIDO A MI LLANERITA!
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            En Mi Llanerita, organizamos eventos especiales, además ofrecemos catering para todo tipo de celebraciones.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to="/menu" className="btn btn-primary">
              Ver Nuestra Carta
            </Link>
            <Link to="/reservations" className="btn btn-secondary">
              Hacer Reserva
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">¿Por qué elegir Mi Llanerita?</h2>
            <p className="section-subtitle">
              Descubre todo lo que tenemos para ofrecerte en un ambiente familiar y acogedor
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <Link to={feature.link} className="feature-link">
                  Conocer más →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>¿Listo para una experiencia culinaria única?</h2>
            <p>Ven y disfruta de la auténtica cocina llanera en un ambiente familiar y acogedor.</p>
            <div className="cta-buttons">
              <Link to="/menu" className="btn btn-primary">
                Ver Menú Completo
              </Link>
              <Link to="/reservations" className="btn btn-secondary">
                Hacer Reserva
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
