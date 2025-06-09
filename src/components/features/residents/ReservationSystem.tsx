
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { Calendar, Clock, MapPin, Plus, Users } from 'lucide-react';

export const ReservationSystem = () => {
  const [reservations] = useState([
    {
      id: '1',
      space: 'Salón de Eventos',
      date: '2024-01-20',
      time: '15:00-20:00',
      status: 'confirmed',
      guests: 25
    },
    {
      id: '2',
      space: 'Quincho',
      date: '2024-01-25',
      time: '12:00-16:00',
      status: 'pending',
      guests: 15
    }
  ]);

  const availableSpaces = [
    {
      id: '1',
      name: 'Salón de Eventos',
      capacity: 50,
      hourlyRate: '$25.000',
      amenities: ['Cocina', 'Baños', 'Audio', 'Proyector']
    },
    {
      id: '2',
      name: 'Quincho',
      capacity: 30,
      hourlyRate: '$15.000',
      amenities: ['Parrilla', 'Mesas', 'Baños', 'Lavaplatos']
    },
    {
      id: '3',
      name: 'Sala de Reuniones',
      capacity: 12,
      hourlyRate: '$10.000',
      amenities: ['Mesa', 'Sillas', 'Proyector', 'Wifi']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Sistema de Reservas</h2>
        <AppButton leftIcon={<Plus size={18} />}>
          Nueva Reserva
        </AppButton>
      </div>

      {/* Mis Reservas */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Mis Reservas</h3>
        <div className="space-y-3">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="border dark:border-gray-600 rounded-lg p-4 transition-colors duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{reservation.space}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(reservation.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {reservation.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {reservation.guests} personas
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(reservation.status)}`}>
                  {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Espacios Disponibles */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Espacios Disponibles</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableSpaces.map((space) => (
            <div key={space.id} className="border dark:border-gray-600 rounded-lg p-4 transition-colors duration-300">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{space.name}</h4>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{space.hourlyRate}</span>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <div className="flex items-center mb-1">
                  <Users className="h-4 w-4 mr-1" />
                  Hasta {space.capacity} personas
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">SERVICIOS INCLUIDOS</h5>
                <div className="flex flex-wrap gap-1">
                  {space.amenities.map((amenity, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-600 dark:text-gray-300">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <AppButton fullWidth size="sm">
                Reservar
              </AppButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
