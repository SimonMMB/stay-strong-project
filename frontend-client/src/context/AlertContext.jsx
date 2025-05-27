// src/context/AlertContext.jsx
import { createContext, useState, useContext } from 'react';
import Alert from '../components/Alert';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type, duration }]);
    return id;
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
  };

  // Funciones útiles para tipos específicos de alertas
  const showSuccess = (message, duration) => addAlert(message, 'success', duration);
  const showError = (message, duration) => addAlert(message, 'error', duration);
  const showInfo = (message, duration) => addAlert(message, 'info', duration);
  const showWarning = (message, duration) => addAlert(message, 'warning', duration);

  const value = {
    addAlert,
    removeAlert,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };

  return (
    <AlertContext.Provider value={value}>
      {/* Renderizar alertas actuales */}
      <div className="fixed top-4 right-4 z-50 w-80 space-y-2">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            duration={alert.duration}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
      {children}
    </AlertContext.Provider>
  );
};