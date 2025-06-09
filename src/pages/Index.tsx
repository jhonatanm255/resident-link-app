
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Building2, Users, Shield, ArrowRight, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";

const Index = () => {
  const { currentUser } = useAuth();
  const { role, isAdmin, isCommittee, isConcierge, isResident } = useUserRole();

  const sections = [
    {
      id: "admin",
      title: "Administración",
      description: "Gestión completa de condominios, apartamentos y reportes administrativos",
      icon: Building2,
      color: "bg-blue-500 dark:bg-blue-600",
      hoverColor: "hover:bg-blue-600 dark:hover:bg-blue-700",
      features: [
        "Gestión de condominios",
        "Administración de apartamentos", 
        "Reportes y estadísticas",
        "Panel de control"
      ],
      route: "/admin",
      show: isAdmin
    },
    {
      id: "committee",
      title: "Comité Administrativo",
      description: "Supervisión y gestión administrativa del condominio",
      icon: UserCog,
      color: "bg-emerald-500 dark:bg-emerald-600",
      hoverColor: "hover:bg-emerald-600 dark:hover:bg-emerald-700",
      features: [
        "Gestión financiera",
        "Actas y reuniones",
        "Reportes estadísticos",
        "Configuración"
      ],
      route: "/committee",
      show: isCommittee || isAdmin
    },
    {
      id: "residents",
      title: "Residentes",
      description: "Portal para residentes con acceso a información y servicios del condominio",
      icon: Users,
      color: "bg-green-500 dark:bg-green-600",
      hoverColor: "hover:bg-green-600 dark:hover:bg-green-700",
      features: [
        "Información del condominio",
        "Solicitudes y reportes",
        "Comunicados",
        "Servicios"
      ],
      route: "/residents",
      show: isResident || isAdmin
    },
    {
      id: "concierge",
      title: "Conserjes",
      description: "Herramientas para conserjes para gestionar turnos extras y tareas diarias",
      icon: Shield,
      color: "bg-purple-500 dark:bg-purple-600",
      hoverColor: "hover:bg-purple-600 dark:hover:bg-purple-700",
      features: [
        "Gestión de turnos extras",
        "Registro de actividades",
        "Reportes de turno",
        "Comunicación"
      ],
      route: "/concierge",
      show: isConcierge || isAdmin
    }
  ];

  const visibleSections = sections.filter(section => section.show);

  return (
    <AppLayout title="ResidentLink">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
            Bienvenido a ResidentLink
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">
            Sistema integral de gestión para condominios
          </p>
          <p className="text-gray-500 dark:text-gray-500 transition-colors duration-300">
            Usuario: {currentUser?.email} | Rol: {role || 'No definido'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {visibleSections.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:shadow-gray-900/30"
            >
              <div className={`${section.color} p-6 text-white transition-colors duration-300`}>
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
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      <ArrowRight className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={section.route}>
                  <AppButton 
                    fullWidth
                    className={`${section.color} ${section.hoverColor} text-white transition-all duration-300`}
                  >
                    Acceder a {section.title}
                  </AppButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transition-colors duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
            Consulta nuestra documentación o contacta con soporte técnico
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppButton 
              variant="outline"
              onClick={() => window.open('https://docs.residentlink.com', '_blank')}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Ver Documentación
            </AppButton>
            <AppButton 
              variant="outline"
              onClick={() => window.open('mailto:soporte@residentlink.com?subject=Solicitud de Soporte&body=Describe tu consulta aquí...', '_blank')}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Contactar Soporte
            </AppButton>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <p>Documentación: Guías, tutoriales y mejores prácticas</p>
            <p>Soporte: soporte@residentlink.com | +56 2 1234 5678</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
