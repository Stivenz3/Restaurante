import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaUsers, FaUtensils, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck, FaWhatsapp } from 'react-icons/fa'
import { sendWhatsAppMessage, generateEventMessage } from '../services/whatsappService'
import './Events.css'

const Events = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const eventTypes = [
    {
      id: 'cumpleanos',
      name: 'Cumpleaños',
      icon: FaCalendarAlt,
      description: 'Celebra tu cumpleaños con nosotros en un ambiente familiar y acogedor.',
      price: 'Desde $50,000 por persona'
    },
    {
      id: 'boda',
      name: 'Bodas',
      icon: FaUsers,
      description: 'Hacemos que tu día especial sea inolvidable con nuestro servicio de catering.',
      price: 'Desde $80,000 por persona'
    },
    {
      id: 'empresarial',
      name: 'Eventos Empresariales',
      icon: FaUtensils,
      description: 'Servicio de catering para reuniones, lanzamientos y eventos corporativos.',
      price: 'Desde $60,000 por persona'
    }
  ]

  const services = [
    'Catering completo con menú personalizado',
    'Decoración temática según el evento',
    'Personal de servicio especializado',
    'Música ambiente y entretenimiento',
    'Fotografía del evento (opcional)',
    'Coordinación completa del evento',
    'Mesa de postres y dulces tradicionales',
    'Bebidas y cocteles sin alcohol'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.eventType || !formData.date || !formData.guests) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }
    
    setIsSubmitting(true)

    // Generar mensaje de WhatsApp
    const whatsappMessage = generateEventMessage(formData)
    
    // Enviar a WhatsApp
    sendWhatsAppMessage('573226312704', whatsappMessage)
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        guests: '',
        message: ''
      })
    }, 3000)
  }

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
    <div className="events-page">
      {/* Hero Section */}
      <motion.section 
        className="events-hero"
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
            ¡Eventos Especiales!
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            En Mi Llanerita, organizamos eventos especiales, además ofrecemos catering para todo tipo de celebraciones.
          </motion.p>
        </div>
      </motion.section>

      {/* Event Types Section */}
      <motion.section 
        className="event-types-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Tipos de Eventos</h2>
            <p className="section-subtitle">
              Ofrecemos servicios especializados para diferentes tipos de celebraciones
            </p>
          </motion.div>

          <div className="event-types-grid">
            {eventTypes.map((eventType, index) => (
              <motion.div 
                key={eventType.id}
                className="event-type-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="event-type-icon">
                  <eventType.icon />
                </div>
                <h3 className="event-type-name">{eventType.name}</h3>
                <p className="event-type-description">{eventType.description}</p>
                <div className="event-type-price">{eventType.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="services-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Todo lo que necesitas para que tu evento sea perfecto
            </p>
          </motion.div>

          <motion.div className="services-grid" variants={itemVariants}>
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="service-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FaCheck className="service-check" />
                <span>{service}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        className="contact-form-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="form-container" variants={itemVariants}>
            <div className="form-header">
              <h2>Reserva tu Evento</h2>
              <p>Completa el formulario y nos pondremos en contacto contigo para coordinar todos los detalles.</p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <FaWhatsapp className="success-icon" />
                  <h3>¡Solicitud Enviada!</h3>
                  <p>Tu solicitud de evento ha sido enviada por WhatsApp. Nos pondremos en contacto contigo pronto para coordinar tu evento.</p>
                </motion.div>
              ) : (
                <motion.form 
                  className="event-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nombre Completo *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Correo Electrónico *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Teléfono *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="eventType">Tipo de Evento *</label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecciona un tipo</option>
                        {eventTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Fecha del Evento *</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="guests">Número de Invitados *</label>
                      <input
                        type="number"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        required
                        min="1"
                        placeholder="Ej: 50"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Mensaje Adicional</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Cuéntanos más detalles sobre tu evento..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section 
        className="contact-info-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="contact-info-content" variants={itemVariants}>
            <h2>Información de Contacto</h2>
            <div className="contact-details">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Ubicación</h4>
                  <p>Frente al Mesón de las Margaritas<br />San Onofre, Sucre</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h4>Teléfono</h4>
                  <p>+57 (300) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>eventos@millanerita.com</p>
                </div>
              </div>
              <div className="contact-item">
                <FaClock className="contact-icon" />
                <div>
                  <h4>Horarios</h4>
                  <p>Lunes - Domingo<br />6:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Events
