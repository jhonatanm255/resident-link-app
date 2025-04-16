
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Llamamos a esto para habilitar componentes web nativos de Capacitor
// como para la cámara nativa, etc.
defineCustomElements(window);

// Agregar manejo de gestos táctiles específicos para móviles
document.addEventListener('touchstart', function() {}, {passive: true});

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
