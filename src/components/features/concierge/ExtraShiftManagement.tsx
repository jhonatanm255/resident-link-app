
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { Plus, Calendar, Clock, MapPin, DollarSign, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExtraShift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  condominium: string;
  hours: number;
  hourlyRate: number;
  total: number;
  description: string;
  status: 'pending' | 'approved' | 'paid';
}

export const ExtraShiftManagement = () => {
  const [shifts, setShifts] = useState<ExtraShift[]>([
    {
      id: '1',
      date: '2024-01-15',
      startTime: '18:00',
      endTime: '22:00',
      condominium: 'Condominio Las Flores',
      hours: 4,
      hourlyRate: 5000,
      total: 20000,
      description: 'Turno extra por evento especial',
      status: 'approved'
    },
    {
      id: '2',
      date: '2024-01-20',
      startTime: '08:00',
      endTime: '16:00',
      condominium: 'Torres del Sol',
      hours: 8,
      hourlyRate: 5000,
      total: 40000,
      description: 'Reemplazo por enfermedad de colega',
      status: 'pending'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<ExtraShift | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    condominium: '',
    hourlyRate: 5000,
    description: ''
  });

  const calculateHours = (start: string, end: string) => {
    const startTime = new Date(`2000-01-01 ${start}`);
    const endTime = new Date(`2000-01-01 ${end}`);
    return (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hours = calculateHours(formData.startTime, formData.endTime);
    const total = hours * formData.hourlyRate;

    const newShift: ExtraShift = {
      id: editingShift?.id || Date.now().toString(),
      ...formData,
      hours,
      total,
      status: 'pending'
    };

    if (editingShift) {
      setShifts(shifts.map(shift => shift.id === editingShift.id ? newShift : shift));
    } else {
      setShifts([...shifts, newShift]);
    }

    setIsDialogOpen(false);
    setEditingShift(null);
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      condominium: '',
      hourlyRate: 5000,
      description: ''
    });
  };

  const handleEdit = (shift: ExtraShift) => {
    setEditingShift(shift);
    setFormData({
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      condominium: shift.condominium,
      hourlyRate: shift.hourlyRate,
      description: shift.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'paid': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
  };

  const totalPending = shifts.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.total, 0);
  const totalApproved = shifts.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Gestión de Turnos Extras</h2>
          <p className="text-muted-foreground mt-1">Registra y gestiona tus turnos adicionales</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <AppButton leftIcon={<Plus size={18} />}>
              Nuevo Turno
            </AppButton>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingShift ? 'Editar Turno' : 'Registrar Nuevo Turno'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Hora Inicio</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Hora Fin</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="condominium">Condominio</Label>
                <Input
                  id="condominium"
                  value={formData.condominium}
                  onChange={(e) => setFormData({...formData, condominium: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Tarifa por Hora ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({...formData, hourlyRate: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Motivo del turno extra..."
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <AppButton type="submit" className="flex-1">
                  {editingShift ? 'Actualizar' : 'Registrar'}
                </AppButton>
                <AppButton 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </AppButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-accent/50 p-4 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-foreground">Pendientes</span>
          </div>
          <p className="text-2xl font-bold text-foreground">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-accent/50 p-4 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-foreground">Aprobados</span>
          </div>
          <p className="text-2xl font-bold text-foreground">${totalApproved.toLocaleString()}</p>
        </div>
        <div className="bg-accent/50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-foreground">Total Turnos</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{shifts.length}</p>
        </div>
      </div>

      {/* Lista de turnos */}
      <div className="space-y-4">
        {shifts.map((shift) => (
          <div key={shift.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium text-foreground">{shift.date}</span>
                  <Clock className="h-4 w-4 ml-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{shift.startTime} - {shift.endTime}</span>
                  <span className="ml-2 text-sm text-muted-foreground">({shift.hours}h)</span>
                </div>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{shift.condominium}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{shift.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shift.status)}`}>
                    {shift.status === 'pending' ? 'Pendiente' : 
                     shift.status === 'approved' ? 'Aprobado' : 'Pagado'}
                  </span>
                  <span className="text-lg font-bold text-foreground">${shift.total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(shift)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(shift.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
