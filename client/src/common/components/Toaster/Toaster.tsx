import { Toaster, toast } from 'react-hot-toast';

const ToasterComponent = () => {
  return (
    <Toaster
      position="top-center"
      
      reverseOrder={false}
      toastOptions={{
        // Define default options
        duration: 4000,
        style: {
          background: '#fff',
          color: 'black',
          height:'40px',
        },
        // Custom options for specific types
        success: {
          duration: 3000,
          style: {
            background: '#fff',
            color: 'black',
          },
        },
        error: {
          duration: 3000,
          style: {
            background: '#fff',
            color: 'black',
          },
        },
      }}
    />
  );
};

export default ToasterComponent;
