// src/components/ConfirmDialog.jsx
import { useEffect, useRef } from 'react';

const ConfirmDialog = ({ 
  isOpen,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger'
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    // Enfocar el botón cancelar cuando se abre el diálogo
    if (isOpen && dialogRef.current) {
      const cancelButton = dialogRef.current.querySelector('button:last-child');
      if (cancelButton) cancelButton.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const buttonClasses = {
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-blue-500 hover:bg-blue-600'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div 
        ref={dialogRef}
        className="bg-white rounded-lg max-w-md w-full shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="p-6">
          <h3 id="dialog-title" className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              className={`px-4 py-2 rounded text-white ${buttonClasses[type]}`}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </button>
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;