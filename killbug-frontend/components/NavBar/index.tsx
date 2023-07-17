import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { navs } from './config';
import { Button, Dropdown, Avatar, Menu, Image } from 'antd';
import Login from 'components/Login';
import { useStore } from 'store';
import {
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { logout } from '../../api/auth';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';

const NavBar: NextPage = () => {
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;
  const { pathname, push } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);
  // const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  // const handleMobileMenuVisibleChange = (visible: boolean) => {
  //   setIsMobileMenuVisible(visible);
  // };

  const router = useRouter();

  const handleGotoEditorPage = () => {
    if (userId) {
      push('/edit/new');
    } else {
      message.warning('Please Login first!');
    }
  };

  const handleLogin = () => {
    setIsShowLogin(true);
  };

  const handleClose = () => {
    setIsShowLogin(false);
  };

  const handleGotoMySpace = () => {
    push(`/user/${userId}`);
  };

  const handleLogout = () => {
    logout().then((res: any) => {
      store.user.setUserInfo({});
      Cookies.remove('user');
      router.push('/');
      console.log(res);
    });
  };

  const handleGotoChat = () => {
    push('/user/chat');
  };

  const renderDropDownMenu = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleGotoMySpace}>
          <HomeOutlined />
          &nbsp; My Space
        </Menu.Item>
        <Menu.Item onClick={handleGotoChat}>
          <MessageOutlined />
          &nbsp; Message
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          <LogoutOutlined />
          &nbsp; Logout
        </Menu.Item>
      </Menu>
    );
  };

  const renderMobileMenu = () => {
    return (
      <Menu>
        {navs?.map((nav) => (
          <Menu.Item key={nav?.label}>
            <Link key={nav?.label} href={nav?.value} legacyBehavior>
              <a className={pathname === nav?.value ? styles.active : ''}>
                {nav?.label}
              </a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div className={styles.navbar}>
      <section
        style={{ cursor: 'pointer', marginRight: '40px', marginBottom: '5px' }}
        onClick={() => {
          router.push('/');
        }}>
        <Image
          height={'60px'}
          preview={false}
          src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/killbug-logo2.png"></Image>
      </section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav?.label} href={nav?.value} legacyBehavior>
            <a className={pathname === nav?.value ? styles.active : ''}>
              {nav?.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>Post</Button>
        {userId ? (
          <>
            <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
              <Avatar style={{ cursor: 'pointer' }} src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        )}
        <Dropdown overlay={renderMobileMenu()} placement="bottomLeft">
          <MenuOutlined className={styles.mobileMenuIcon} />
        </Dropdown>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default observer(NavBar);
