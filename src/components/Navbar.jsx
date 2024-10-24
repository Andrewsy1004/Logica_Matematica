
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sticky top-0 bg-white dark:bg-gray-800 shadow-md z-50">
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold">
                    Matematicas discretas
                </div>

                {/* Icono para el menú en móvil */}
                <div className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>

                {/* Menú que se muestra solo en pantallas grandes */}
                <ul className={`hidden md:flex md:space-x-4`}>
                    <li><a href="#intro" className="hover:text-blue-200 transition duration-300">Introducción</a></li>
                    <li><a href="#simulation" className="hover:text-blue-200 transition duration-300">Simulación</a></li>
                </ul>

                {/* Menú desplegable que se muestra solo en móvil cuando está abierto */}
                {isOpen && (
                    <ul className="flex flex-col space-y-4 absolute top-16 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-700 p-4 md:hidden">
                        <li><a href="#intro" onClick={toggleMenu} className="hover:text-blue-200 transition duration-300">Introducción</a></li>
                        <li><a href="#simulation" onClick={toggleMenu} className="hover:text-blue-200 transition duration-300">Simulación</a></li>
                    </ul>
                )}
            </div>
        </nav>
    );
};