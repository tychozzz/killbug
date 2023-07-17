export type IUserInfo = {
  userId?: number | null,
  username?: string,
  nickname?: string,
  email?: string,
  phone?: string,
  sex?: string,
  avatar?: string,
  token?: string
};

export interface IUserStore {
  userInfo: IUserInfo;
  // eslint-disable-next-line no-unused-vars
  setUserInfo: (value: IUserInfo) => void;
}

const userStore = (): IUserStore => {
  return {
    userInfo: {},
    setUserInfo: function (value) {
      this.userInfo = value;
    },
  };
};

export default userStore;
