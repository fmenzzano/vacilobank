'use client';

import React from 'react';

interface DiagnosticoTextoProps {
  texto: string;
}

export default function DiagnosticoTexto({ texto }: DiagnosticoTextoProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Diagnóstico</h2>
      <p className="text-gray-700 leading-relaxed">
        {texto}
      </p>
    </div>
  );
} 