
import React, { useState } from "react";
import { Condominium } from "@/types";
import { Building2, ChevronRight, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteCondominiumDialog } from "@/components/dialogs/DeleteCondominiumDialog";

interface CondominiumCardProps {
  condominium: Condominium;
}

export const CondominiumCard: React.FC<CondominiumCardProps> = ({ condominium }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <Link to={`/condominiums/${condominium.id}`} className="flex items-center flex-1">
          <div className="bg-primary-100 p-3 rounded-full mr-4">
            <Building2 className="text-primary-700" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{condominium.name}</h3>
            <p className="text-sm text-gray-500">{condominium.address}</p>
            <div className="mt-1 text-sm text-primary-600">
              {condominium.apartments.length} {condominium.apartments.length === 1 ? 'Apartamento' : 'Apartamentos'}
            </div>
          </div>
        </Link>
        
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                <MoreVertical className="text-gray-500" size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={`/condominiums/${condominium.id}/edit`}>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to={`/condominiums/${condominium.id}`}>
            <ChevronRight className="text-gray-400 ml-2" size={20} />
          </Link>
        </div>
      </div>
      
      <DeleteCondominiumDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        condominiumId={condominium.id}
        condominiumName={condominium.name}
      />
    </div>
  );
};
