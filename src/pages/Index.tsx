
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Building2, Users, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { currentUser } = useAuth();

  const sections = [
    {
      id: "admin",
      title: "Administración",
      description: "Gestión completa de condominios, apartamentos y reportes administrativos",
      icon: Building2,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      features: [
        "Gestión de condominios",
        "Administración de apartamentos", 
        "Reportes y estadísticas",
        "Panel de control"
      ],
      route: "/admin"
    },
    {
      id: "residents",
      title: "Residentes",
      description: "Portal para residentes con acceso a información y servicios del condominio",
      icon: Users,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      features: [
        "Información del condominio",
        "Solicitudes y reportes",
        "Comunicados",
        "Servicios"
      ],
      route: "/residents"
    },
    {
      id: "concierge",
      title: "Conserjes",
      description: "Herramientas para conserjes para gestionar turnos extras y tareas diarias",
      icon: Shield,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      features: [
        "Gestión de turnos extras",
        "Registro de actividades",
        "Reportes de turno",
        "Comunicación"
      ],
      route: "/concierge"
    }
  ];

  return (
    <AppLayout title="ResidentLink">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenido a ResidentLink
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Sistema integral de gestión para condominios
          </p>
          <p className="text-gray-500">
            Usuario: {currentUser?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`${section.color} p-6 text-white`}>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white bg-opacity-20 p-4 rounded-full">
                    <section.icon className="h-8 w-8" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">
                  {section.title}
                </h2>
                <p className="text-center text-white text-opacity-90">
                  {section.description}
                </p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {section.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={section.route}>
                  <AppButton 
                    fullWidth
                    className={`${section.color} ${section.hoverColor} text-white`}
                  >
                    Acceder a {section.title}
                  </AppButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-gray-600 mb-6">
            Consulta nuestra documentación o contacta con soporte técnico
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppButton variant="outline">
              Ver Documentación
            </AppButton>
            <AppButton variant="outline">
              Contactar Soporte
            </AppButton>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
