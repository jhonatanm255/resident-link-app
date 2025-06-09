
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AppButton } from '@/components/ui/app-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calendar, Clock, User } from 'lucide-react';

interface NewVisitModalProps {
  onAddVisit: (visit: {
    visitorName: string;
    visitDate: string;
    visitTime: string;
    purpose: string;
  }) => void;
}

export const NewVisitModal: React.FC<NewVisitModalProps> = ({ onAddVisit }) => {
  const [open, setOpen] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitDate || !visitTime) return;

    onAddVisit({
      visitorName,
      visitDate,
      visitTime,
      purpose
    });

    // Reset form
    setVisitorName('');
    setVisitDate('');
    setVisitTime('');
    setPurpose('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AppButton leftIcon={<Plus size={18} />}>
          Nueva Visita
        </AppButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Visita</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visitorName">Nombre del Visitante</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="visitorName"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Ingrese el nombre del visitante"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitDate">Fecha de Visita</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="visitDate"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitTime">Hora de Visita</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="visitTime"
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Motivo de la Visita (Opcional)</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Ej: Visita familiar, técnico, delivery"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <AppButton 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancelar
            </AppButton>
            <AppButton type="submit">
              Registrar Visita
            </AppButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
