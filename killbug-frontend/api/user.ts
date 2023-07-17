import request from '../util/request';

interface UserProfile {
  userId: string;
  nickname: string;
  position: string;
  company: string;
  website: string;
  introduction: string;
  avatar: string;
}

interface AccountSetting {
  type: number;
  oldPhone: string | '';
  newPhone: string | '';
  oldEmail: string | '';
  newEmail: string | '';
  oldPassword: string | ''; 
  newPassword: string | '';
}

export const renderUserSpace = (userId: number, token: string='') => {
  return request.get(`/user/renderUserSpace/${userId}`, {
    headers: { Authorization: token },
  });
};

export const getCurrentUser = (token: string) => {
  return request.get(`/user/getCurrentUser`, {
    headers: { Authorization: token },
  });
};

export const updateUserProfile = (data: UserProfile) => {
  console.log(data);
  return request.post(`/user/updateUserProfile`, data);
};

export const recharge = (dollar: number) => {
  return request.post(`/user/recharge/${dollar}`);
};

export const changeAccountSetting = (data: AccountSetting) => {
  return request.post('/user/changeAccountSetting', data)
}

export const getUserById = (id: string) => {
  return request.get(`/user/getUserById/${id}`)
}