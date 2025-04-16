
import React from "react";
import { Condominium } from "@/types";
import { Building2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CondominiumCardProps {
  condominium: Condominium;
}

export const CondominiumCard: React.FC<CondominiumCardProps> = ({ condominium }) => {
  return (
    <Link to={`/condominiums/${condominium.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-shadow active:bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
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
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
      </div>
    </Link>
  );
};
