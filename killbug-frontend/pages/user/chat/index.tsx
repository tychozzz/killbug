import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import type { NextPage } from 'next';
import {
  Layout,
  Avatar,
  List,
  Divider,
  message,
  Row,
  Col,
  Image,
  Tabs,
} from 'antd';
import { UnorderedListOutlined, DollarCircleOutlined } from '@ant-design/icons';
import ChatWindow from 'components/ChatWindow';
import { getChatList, getChatRecords, createChat } from 'api/chat';
import { useStore } from 'store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import { observer } from 'mobx-react-lite';
import { getUserById } from 'api/user';
import moment from 'moment';
// import CollaborationEditor from 'components/CollaborationEditor';
import QuillEditor from 'components/QuillEditor';

const { Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '550px',
  maxHeight: '550px',
  overflow: 'auto',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'white',
  padding: '0 30px',
};

const Chat: NextPage = ({ data, error }) => {
  const router = useRouter();
  const store = useStore();
  const { userId } = store.user.userInfo;

  const [chatList, setChatList] = useState(data);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [chatUserId, setChatUserId] = useState('');
  const [chatAvatar, setChatAvatar] = useState('');
  const [chatNickname, setChatNickname] = useState('');
  const [chatId, setChatId] = useState('');

  const [current, setCurrent] = useState('1');

  // console.log(current)

  useEffect(() => {
    setCurrentRecords([]);
    setChatUserId('');
    setChatNickname('');
    setChatId('');
  }, [current]);

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

    // console.log('query', router.query.chatUserId)
    if (router?.query?.chatUserId && router?.query?.type) {
      const userId = router.query.chatUserId;
      const type = router.query.type;
      if (type && type == '1') {
        setCurrent('2');
      }
      // console.log('line 94, query userId', userId);
      // console.log('line 95, query type', type);
      // console.log('line 96, comming chat list', chatList);
      let flag = false;
      chatList.forEach((c) => {
        if (c.userId == userId) {
          getChatRecords(c.userId, +type).then((res) => {
            setChatId(c.chatId);
            setCurrentRecords(res);
            setChatUserId(c.userId);
            setChatAvatar(c.avatar);
            setChatNickname(c.nickname);
            console.log('line 106 chat records', res);
          });
          flag = true;
        }
      });
      if (!flag) {
        let cId = '';
        createChat(userId, type).then((res) => {
          cId = res;
        });
        getUserById(userId).then((res) => {
          const data = {
            chatId: cId,
            userId: userId,
            nickname: res.nickname,
            avatar: res.avatar,
            updateTime: new Date().toDateString(),
            type: type,
          };
          console.log('line 125 coming from button', data);
          setChatList((prevState) => [data, ...prevState]);
          setChatUserId(data.userId);
          setChatAvatar(data.avatar);
          setChatNickname(data.nickname);
        });
      }
    }
  }, []);

  const handleItemClick = (chatId, userId, avatar, nickname) => {
    let type = +current - 1;
    console.log(type);
    getChatRecords(userId, type).then((res) => {
      setChatId(chatId);
      setCurrentRecords(res);
      setChatUserId(userId);
      setChatAvatar(avatar);
      setChatNickname(nickname);
      console.log('chat records', res);
    });
  };

  const handleTabChange = (e) => {
    setCurrent(e);
    if (e == '1') {
      getChatList(0).then((res) => {
        setChatList(res);
        console.log('line 60', res);
      });
    } else if (e == '2') {
      getChatList(1).then((res) => {
        setChatList(res);
        console.log('line 65', res);
      });
    }
  };

  return (
    <div style={{ marginTop: '60px', paddingTop: '15px' }}>
      <Tabs
        className={styles.tabs}
        onChange={handleTabChange}
        activeKey={current}
        items={[UnorderedListOutlined, DollarCircleOutlined].map((Icon, i) => {
          const id = String(i + 1);
          return {
            label: (
              <span>
                <Icon />
                {id === '1' ? 'Normal Chat' : 'Bounty Chat'}
              </span>
            ),
            key: id,
          };
        })}
      />
      <Layout style={{ padding: '0px 150px' }}>
        <Sider style={siderStyle} width={270}>
          <List
            itemLayout="horizontal"
            dataSource={chatList}
            renderItem={(item) => (
              <List.Item
                className={styles.cardItem}
                onClick={() =>
                  handleItemClick(
                    item.chatId,
                    item.userId,
                    item.avatar,
                    item.nickname
                  )
                }>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.nickname}
                  description={moment(item.updateTime).format(
                    'ddd MMM DD YYYY'
                  )}
                />
              </List.Item>
            )}
          />
        </Sider>
        <Divider type="vertical" style={{ height: '100%' }}></Divider>
        <Layout>
          <Content
            style={{
              textAlign: 'center',
              minHeight: '550px',
              maxHeight: '550px',
              color: 'black',
              backgroundColor: 'white',
            }}>
            {chatUserId ? (
              <Row style={{ height: '100%' }}>
                <Col span={12}>
                  <ChatWindow
                    current={current}
                    currentRecords={currentRecords}
                    chatUserId={chatUserId}
                    chatNickname={chatNickname}
                    chatAvatar={chatAvatar}
                  />
                </Col>
                <Col span={12}>
                  <QuillEditor groupId={chatId} userId={userId} />
                </Col>
              </Row>
            ) : (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  width={150}
                  src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/message-tip.png"
                />
                <div style={{ color: '#8b909f' }}>
                  No Chat Initiated or Selected
                </div>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { query } = ctx;
    const { type } = query;
    const cookies = ctx.req.headers.cookie;
    let parsedCookies = {};
    let userinfo = {};
    let data = {};
    if (cookies) {
      parsedCookies = cookie.parse(cookies);
      userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
      if (userinfo) {
        if (type) {
          data = await getChatList(type, userinfo.token);
        } else {
          data = await getChatList(0, userinfo.token);
        }
        console.log(data);
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

export default observer(Chat);
