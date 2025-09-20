import React from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaUsers, FaAward, FaLeaf } from 'react-icons/fa'
import './About.css'

const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: 'Pasión por la Cocina',
      description: 'Cada plato se prepara con amor y dedicación, manteniendo las recetas tradicionales de la familia.'
    },
    {
      icon: FaUsers,
      title: 'Ambiente Familiar',
      description: 'Creamos un espacio acogedor donde cada cliente se siente como en casa, parte de nuestra familia.'
    },
    {
      icon: FaAward,
      title: 'Calidad Garantizada',
      description: 'Utilizamos solo los mejores ingredientes frescos y técnicas culinarias tradicionales.'
    }
  ]

  const stats = [
    { number: '15+', label: 'Años de Experiencia' },
    { number: '1000+', label: 'Clientes Satisfechos' },
    { number: '50+', label: 'Platos Tradicionales' },
    { number: '24/7', label: 'Servicio de Calidad' }
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
    <div className="about-page">
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
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
            ¡Sobre Nosotros!
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Conoce la historia de nuestra familia y nuestra pasión por la cocina llanera
          </motion.p>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="story-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="story-content" variants={itemVariants}>
            <div className="story-text">
              <h2>Nuestra Historia</h2>
              <div className="story-paragraphs">
                <p>
                  En el corazón de San Onofre, frente al antiguo Mesón de las Margaritas, surgió un sueño que comenzó con una simple pasión por la buena comida y la calidez de la familia. Así nació "Mi Llanerita", un restaurante que se gestó en el deseo de ofrecer a la comunidad un rincón especial donde cada plato cuenta una historia.
                </p>
                <p>
                  El restaurante fue fundado por la familia ZARZA DELGADO, quien, inspirado por la tradición culinaria y el amor por su tierra, decidió abrir las puertas de su asadero en una ubicación estratégica, justo antes de la estación de servicio Terpel, salida a Cartagena. Con un pequeño equipo y un gran corazón, el sueño se hizo realidad.
                </p>
                <p>
                  "Mi Llanerita" no solo es un lugar para disfrutar de exquisitos asados y platos típicos, sino también un espacio donde cada cliente es recibido como parte de la familia. El nombre, evocador de las llanuras y la esencia del campo, refleja el espíritu acogedor y auténtico del restaurante.
                </p>
                <p>
                  Desde sus inicios, el restaurante ha sido un punto de encuentro para celebraciones, eventos y reuniones familiares, consolidándose como un lugar querido y esencial en la comunidad. Con cada comida servida, "Mi Llanerita" sigue creciendo y uniendo a las personas, manteniendo viva la tradición y el amor por la buena comida.
                </p>
              </div>
            </div>
            <div className="story-image">
              <img src="/img/Snapshot_3.png" alt="Historia de Mi Llanerita" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="values-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Nuestros Valores</h2>
            <p className="section-subtitle">
              Los principios que guían cada aspecto de nuestro servicio
            </p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                className="value-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="value-icon">
                  <value.icon />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="stat-item"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  )
}

export default About
