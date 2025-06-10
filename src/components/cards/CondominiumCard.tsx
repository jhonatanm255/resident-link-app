
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
    <div className="bg-card rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-all duration-300 border border-border">
      <div className="flex items-start justify-between">
        <Link to={`/condominiums/${condominium.id}`} className="flex items-center flex-1">
          <div className="bg-primary/10 p-3 rounded-full mr-4 transition-colors duration-300">
            <Building2 className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground transition-colors duration-300">
              {condominium.name}
            </h3>
            <p className="text-sm text-muted-foreground transition-colors duration-300">
              {condominium.address}
            </p>
            <div className="mt-1 text-sm text-primary transition-colors duration-300">
              {condominium.apartments.length} {condominium.apartments.length === 1 ? 'Apartamento' : 'Apartamentos'}
            </div>
          </div>
        </Link>
        
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full hover:bg-accent transition-colors duration-200">
                <MoreVertical className="text-muted-foreground" size={20} />
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
            <ChevronRight className="text-muted-foreground ml-2 transition-colors duration-300" size={20} />
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
