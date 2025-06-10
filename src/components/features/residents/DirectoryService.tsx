
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { Search, Phone, Mail, MapPin, User, Building, Clock } from 'lucide-react';

export const DirectoryService = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'residents', label: 'Residentes' },
    { id: 'administration', label: 'Administración' },
    { id: 'services', label: 'Servicios' },
    { id: 'emergency', label: 'Emergencias' }
  ];

  const contacts = [
    {
      id: 1,
      name: 'Administración General',
      phone: '+56 2 1234 5678',
      email: 'admin@condominio.cl',
      address: 'Oficina 101',
      category: 'administration',
      hours: 'Lun-Vie 9:00-18:00'
    },
    {
      id: 2,
      name: 'Conserjerías',
      phone: '+56 2 1234 5679',
      email: 'conserjeria@condominio.cl',
      address: 'Recepción Principal',
      category: 'services',
      hours: '24/7'
    },
    {
      id: 3,
      name: 'Seguridad',
      phone: '+56 2 1234 5680',
      email: 'seguridad@condominio.cl',
      address: 'Garita Principal',
      category: 'emergency',
      hours: '24/7'
    },
    {
      id: 4,
      name: 'Mantenimiento',
      phone: '+56 2 1234 5681',
      email: 'mantenimiento@condominio.cl',
      address: 'Bodega -1',
      category: 'services',
      hours: 'Lun-Vie 8:00-17:00'
    },
    {
      id: 5,
      name: 'María González',
      phone: '+56 9 8765 4321',
      email: 'maria.gonzalez@email.com',
      address: 'Apto 302',
      category: 'residents',
      hours: 'Residente'
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'administration': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200';
      case 'services': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200';
      case 'emergency': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200';
      case 'residents': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border border-border transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-6 text-foreground transition-colors duration-300">Directorio de Contactos</h2>
      
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground transition-colors duration-300" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300"
            placeholder="Buscar contacto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 bg-background/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground transition-colors duration-300">{contact.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(contact.category)} transition-colors duration-300`}>
                    {categories.find(cat => cat.id === contact.category)?.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground transition-colors duration-300">
                <Phone className="h-4 w-4" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground transition-colors duration-300">
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground transition-colors duration-300">
                <MapPin className="h-4 w-4" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground transition-colors duration-300">
                <Clock className="h-4 w-4" />
                <span>{contact.hours}</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <AppButton 
                size="sm" 
                variant="outline"
                leftIcon={<Phone size={16} />}
                className="transition-all duration-300"
              >
                Llamar
              </AppButton>
              <AppButton 
                size="sm" 
                variant="outline"
                leftIcon={<Mail size={16} />}
                className="transition-all duration-300"
              >
                Email
              </AppButton>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 transition-colors duration-300" />
          <h3 className="text-lg font-medium text-foreground mb-2 transition-colors duration-300">No se encontraron contactos</h3>
          <p className="text-muted-foreground transition-colors duration-300">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};
