
import React from "react";
import { Apartment } from "@/types";
import { HomeIcon, ChevronRight, Car, Package } from "lucide-react";
import { Link } from "react-router-dom";

interface ApartmentCardProps {
  apartment: Apartment;
  condominiumId: string;
}

export const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, condominiumId }) => {
  return (
    <Link to={`/condominiums/${condominiumId}/apartments/${apartment.id}`}>
      <div className="bg-white rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-primary-50 p-3 rounded-full mr-4">
              <HomeIcon className="text-primary-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Apartamento {apartment.apartmentNumber}</h3>
              <div className="mt-1 space-y-1">
                {apartment.residents.length > 0 ? (
                  <p className="text-sm text-gray-600">
                    Residentes: {apartment.residents.map(r => r.name).join(", ")}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 italic">Sin residentes registrados</p>
                )}
                <div className="flex text-sm text-gray-600 space-x-4">
                  {apartment.parkingNumber && (
                    <div className="flex items-center">
                      <Car size={16} className="mr-1 text-gray-500" />
                      <span>Est. {apartment.parkingNumber}</span>
                    </div>
                  )}
                  {apartment.storageUnitNumber && (
                    <div className="flex items-center">
                      <Package size={16} className="mr-1 text-gray-500" />
                      <span>Bod. {apartment.storageUnitNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
      </div>
    </Link>
  );
};
