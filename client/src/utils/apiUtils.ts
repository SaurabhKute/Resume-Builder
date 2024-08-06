import { toast } from 'react-hot-toast';
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';
import { AxiosError } from 'axios';

interface HandleActionParams<T> {
  dispatch: Dispatch<AnyAction>;
  action: (data: T) => Promise<any>;
  data: T;
  successMessage: string;
  errorMessage: string;
  loadingMessage: string;
  successCallback?: () => void;
}

export const handleAction = async <T>({
  dispatch,
  action,
  data,
  successMessage,
  errorMessage,
  loadingMessage,
  successCallback,
}: HandleActionParams<T>) => {
  try {
    toast.promise(
      action(data),
      {
        loading: loadingMessage,
        success: successMessage,
        error: errorMessage,
      }
    ).then(() => {
      if (successCallback) {
        successCallback();
      }
    });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(error.response.data.message || 'An unknown error occurred');
    } else {
      toast.error('An unknown error occurred');
    }
  }
};
