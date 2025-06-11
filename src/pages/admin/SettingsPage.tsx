
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppButton } from '@/components/ui/app-button';
import { Save, Settings, Lock, Bell, Database, Mail, Shield } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const SettingsPage = () => {
  const { isAdmin } = useUserRole();
  const [settings, setSettings] = useState({
    general: {
      condominiumName: 'Edificio Residencial Central',
      timezone: 'America/Santiago',
      language: 'es',
      currency: 'CLP'
    },
    security: {
      requireStrongPasswords: true,
      sessionTimeout: 30,
      twoFactorAuth: false,
      loginAttempts: 3
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      emergencyAlerts: true
    },
    system: {
      backupFrequency: 'daily',
      dataRetention: 365,
      maintenanceMode: false,
      debugMode: false
    }
  });

  if (!isAdmin) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const handleSave = () => {
    console.log('Guardando configuración:', settings);
    // Aquí iría la lógica para guardar la configuración
  };

  return (
    <AppLayout title="Configuración del Sistema">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
            <p className="text-muted-foreground">Configura los parámetros generales de la aplicación</p>
          </div>
          <AppButton leftIcon={<Save size={18} />} onClick={handleSave}>
            Guardar Cambios
          </AppButton>
        </div>

        {/* Configuración General */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-foreground">Configuración General</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre del Condominio
                </label>
                <input
                  type="text"
                  value={settings.general.condominiumName}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, condominiumName: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Zona Horaria
                </label>
                <select
                  value={settings.general.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, timezone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="America/Santiago">América/Santiago</option>
                  <option value="America/Buenos_Aires">América/Buenos Aires</option>
                  <option value="America/Lima">América/Lima</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Idioma
                </label>
                <select
                  value={settings.general.language}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, language: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Moneda
                </label>
                <select
                  value={settings.general.currency}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, currency: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="CLP">Peso Chileno (CLP)</option>
                  <option value="USD">Dólar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de Seguridad */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <Lock className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-xl font-semibold text-foreground">Seguridad</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Contraseñas Seguras</h3>
                <p className="text-sm text-muted-foreground">Requiere contraseñas con al menos 8 caracteres, mayúsculas y números</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.requireStrongPasswords}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, requireStrongPasswords: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tiempo de Sesión (minutos)
                </label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Intentos de Login
                </label>
                <input
                  type="number"
                  value={settings.security.loginAttempts}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, loginAttempts: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de Notificaciones */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <Bell className="h-6 w-6 text-yellow-600 mr-3" />
              <h2 className="text-xl font-semibold text-foreground">Notificaciones</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { key: 'emailNotifications', label: 'Notificaciones por Email', description: 'Enviar notificaciones importantes por correo electrónico' },
              { key: 'smsNotifications', label: 'Notificaciones por SMS', description: 'Enviar notificaciones urgentes por mensaje de texto' },
              { key: 'pushNotifications', label: 'Notificaciones Push', description: 'Mostrar notificaciones en tiempo real en la aplicación' },
              { key: 'emergencyAlerts', label: 'Alertas de Emergencia', description: 'Activar sistema de alertas para situaciones de emergencia' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, [item.key]: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Configuración del Sistema */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <Database className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-foreground">Sistema</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Frecuencia de Respaldo
                </label>
                <select
                  value={settings.system.backupFrequency}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, backupFrequency: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Retención de Datos (días)
                </label>
                <input
                  type="number"
                  value={settings.system.dataRetention}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, dataRetention: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Modo Mantenimiento</h3>
                <p className="text-sm text-muted-foreground">Desactiva temporalmente el acceso para mantenimiento</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.maintenanceMode}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, maintenanceMode: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
