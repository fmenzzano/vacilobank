import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">VaciloBank</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/#como-funciona" className="text-gray-600 hover:text-gray-900 font-medium">
              Como funciona
            </Link>
            <Link href="/#planos" className="text-gray-600 hover:text-gray-900 font-medium">
              Planos
            </Link>
            <Link href="/#privacidade" className="text-gray-600 hover:text-gray-900 font-medium">
              Privacidade
            </Link>
          </nav>
          
          <div className="flex items-center">
            <Link 
              href="/upload" 
              className="ml-4 px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Começar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 