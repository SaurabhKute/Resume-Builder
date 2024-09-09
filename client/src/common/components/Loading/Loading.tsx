import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingProps {
  isLoading: boolean;
  loadingText?: string;
  stopLoadingText?: string;
  loadingDelay?: number;
  autoStopAfter?: number; // in milliseconds
  onLoadingChange?: (isLoading: boolean) => void;
}

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  loadingText ,
  stopLoadingText ,
  loadingDelay,
  autoStopAfter,
  onLoadingChange,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isLoading && autoStopAfter) {
      timerRef.current = setTimeout(() => {
        if (onLoadingChange) {
          onLoadingChange(false);
        }
      }, autoStopAfter);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [isLoading, autoStopAfter, onLoadingChange]);

  const handleClickLoading = () => {
    if (onLoadingChange) {
      onLoadingChange(!isLoading);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'350px' }}>
      <Box sx={{ height: 40 }}>
        <Fade
          in={isLoading}
          style={{
            transitionDelay: isLoading ? `${loadingDelay}ms` : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Box>
      <Button onClick={handleClickLoading} sx={{ m: 2 }}>
        {isLoading ? stopLoadingText : loadingText}
      </Button>
    </Box>
  );
}

export default Loading;
