import request from '../util/request';

interface LoginForm {
  username: string;
  password: string;
}

interface RegisterForm {
  username: string;
  password: string;
  repassword: string;
}

export const login = (data: LoginForm) => {
  return request.post('/auth/login', data);
};

export const logout = () => {
  return request.post('/auth/logout');
};

export const register = (data: RegisterForm) => {
  return request.post('/auth/register', data)
}
