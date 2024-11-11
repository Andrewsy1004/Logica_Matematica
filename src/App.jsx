import { useState, useEffect } from 'react';
import { Navbar, Introduction, Footer, IntroductionLog, TablaLogica, Restricciones } from './components';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importar íconos de React Icons

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Manejar el modo oscuro en el montaje del componente
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen`}>
      <Navbar />

      <main>
        <Introduction />

        <div className='container mx-auto px-2 mt-20 mb-20'>
          <IntroductionLog />
        </div>

        {/* Sección de reglas y ejemplos */}        
        <div className="container mx-auto mb-12">
           <Restricciones />
        </div> 

        <div className='container mx-auto'>
          <TablaLogica />
        </div>
      </main>

      <Footer />

      {/* Botón para alternar entre modo claro y oscuro */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-500 dark:bg-yellow-500 text-white dark:text-black p-3 rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-yellow-600 transition duration-300"
        >
          {darkMode ? (
            <FaSun className="w-6 h-6" /> 
          ) : (
            <FaMoon className="w-6 h-6" /> 
          )}
        </button>
      </div>
      
    </div>
  );
};
