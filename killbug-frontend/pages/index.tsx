import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Col, Row, Menu, Avatar, List, Space, Card, Tag, message } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import {
  StarFilled,
  CompassOutlined,
  DesktopOutlined,
  Html5Outlined,
  RobotOutlined,
  AndroidOutlined,
  AppleOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import { useState } from 'react';
import { getList } from '../api/index';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import IconCount from 'components/IconCount';
import cookie from 'cookie';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

const adImages = [
  {
    imageUrl:
      'https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/ad1.jpeg',
  },
  {
    imageUrl:
      'https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/ad2.jpeg',
  },
  {
    imageUrl: 'https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/ad3.png',
  },
  {
    imageUrl:
      'https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/ad4.jpeg',
  },
];

const items: MenuItem[] = [
  getItem('Common', '1', <CompassOutlined />),
  getItem('BackEnd', '2', <DesktopOutlined />),
  getItem('FrontEnd', '3', <Html5Outlined />),
  getItem('AI', '4', <RobotOutlined />),
  getItem('Android', '5', <AndroidOutlined />),
  getItem('IOS', '6', <AppleOutlined />),
];

const Home: NextPage = ({ indexData }) => {
  const [total, setTotal] = useState(0);
  const [records, setRecords] = useState([]);
  // const [size, setSize] = useState(5);

  const [current, setCurrent] = useState('1');

  const store = useStore();
  const { userId } = store.user.userInfo;
  const { push } = useRouter();

  const handleGotoDetailPage = (e: any) => {
    const id = e.currentTarget.getAttribute('data-key');
    const type = e.currentTarget.getAttribute('data-type');
    console.log(id, type);
    if (type === '0') {
      push(`/questionDetail/${id}`);
    }
    if (type === '1') {
      push(`/orderDetail/${id}`);
    }
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    const userId = e.currentTarget.getAttribute('data-userId');
    push(`/user/${userId}`);
  };

  useEffect(() => {
    console.log('indexData', indexData);
    setTotal(indexData.questionList.length + indexData.bountyList.length);
    let data: any = [];
    indexData.questionList.forEach((q: any) => {
      q.type = 0;
      data.push(q);
    });
    indexData.bountyList.forEach((b: any) => {
      b.type = 1;
      data.push(b);
    });
    data.sort((a: any, b: any) => {
      const timeA = new Date(a.createTime).getTime();
      const timeB = new Date(b.createTime).getTime();
      return timeB - timeA;
    });
    console.log(data);
    setRecords(data);
  }, []);

  const changeCurrent = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    let data: any = [];
    indexData.questionList.forEach((q: any) => {
      q.type = 0;
    });
    indexData.bountyList.forEach((b: any) => {
      b.type = 1;
    });
    if (current == '1') {
      indexData.questionList.forEach((q) => {
        data.push(q);
      });
      indexData.bountyList.forEach((q) => {
        data.push(q);
      });
    } else if (current == '2') {
      indexData.questionList.forEach((q) => {
        if (q.tags.includes('Backend')) {
          data.push(q);
        }
      });
      indexData.bountyList.forEach((q) => {
        if (q.tags.includes('Backend')) {
          data.push(q);
        }
      });
    } else if (current == '3') {
      indexData.questionList.forEach((q) => {
        if (q.tags.includes('Frontend')) {
          data.push(q);
        }
      });
      indexData.bountyList.forEach((q) => {
        if (q.tags.includes('Frontend')) {
          data.push(q);
        }
      });
    } else if (current == '4') {
      indexData.questionList.forEach((q) => {
        if (q.tags.includes('AI')) {
          data.push(q);
        }
      });
      indexData.bountyList.forEach((q) => {
        if (q.tags.includes('AI')) {
          data.push(q);
        }
      });
    } else if (current == '5') {
      indexData.questionList.forEach((q) => {
        if (q.tags.includes('Android')) {
          data.push(q);
        }
      });
      indexData.bountyList.forEach((q) => {
        if (q.tags.includes('Android')) {
          data.push(q);
        }
      });
    } else if (current == '6') {
      indexData.questionList.forEach((q) => {
        if (q.tags.includes('IOS')) {
          data.push(q);
        }
      });
      indexData.bountyList.forEach((q) => {
        if (q.tags.includes('IOS')) {
          data.push(q);
        }
      });
    }
    data.sort((a: any, b: any) => {
      const timeA = new Date(a.createTime).getTime();
      const timeB = new Date(b.createTime).getTime();
      return timeB - timeA;
    });
    setRecords(data);
    setTotal(data.length);
  }, [current]);

  return (
    <div style={{ padding: '20px 70px', marginTop: '60px' }}>
      <Row justify="center" align="top" gutter={16}>
        <Col span={5}>
          <div className={styles.menuBox}>
            <Menu
              onClick={changeCurrent}
              style={{ width: '100%', borderRadius: '10px' }}
              defaultSelectedKeys={['1']}
              theme="light"
              items={items}
            />
          </div>
        </Col>
        <Col span={13}>
          <List
            itemLayout="vertical"
            size="large"
            style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px 20px 20px 20px' }}
            pagination={{
              pageSize: 5,
              total: total,
            }}
            dataSource={records}
            renderItem={(item) => {
              return (
                <List.Item
                  className={styles.cardItem}
                  onClick={handleGotoDetailPage}
                  data-key={item.id}
                  data-type={item.type}
                  actions={
                    item.type === 1
                      ? [
                          <div
                            className={styles.iconText}
                            data-userId={item.publisherId}
                            onClick={handleAvatarClick}
                            key={item.id}>
                            {item.publisherNickname}
                          </div>,
                          <div key={item.id}>{item.createTime}</div>,
                          // eslint-disable-next-line react/jsx-key
                          <div>
                            {item.tags.map((tag, index) => (
                              <Tag color="magenta" key={index}>
                                {tag}
                              </Tag>
                            ))}
                          </div>,
                        ]
                      : [
                          <IconCount item={item} key={item.id}></IconCount>,
                          <Space className={styles.iconText} key={item.id}>
                            <MessageOutlined />
                            {item.commentCount}
                          </Space>,
                          <div
                            className={styles.iconText}
                            data-userId={item.userId}
                            onClick={handleAvatarClick}
                            key={item.id}>
                            {item.nickname}
                          </div>,
                          <div key={item.id}>{item.createTime}</div>,
                          // eslint-disable-next-line react/jsx-key
                          <div>
                            {item.tags.map((tag, index) => (
                              <Tag color="magenta" key={index}>
                                {tag}
                              </Tag>
                            ))}
                          </div>,
                        ]
                  }>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        data-userId={
                          item.type === 0 ? item.userId : item.publisherId
                        }
                        onClick={handleAvatarClick}
                        src={
                          item.type === 0 ? item.avatar : item.publisherAvatar
                        }
                      />
                    }
                    title={
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <div>
                          {item.title.length > 35
                            ? item.title.substr(0, 35) + '...'
                            : item.title}
                        </div>
                        <div>
                          {item.type === 1 && (
                            <Tag
                              icon={item.status === 1 ? <StarFilled /> : <></>}
                              color={item.status === 1 ? 'green' : 'orange'}>
                              {item.status === 1
                                ? 'Unprocessed'
                                : item.status === 2
                                ? 'Processing'
                                : item.status === 3
                                ? 'Processed'
                                : 'Closed'}
                            </Tag>
                          )}
                          <Tag
                            icon={
                              item.type === 0 ? (
                                <QuestionCircleOutlined />
                              ) : (
                                <DollarCircleOutlined />
                              )
                            }
                            color={item.type === 0 ? 'red' : 'cyan'}>
                            {item.type === 0 ? 'Question' : 'Bounty'}
                          </Tag>
                          {/* <Tag icon={<QuestionCircleOutlined />} color="red">
            question
          </Tag> */}
                        </div>
                      </div>
                    }
                  />
                  {item.content.length > 150
                    ? item.content.substr(0, 150) + '...'
                    : item.content}
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={6}>
          {adImages.map((item) => (
            <Card
              style={{ width: 260, height: 100, marginBottom: '50px' }}
              cover={<img src={item.imageUrl} />}
              key={item.imageUrl}></Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // const cookies = ctx.req.headers.cookie;
  // const parsedCookies = cookie.parse(cookies);
  // const userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;

  // const indexData = await getList();

  // console.log(userinfo.token)
  // return {
  //   props: {
  //     indexData,
  //   },
  // };

  const cookies = ctx.req.headers.cookie;
  let parsedCookies = {};
  let userinfo = {};
  let indexData = {};
  if (cookies) {
    parsedCookies = cookie.parse(cookies);
    userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
    if (!userinfo) {
      indexData = await getList();
    } else {
      indexData = await getList(userinfo.token);
    }
  } else {
    indexData = await getList();
  }
  return {
    props: {
      indexData,
    },
  };
};

export default observer(Home);
