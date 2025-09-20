import React, { createContext, useContext, useReducer, useEffect } from 'react'

const ReservationContext = createContext()

// Tipos de acciones para el reducer
const RESERVATION_ACTIONS = {
  CREATE_RESERVATION: 'CREATE_RESERVATION',
  UPDATE_RESERVATION: 'UPDATE_RESERVATION',
  CANCEL_RESERVATION: 'CANCEL_RESERVATION',
  LOAD_RESERVATIONS: 'LOAD_RESERVATIONS',
  SET_AVAILABLE_SLOTS: 'SET_AVAILABLE_SLOTS'
}

// Estado inicial
const initialState = {
  reservations: [],
  availableSlots: [],
  loading: false,
  error: null
}

// Reducer para manejar el estado de las reservas
const reservationReducer = (state, action) => {
  switch (action.type) {
    case RESERVATION_ACTIONS.CREATE_RESERVATION:
      const newReservation = {
        id: Date.now().toString(),
        ...action.payload,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
      return {
        ...state,
        reservations: [...state.reservations, newReservation],
        loading: false
      }

    case RESERVATION_ACTIONS.UPDATE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.map(reservation =>
          reservation.id === action.payload.id
            ? { ...reservation, ...action.payload.updates }
            : reservation
        )
      }

    case RESERVATION_ACTIONS.CANCEL_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.map(reservation =>
          reservation.id === action.payload
            ? { ...reservation, status: 'cancelled' }
            : reservation
        )
      }

    case RESERVATION_ACTIONS.LOAD_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload || [],
        loading: false
      }

    case RESERVATION_ACTIONS.SET_AVAILABLE_SLOTS:
      return {
        ...state,
        availableSlots: action.payload,
        loading: false
      }

    default:
      return state
  }
}

// Función para generar horarios disponibles
const generateTimeSlots = (date) => {
  const slots = []
  const startHour = 7  // 7:00 AM
  const endHour = 23   // 11:00 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const isAvailable = true // Todos los horarios disponibles
      
      slots.push({
        time: timeString,
        available: isAvailable
      })
    }
  }
  
  return slots
}

// Provider del contexto
export const ReservationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, initialState)

  // Cargar reservas desde localStorage al inicializar
  useEffect(() => {
    const savedReservations = localStorage.getItem('mi-llanerita-reservations')
    if (savedReservations) {
      try {
        const reservations = JSON.parse(savedReservations)
        dispatch({ type: RESERVATION_ACTIONS.LOAD_RESERVATIONS, payload: reservations })
      } catch (error) {
        console.error('Error loading reservations from localStorage:', error)
      }
    }
  }, [])

  // Guardar reservas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('mi-llanerita-reservations', JSON.stringify(state.reservations))
  }, [state.reservations])

  // Funciones de reserva
  const createReservation = (reservationData) => {
    dispatch({ type: RESERVATION_ACTIONS.CREATE_RESERVATION, payload: reservationData })
  }

  const updateReservation = (id, updates) => {
    dispatch({ type: RESERVATION_ACTIONS.UPDATE_RESERVATION, payload: { id, updates } })
  }

  const cancelReservation = (id) => {
    dispatch({ type: RESERVATION_ACTIONS.CANCEL_RESERVATION, payload: id })
  }

  const getAvailableSlots = (date) => {
    const slots = generateTimeSlots(date)
    dispatch({ type: RESERVATION_ACTIONS.SET_AVAILABLE_SLOTS, payload: slots })
    return slots
  }

  const getReservationsByDate = (date) => {
    return state.reservations.filter(reservation => 
      reservation.date === date && reservation.status !== 'cancelled'
    )
  }

  const value = {
    ...state,
    createReservation,
    updateReservation,
    cancelReservation,
    getAvailableSlots,
    getReservationsByDate
  }

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useReservation = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider')
  }
  return context
}

export default ReservationContext
