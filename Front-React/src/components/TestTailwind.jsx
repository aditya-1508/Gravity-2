import React from 'react';

export default function TestTailwind() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        <svg className="h-12 w-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Tailwind is working!</div>
        <p className="text-gray-500">If you see this styled box, Tailwind CSS is configured correctly.</p>
      </div>
    </div>
  );
}
