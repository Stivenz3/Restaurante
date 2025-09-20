import React from 'react'
import { motion } from 'framer-motion'
import ReservationCalendar from '../components/ReservationCalendar'
import { sendWhatsAppMessage, generateReservationMessage } from '../services/whatsappService'
import './Reservations.css'

const Reservations = () => {
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
    <div className="reservations-page">
      {/* Hero Section */}
      <motion.section 
        className="reservations-hero"
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
            Reserva tu Mesa
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Garantiza tu lugar en Mi Llanerita y disfruta de una experiencia culinaria única
          </motion.p>
        </div>
      </motion.section>

      {/* Información de reservas */}
      <motion.section 
        className="reservation-info"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="info-grid" variants={itemVariants}>
            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h3>Horarios de Atención</h3>
              <p>Lunes a Domingo<br />11:00 AM - 10:00 PM</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">👥</div>
              <h3>Capacidad</h3>
              <p>Mesa para 2 a 10 personas</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Confirmación</h3>
              <p>Te contactaremos para<br />confirmar tu reserva</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🎉</div>
              <h3>Celebraciones</h3>
              <p>Decoración especial<br />para eventos</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Calendario de reservas */}
      <motion.section 
        className="reservation-calendar-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div variants={itemVariants}>
            <ReservationCalendar />
          </motion.div>
        </div>
      </motion.section>

      {/* Políticas de Reserva */}
      <motion.section 
        className="policies-section section bg-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <h2 className="section-title">Políticas de Reserva</h2>
          <p className="section-subtitle">Conoce nuestras reglas para una mejor experiencia.</p>
          
          <div className="policies-grid">
            <motion.div 
              className="policy-card glass"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-medium)' }}
            >
              <div className="policy-icon">⏰</div>
              <h3>Puntualidad</h3>
              <p>Las reservas se mantienen por 15 minutos después de la hora acordada. Después de este tiempo, la mesa podrá ser asignada a otros clientes.</p>
            </motion.div>

            <motion.div 
              className="policy-card glass"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-medium)' }}
            >
              <div className="policy-icon">📞</div>
              <h3>Cancelaciones</h3>
              <p>Para cancelar o modificar tu reserva, contáctanos con al menos 2 horas de anticipación. Las cancelaciones de último momento pueden afectar futuras reservas.</p>
            </motion.div>

            <motion.div 
              className="policy-card glass"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-medium)' }}
            >
              <div className="policy-icon">👥</div>
              <h3>Grupos</h3>
              <p>Para grupos de más de 8 personas, se requiere confirmación telefónica adicional. Podemos requerir un depósito para grupos grandes.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Reservations
