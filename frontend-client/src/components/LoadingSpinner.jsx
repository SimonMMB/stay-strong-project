// src/components/LoadingSpinner.jsx
const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
    const sizeClasses = {
      small: 'w-4 h-4',
      medium: 'w-8 h-8',
      large: 'w-12 h-12'
    };
  
    const spinner = (
      <div className="flex justify-center items-center">
        <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
      </div>
    );
  
    if (fullScreen) {
      return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
          {spinner}
        </div>
      );
    }
  
    return spinner;
  };
  
  export default LoadingSpinner;