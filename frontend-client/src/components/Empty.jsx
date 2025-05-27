// src/components/Empty.jsx
const Empty = ({ message = 'No hay datos disponibles', icon, action }) => {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg">
        {icon || (
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        )}
        <p className="text-gray-600 mb-4">{message}</p>
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
    );
  };
  
  export default Empty;