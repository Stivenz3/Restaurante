const WHATSAPP_NUMBER = '573226312704' // Tu número para las reservas

export const generateWhatsAppLink = (number, message) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encodedMessage}`
}

export const sendWhatsAppMessage = (number, message) => {
  const link = generateWhatsAppLink(number, message)
  window.open(link, '_blank')
}

export const generateReservationMessage = (reservationData) => {
  const { name, email, phone, date, time, guests, specialRequests } = reservationData
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `*NUEVA RESERVA - MI LLANERITA*

*Cliente:* ${name}
*Email:* ${email || 'No proporcionado'}
*Telefono:* ${phone}

*Fecha:* ${date}
*Hora:* ${time}
*Comensales:* ${guests}

*Solicitudes especiales:* ${specialRequests || 'Ninguna'}

---
*Reserva realizada desde la pagina web*
*Fecha de solicitud:* ${formattedDate}

¡Gracias por elegir Mi Llanerita!`
}

export const generateEventMessage = (eventData) => {
  const { name, email, phone, eventType, date, guests, message } = eventData
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `*NUEVO EVENTO - MI LLANERITA*

*Cliente:* ${name}
*Email:* ${email || 'No proporcionado'}
*Telefono:* ${phone}

*Tipo de evento:* ${eventType}
*Fecha:* ${date}
*Invitados:* ${guests}

*Mensaje:* ${message || 'Sin mensaje adicional'}

---
*Solicitud realizada desde la pagina web*
*Fecha de solicitud:* ${formattedDate}

¡Gracias por elegir Mi Llanerita para tu evento especial!`
}