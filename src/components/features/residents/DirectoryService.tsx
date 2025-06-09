
import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const DirectoryService = () => {
  const contacts = [
    {
      id: '1',
      name: 'Administración',
      role: 'Administrador General',
      phone: '+56 9 1234 5678',
      email: 'admin@condominio.cl',
      schedule: 'Lun-Vie 9:00-18:00',
      location: 'Oficina 101'
    },
    {
      id: '2',
      name: 'Conserjería Turno Día',
      role: 'Conserje',
      phone: '+56 9 8765 4321',
      email: 'conserje.dia@condominio.cl',
      schedule: '24/7',
      location: 'Hall Principal'
    },
    {
      id: '3',
      name: 'Conserjería Turno Noche',
      role: 'Conserje',
      phone: '+56 9 5555 6666',
      email: 'conserje.noche@condominio.cl',
      schedule: '24/7',
      location: 'Hall Principal'
    },
    {
      id: '4',
      name: 'Servicios de Emergencia',
      role: 'Emergencias',
      phone: '133 (Bomberos), 131 (Ambulancia)',
      email: 'emergencias@ciudad.cl',
      schedule: '24/7',
      location: 'Servicios Públicos'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Directorio de Contactos</h2>
      
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="border dark:border-gray-600 rounded-lg p-4 transition-colors duration-300">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{contact.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{contact.role}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>{contact.phone}</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>{contact.email}</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>{contact.schedule}</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{contact.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
