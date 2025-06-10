
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { Calendar, Clock, Users, MapPin, Plus, CheckCircle, X } from 'lucide-react';

export const ReservationSystem = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const facilities = [
    {
      id: 'salon',
      name: 'Salón de Eventos',
      capacity: '50 personas',
      price: '$25.000',
      description: 'Salón principal con cocina equipada',
      available: true
    },
    {
      id: 'quincho',
      name: 'Quincho',
      capacity: '30 personas',
      price: '$15.000',
      description: 'Área de parrilla con mesas y sillas',
      available: true
    },
    {
      id: 'gym',
      name: 'Gimnasio',
      capacity: '15 personas',
      price: '$8.000',
      description: 'Equipamiento completo de ejercicios',
      available: false
    },
    {
      id: 'pool',
      name: 'Área de Piscina',
      capacity: '25 personas',
      price: '$20.000',
      description: 'Piscina con área de descanso',
      available: true
    }
  ];

  const timeSlots = [
    '09:00 - 12:00',
    '12:00 - 15:00',
    '15:00 - 18:00',
    '18:00 - 21:00',
    '21:00 - 24:00'
  ];

  const myReservations = [
    {
      id: 1,
      facility: 'Salón de Eventos',
      date: '2024-01-20',
      time: '18:00 - 21:00',
      status: 'confirmed',
      guests: 25
    },
    {
      id: 2,
      facility: 'Quincho',
      date: '2024-01-15',
      time: '12:00 - 15:00',
      status: 'pending',
      guests: 15
    }
  ];

  const handleReservation = () => {
    if (selectedFacility && selectedDate && selectedTime) {
      alert('Reserva enviada para aprobación');
      setSelectedFacility('');
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border border-border transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-6 text-foreground transition-colors duration-300">Sistema de Reservas</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nueva Reserva */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-foreground transition-colors duration-300">Nueva Reserva</h3>
          
          {/* Selección de Instalación */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2 transition-colors duration-300">
              Seleccionar Instalación
            </label>
            <div className="grid grid-cols-1 gap-3">
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedFacility === facility.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  } ${!facility.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => facility.available && setSelectedFacility(facility.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground transition-colors duration-300">{facility.name}</h4>
                      <p className="text-sm text-muted-foreground transition-colors duration-300">{facility.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {facility.capacity}
                        </span>
                        <span className="font-medium text-primary">{facility.price}</span>
                      </div>
                    </div>
                    {!facility.available && (
                      <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 px-2 py-1 rounded transition-colors duration-300">
                        No disponible
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selección de Fecha */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2 transition-colors duration-300">
              Fecha
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Selección de Horario */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2 transition-colors duration-300">
              Horario
            </label>
            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-left border rounded-md transition-all duration-300 ${
                    selectedTime === time
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  <Clock className="inline h-4 w-4 mr-2" />
                  {time}
                </button>
              ))}
            </div>
          </div>

          <AppButton
            onClick={handleReservation}
            disabled={!selectedFacility || !selectedDate || !selectedTime}
            leftIcon={<Plus size={18} />}
            className="w-full transition-all duration-300"
          >
            Solicitar Reserva
          </AppButton>
        </div>

        {/* Mis Reservas */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-foreground transition-colors duration-300">Mis Reservas</h3>
          <div className="space-y-4">
            {myReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="p-4 border border-border rounded-lg bg-background/50 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground transition-colors duration-300">{reservation.facility}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {reservation.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {reservation.time}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {reservation.guests} personas
                      </span>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)} transition-colors duration-300`}>
                    {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {reservation.status === 'pending' && (
                    <AppButton 
                      size="sm" 
                      variant="outline"
                      leftIcon={<X size={16} />}
                      className="transition-all duration-300"
                    >
                      Cancelar
                    </AppButton>
                  )}
                  <AppButton 
                    size="sm" 
                    variant="outline"
                    className="transition-all duration-300"
                  >
                    Ver Detalles
                  </AppButton>
                </div>
              </div>
            ))}
          </div>

          {myReservations.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 transition-colors duration-300" />
              <h4 className="text-lg font-medium text-foreground mb-2 transition-colors duration-300">Sin reservas</h4>
              <p className="text-muted-foreground transition-colors duration-300">No tienes reservas activas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
