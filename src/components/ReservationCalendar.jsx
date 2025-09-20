import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaUsers, FaCheck, FaTimes, FaWhatsapp } from 'react-icons/fa'
import { useReservation } from '../context/ReservationContext'
import { sendWhatsAppMessage, generateReservationMessage } from '../services/whatsappService'
import './ReservationCalendar.css'

const ReservationCalendar = () => {
  const { availableSlots, getAvailableSlots, createReservation } = useReservation()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [guests, setGuests] = useState(2)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Generar fechas disponibles (15 días: hoy + 14 días más)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    // Solo mostrar 15 días: hoy + 14 días más
    for (let i = 0; i < 15; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('es-CO', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        isToday: i === 0,
        isTomorrow: i === 1
      })
    }
    
    return dates
  }

  const availableDates = generateAvailableDates()

  // Cargar horarios cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      getAvailableSlots(selectedDate)
    }
  }, [selectedDate]) // Removido getAvailableSlots de las dependencias

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime('')
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime || !customerInfo.name || !customerInfo.phone) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    setIsSubmitting(true)

    const reservationData = {
      date: selectedDate,
      time: selectedTime,
      guests,
      ...customerInfo
    }

    // Generar mensaje de WhatsApp
    const whatsappMessage = generateReservationMessage(reservationData)
    
    // Enviar a WhatsApp
    sendWhatsAppMessage('573226312704', whatsappMessage)

    // Crear reserva local
    createReservation(reservationData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setSelectedDate('')
      setSelectedTime('')
      setGuests(2)
      setCustomerInfo({
        name: '',
        phone: '',
        email: '',
        specialRequests: ''
      })
    }, 3000)
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="reservation-calendar">
      <div className="calendar-header">
        <h2>Reserva tu Mesa</h2>
        <p>Selecciona la fecha, hora y completa tus datos para reservar</p>
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
            <h3>¡Reserva Enviada!</h3>
            <p>Tu solicitud de reserva ha sido enviada por WhatsApp. Te contactaremos pronto para confirmar los detalles.</p>
            <div className="notification-info">
              <FaWhatsapp className="notification-icon" />
              <span>Se ha enviado un mensaje por WhatsApp al restaurante con los detalles de tu reserva</span>
            </div>
          </motion.div>
        ) : (
          <motion.form 
            className="reservation-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Selección de fecha */}
            <div className="form-section">
              <h3>
                <FaCalendarAlt />
                Selecciona una Fecha
              </h3>
              <div className="date-grid">
                {availableDates.map((dateInfo) => (
                  <motion.button
                    key={dateInfo.date}
                    type="button"
                    className={`date-option ${selectedDate === dateInfo.date ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(dateInfo.date)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="date-display">{dateInfo.display}</span>
                    {dateInfo.isToday && <span className="date-badge">Hoy</span>}
                    {dateInfo.isTomorrow && <span className="date-badge">Mañana</span>}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Selección de hora */}
            {selectedDate && (
              <motion.div 
                className="form-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h3>
                  <FaClock />
                  Selecciona una Hora
                </h3>
                <div className="time-grid">
                  {availableSlots.map((slot) => (
                    <motion.button
                      key={slot.time}
                      type="button"
                      className={`time-option ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      whileHover={slot.available ? { scale: 1.05 } : {}}
                      whileTap={slot.available ? { scale: 0.95 } : {}}
                    >
                      <span className="time-display">{formatTime(slot.time)}</span>
                      {!slot.available && (
                        <span className="unavailable-text">
                          <FaTimes />
                          No disponible
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Información del cliente */}
            {selectedTime && (
              <motion.div 
                className="form-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h3>Información de Contacto</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guests">Personas *</label>
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      required
                    >
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">Solicitudes Especiales</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={customerInfo.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Alergias, celebraciones especiales, etc."
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-reservation-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
                </button>
              </motion.div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReservationCalendar
