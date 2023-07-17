import type { NextPage } from 'next';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import {
  UpCircleFilled
} from '@ant-design/icons';
import { BackTop } from 'antd';

const Layout: NextPage = ({ children }) => {

  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
      <BackTop>
        <UpCircleFilled style={{fontSize: '40px', color: '#448df8'}} />
      </BackTop>
    </div>
  );
};

export default Layout;
