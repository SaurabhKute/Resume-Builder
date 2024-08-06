export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  tokens: {
    access: {
      token: string;
    };
    refresh: {
      token: string;
    };
  };
  user: User;
}

export interface AuthError {
  message: string;
}
