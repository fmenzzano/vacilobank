'use client';

import React from 'react';

interface VaciloCardProps {
  vacilo: string;
}

export default function VaciloCard({ vacilo }: VaciloCardProps) {
  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Vacilo do Mês</h2>
          <p className="text-gray-700">{vacilo}</p>
        </div>
      </div>
    </div>
  );
} 