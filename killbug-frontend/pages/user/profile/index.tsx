import type { NextPage } from 'next';
import styles from './index.module.scss';
import {
  Col,
  Row,
  Avatar,
  Input,
  Card,
  Upload,
  Button,
  Form,
  Divider,
  Menu,
  message,
  Modal,
} from 'antd';
import {
  ProfileOutlined,
  SettingOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import type { MenuProps } from 'antd/es/menu';
import { useState, useEffect } from 'react';
import OSS from 'ali-oss';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import cookie from 'cookie';
import {
  changeAccountSetting,
  getCurrentUser,
  updateUserProfile,
} from 'api/user';
import { useStore } from 'store';
import { logout } from 'api/auth';

type MenuItem = Required<MenuProps>['items'][number];

const { confirm } = Modal;

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items: MenuItem[] = [
  getItem('Personal Profile', '0', <ProfileOutlined />),
  getItem('Account Setting', '1', <SettingOutlined />),
];

const validateMessages = {
  required: '${label} is required!',
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const client = new OSS({
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: 'kill-bug',
});

const Profile: NextPage = ({ data, error }) => {
  console.log('cookie', Cookies.get('user'));

  const store = useStore();
  const { userId } = store.user.userInfo;
  const router = useRouter();
  const [user, setUser] = useState(data);
  const [current, setCurrent] = useState(0);
  const [avatar, setAvatar] = useState(data.avatar);

  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const [oldPhone, setOldPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [displayPhoneInput, setDisplayPhoneInput] = useState(false);
  const [displayEmailInput, setDisplayEmailInput] = useState(false);
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);

  useEffect(() => {
    if (error) {
      message.error(error);
      Cookies.remove('user');
      router.push('/');
      return;
    }
    const u = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    if (!u) {
      message.warning('Please login first!');
      router.push('/');
    }
  }, []);

  const props = {
    name: 'file',
    action: '',
    customRequest: async ({ onSuccess, onError, file }) => {
      try {
        const result = await client.put(file.name, file);
        const url = client.generateObjectUrl(result.name);
        onSuccess(url, file);
        user.avatar = url;
        console.log(url);
        setAvatar(url);
        setUser(user);
      } catch (e) {
        onError(e);
      }
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 头像上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 头像上传失败`);
      }
    },
  };

  const changeCurrent = (e: any) => {
    const { key } = e;
    if (key != current) {
      setCurrent(1 - current);
    }
  };

  const handleFormSubmit = (values) => {
    const form = {
      userId: user.userId,
      nickname: values.nickname,
      position: values.position,
      company: values.company,
      website: values.website,
      introduction: values.introduction,
      avatar: avatar,
    };
    updateUserProfile(form).then(() => {
      message.success('Update successfully!');
      store.user.setUserInfo({
        ...store.user.userInfo,
        avatar: avatar,
        nickname: values.nickname,
      });
      let user = JSON.parse(Cookies.get('user'))
      user.avatar = avatar
      user.nickname = values.nickname
      Cookies.set('user', JSON.stringify(user));
    });
  };

  const handleChangeClick = (type) => {
    if (type === 0) {
      setDisplayPhoneInput(!displayPhoneInput);
    } else if (type === 1) {
      setDisplayEmailInput(!displayEmailInput);
    } else if (type == 2) {
      setDisplayPasswordInput(!displayPasswordInput);
    }
  };

  const handleConfirmClick = (type) => {
    if (!userId) {
      message.warning('Please login first!');
      return;
    }
    if (type === 0 && (!oldPhone || !newPhone)) {
      message.error('Phone number cannot be null!');
      return;
    }
    if (type === 1 && (!oldEmail || !newEmail)) {
      message.error('Email address cannot be null!');
      return;
    }
    if (type === 2 && (!oldPassword || !newPassword)) {
      message.error('Password cannot be null!');
      return;
    }
    const phoneReg = /^((\+65)|(65)|0)?[689]\d{7}$/;
    const emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (type === 0 && !phoneReg.test(newPhone)) {
      message.error('Phone number format is incorrect!');
      return;
    }
    if (type === 1 && !emailReg.test(newEmail)) {
      message.error('Phone number format is incorrect!');
      return;
    }
    confirm({
      title: 'Do you want to change?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleConfirm(type);
      },
    });
  };

  const handleConfirm = (type) => {
    if (type === 0) {
      console.log(oldPhone);
      console.log(newPhone);
      const data = {
        type: 0,
        oldPhone: oldPhone,
        newPhone: newPhone,
      };
      changeAccountSetting(data).then((res) => {
        console.log(res);
        setPhone(res);
        setDisplayPhoneInput(false);
        setOldPhone('');
        setNewPhone('');
        message.success('Change successfully!');
      });
    } else if (type === 1) {
      console.log(oldEmail);
      console.log(newEmail);
      const data = {
        type: 1,
        oldEmail: oldEmail,
        newEmail: newEmail,
      };
      changeAccountSetting(data).then((res) => {
        console.log(res);
        setEmail(res);
        setDisplayEmailInput(false);
        setOldEmail('');
        setNewEmail('');
        message.success('Change successfully!');
      });
    } else if (type === 2) {
      console.log(oldPassword);
      console.log(newPassword);
      const data = {
        type: 2,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      changeAccountSetting(data).then((res) => {
        setDisplayPasswordInput(false);
        setOldPassword('');
        setNewPassword('');
        message.success('Change successfully!');
        logout().then((res: any) => {
          store.user.setUserInfo({});
          Cookies.remove('user');
          router.push('/');
          console.log(res);
        });
      });
    }
  };

  return (
    <div style={{ padding: '20px 150px', marginTop: '60px' }}>
      <Row justify="center" align="top" gutter={20}>
        <Col span={5}>
          <div className={styles.menuBox}>
            <Menu
              onClick={changeCurrent}
              style={{ width: '100%' }}
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['sub1']}
              theme="light"
              items={items}
            />
          </div>
        </Col>
        <Col span={19}>
          {current === 0 ? (
            <Card
              title={`Personal Profile - Username - ${user.username}`}
              style={{ width: '100%', borderRadius: '6px' }}>
              <Row justify="center" align="top" gutter={20}>
                <Col span={17}>
                  <Form
                    onFinish={handleFormSubmit}
                    initialValues={user}
                    {...layout}
                    name="nest-messages"
                    validateMessages={validateMessages}>
                    <Form.Item
                      name={'nickname'}
                      label="Nickname"
                      rules={[{ required: true }]}>
                      <Input value={user.nickname} showCount maxLength={20} />
                    </Form.Item>
                    <Form.Item name={'position'} label="Position">
                      <Input value={user.position} showCount maxLength={20} />
                    </Form.Item>
                    <Form.Item name={'company'} label="Company">
                      <Input value={user.company} showCount maxLength={30} />
                    </Form.Item>
                    <Form.Item name={'website'} label="Website">
                      <Input value={user.website} showCount maxLength={50} />
                    </Form.Item>
                    <Form.Item name={'introduction'} label="Introduction">
                      <Input.TextArea
                        value={user.introduction}
                        showCount
                        maxLength={100}
                      />
                    </Form.Item>
                    <Divider></Divider>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={7}>
                  <Upload {...props} showUploadList={false}>
                    <Avatar
                      src={avatar}
                      size={100}
                      style={{
                        display: 'flex',
                        marginLeft: '50px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    />
                  </Upload>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '5px',
                    }}>
                    My Avatar
                  </div>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card
              title="Account Setting"
              style={{ width: '100%', borderRadius: '6px' }}>
              <div className={styles.account}>
                <div className={styles.accountItem}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '130px' }}>Phone</div>
                    <div style={{ color: '#8b919e' }}>{phone}</div>
                  </div>
                  <div
                    onClick={() => handleChangeClick(0)}
                    style={{
                      fontSize: '13px',
                      color: '#408ff7',
                      cursor: 'pointer',
                    }}>
                    {displayPhoneInput ? 'Cancel Change' : 'Change'}
                  </div>
                </div>
                {displayPhoneInput && (
                  <div
                    style={{ marginTop: '10px' }}
                    className={styles.accountItem}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Input
                        placeholder="Enter your old phone number"
                        value={oldPhone}
                        onChange={(e) => setOldPhone(e.target.value)}
                        style={{
                          position: 'relative',
                          left: '130px',
                          width: '270px',
                        }}></Input>
                      <Input
                        placeholder="Enter your new phone number"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        style={{
                          position: 'relative',
                          left: '130px',
                          width: '270px',
                          marginTop: '10px',
                        }}></Input>
                    </div>
                    <div
                      onClick={() => handleConfirmClick(0)}
                      style={{
                        marginTop: '55px',
                        fontSize: '13px',
                        color: '#408ff7',
                        cursor: 'pointer',
                      }}>
                      {'Confirm'}
                    </div>
                  </div>
                )}
                <Divider></Divider>
                <div className={styles.accountItem}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '130px' }}>Email</div>
                    <div style={{ color: '#8b919e' }}>{email}</div>
                  </div>
                  <div
                    onClick={() => handleChangeClick(1)}
                    style={{
                      fontSize: '13px',
                      color: '#408ff7',
                      cursor: 'pointer',
                    }}>
                    {displayEmailInput ? 'Cancel Change' : 'Change'}
                  </div>
                </div>
                {displayEmailInput && (
                  <div
                    style={{ marginTop: '10px' }}
                    className={styles.accountItem}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Input
                        placeholder="Enter your old email address"
                        value={oldEmail}
                        onChange={(e) => setOldEmail(e.target.value)}
                        style={{
                          position: 'relative',
                          left: '130px',
                          width: '270px',
                        }}></Input>
                      <Input
                        placeholder="Enter your new email address"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        style={{
                          position: 'relative',
                          left: '130px',
                          width: '270px',
                          marginTop: '10px',
                        }}></Input>
                    </div>
                    <div
                      onClick={() => handleConfirmClick(1)}
                      style={{
                        marginTop: '55px',
                        fontSize: '13px',
                        color: '#408ff7',
                        cursor: 'pointer',
                      }}>
                      {'Confirm'}
                    </div>
                  </div>
                )}
                <Divider></Divider>
                <div className={styles.accountItem}>
                  <div>
                    <span>Password</span>
                  </div>
                  <div
                    onClick={() => handleChangeClick(2)}
                    style={{
                      fontSize: '13px',
                      color: '#408ff7',
                      cursor: 'pointer',
                    }}>
                    {displayPasswordInput ? 'Cancel Change' : 'Change'}
                  </div>
                </div>
                {displayPasswordInput && (
                  <div
                    style={{ marginTop: '10px' }}
                    className={styles.accountItem}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Input
                        placeholder="Enter your old password"
                        value={oldPassword}
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        style={{
                          position: 'relative',
                          left: '130px',
                          width: '270px',
                        }}></Input>
                      <Input
                        placeholder="Enter your new password"
                        value={newPassword}
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          position: 'relative',
                          left: '130px',
                          width: '270px',
                          marginTop: '10px',
                        }}></Input>
                    </div>
                    <div
                      onClick={() => handleConfirmClick(2)}
                      style={{
                        marginTop: '55px',
                        fontSize: '13px',
                        color: '#408ff7',
                        cursor: 'pointer',
                      }}>
                      {'Confirm'}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = ctx.req.headers.cookie;
    let parsedCookies = {};
    let userinfo = {};
    let data = {};
    if (cookies) {
      parsedCookies = cookie.parse(cookies);
      userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
      if (userinfo) {
        data = await getCurrentUser(userinfo.token);
      }
    }
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: error.msg,
      },
    };
  }
};

export default observer(Profile);
