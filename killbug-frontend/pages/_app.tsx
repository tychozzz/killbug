import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'store/index';
import Layout from 'components/layout';
import cookie from 'cookie';
import { NextPage } from 'next';

interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  if (!ctx.req) {
    return {};
  }
  const cookies = ctx.req.headers.cookie;
  if(!cookies) {
    return {};
  }
  const parsedCookies = cookie.parse(cookies);

  // const  { userId, username, nickname, email, phone, sex, avatar, token } =
  //   parsedCookies.user ? JSON.parse(parsedCookies.user) : null;

  const userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
  return {
    initialValue: {
      user: {
        userInfo: {
          userId: userinfo ? userinfo.userId : null,
          username: userinfo ? userinfo.username : null,
          nickname: userinfo ? userinfo.nickname : null,
          email: userinfo ? userinfo.email : null,
          phone: userinfo ? userinfo.phone : null,
          sex: userinfo ? userinfo.sex : null,
          avatar: userinfo ? userinfo.avatar : null,
          token: userinfo ? userinfo.token : null,
        },
      },
    },
  };
};

export default MyApp;
