import { ChangeEvent, useState } from 'react';
import styles from './index.module.scss';
import { login, register } from '../../api/auth';
import { useStore } from 'store/index';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react-lite';
import { Tabs, message } from 'antd';
import {
  LikeOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  UnorderedListOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  const store = useStore();
  const { isShow = false, onClose } = props;
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    repassword: '',
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    onClose();
  };
  const handleLogin = async () => {
    const username = form.username;
    const password = form.password;
    if (!username) {
      message.error('Username cannot be null!');
      return;
    }
    if (!password) {
      message.error('Password cannot be null!');
      return;
    }
    login({ username, password }).then((res: any) => {
      store.user.setUserInfo(res);
      Cookies.set('user', JSON.stringify(res), { expires: 1 });
      // localStorage.setItem('user', JSON.stringify(res))
      window.location.reload();
    });
    handleClose();
  };

  const handleRegister = () => {
    const username = registerForm.username;
    const password = registerForm.password;
    const repassword = registerForm.repassword;
    if (!username) {
      message.error('Username cannot be null!');
      return;
    }
    if (!password || !repassword) {
      message.error('Password cannot be null!');
      return;
    }
    if (password != repassword) {
      message.error('Two entered passwords do not match!');
    }
    register({ username, password, repassword }).then((res: any) => {
      setIsLogin(true);
      setForm({
        username,
        password,
      });
      setRegisterForm({
        username: '',
        password: '',
        repassword: '',
      });
      message.success('Register successfully!');
    });
  };

  const handleOAuthGithub = () => {};
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleRegisterFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const handleTabChange = (e: number) => {
    setIsLogin(e == 0 ? true : false);
  };

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        {/* <div className={styles.close} >
          <div onClick={handleClose} className={styles.closeBtn}>×</div>
        </div> */}
        <span
          onClick={handleClose}
          style={{
            cursor: 'pointer',
            position: 'relative',
            left: '270px',
          }}>
          ×
        </span>
        <Tabs
          className={styles.tabs}
          defaultActiveKey="0"
          activeKey={isLogin ? '0' : '1'}
          onChange={handleTabChange}
          items={[{}, {}].map((Icon, i) => {
            const id = String(i);
            return {
              label: <span>{id === '0' ? 'Login' : 'Register'}</span>,
              key: id,
              children: isLogin ? (
                <div>
                  <div>
                    <input
                      name="username"
                      type="text"
                      placeholder="Please enter your username"
                      value={form.username}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      type="password"
                      placeholder="Please enter your password"
                      value={form.password}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className={styles.loginBtn} onClick={handleLogin}>
                    Login
                  </div>
                  <div
                    className={styles.otherLogin}
                    onClick={handleOAuthGithub}>
                    Login by Github
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <input
                      name="username"
                      type="text"
                      placeholder="Please enter your username"
                      value={registerForm.username}
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      type="password"
                      placeholder="Please enter your password"
                      value={registerForm.password}
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <div>
                    <input
                      name="repassword"
                      type="password"
                      placeholder="Please enter your password again"
                      value={registerForm.repassword}
                      onChange={handleRegisterFormChange}
                    />
                  </div>
                  <div className={styles.loginBtn} onClick={handleRegister}>
                    Register
                  </div>
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  ) : null;
};

export default observer(Login);
