import type { NextPage } from 'next';
import React from 'react';
import { Avatar, List, Card, Tag, Tabs } from 'antd';
import {
  DollarCircleOutlined,
  UnorderedListOutlined,
  FieldTimeOutlined,
  LoadingOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined,
  StarFilled,
} from '@ant-design/icons';
import styles from './index.module.scss';
import { getBountyList } from 'api/bounty';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cookie from 'cookie';

const Orders: NextPage = ({ data }) => {
  const [total, setTotal] = useState(0);
  const [records, setRecords] = useState([]);
  const [size, setSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [type, setType] = useState(0);

  const { push } = useRouter();

  useEffect(() => {
    console.log(data.records);
    setTotal(data.total);
    setSize(data.size);
    setRecords(data.records);
    setCurrent(data.current);
  }, []);

  useEffect(() => {}, [current]);

  const handlePageChange = (pageNum: any) => {
    getBountyList(pageNum, 5, type).then((res: any) => {
      setTotal(res.total);
      setSize(res.size);
      setRecords(res.records);
    });
  };

  const handleTabChange = (e: number) => {
    setType(e);
    setCurrent(1);
    getBountyList(1, 5, e, '').then((res: any) => {
      setTotal(res.total);
      setSize(res.size);
      setRecords(res.records);
    });
    console.log(e);
  };

  const handleGotoOrderDetail = (id) => {
    push(`/orderDetail/${id}`);
    // console.log(item.title.length)
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    const userId = e.currentTarget.getAttribute('data-userId');
    push(`/user/${userId}`);
  };

  return (
    <div style={{ padding: '0 250px' }}>
      <Card
        style={{
          width: '100%',
          marginTop: '55px',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <span style={{ fontWeight: '500', fontSize: '20px' }}>
            All Bounties
          </span>
          <span style={{ marginRight: '20px', fontWeight: '500' }}>
            {total} Bounties
          </span>
        </div>

        <Tabs
          className={styles.tabs}
          defaultActiveKey="0"
          onChange={handleTabChange}
          items={[
            UnorderedListOutlined,
            FieldTimeOutlined,
            LoadingOutlined,
            CheckSquareOutlined,
            CloseCircleOutlined,
          ].map((Icon, i) => {
            const id = String(i);
            return {
              label: (
                <span>
                  <Icon />
                  {id === '0'
                    ? 'All'
                    : id === '1'
                    ? 'Unprocessed'
                    : id === '2'
                    ? 'Processing'
                    : id === '3'
                    ? 'Processed'
                    : 'Closed'}
                </span>
              ),
              key: id,
              children: (
                <List
                  itemLayout="vertical"
                  size="large"
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderBottomLeftRadius: '6px',
                    borderBottomRightRadius: '6px',
                  }}
                  pagination={{
                    onChange: handlePageChange,
                    pageSize: size,
                    total: total,
                  }}
                  dataSource={records}
                  renderItem={(item) => (
                    <List.Item
                      className={styles.cardItem}
                      data-key={item.id}
                      onClick={() => handleGotoOrderDetail(item.id)}
                      style={{ cursor: 'pointer' }}
                      actions={[
                        <div
                          className={styles.iconText}
                          data-userId={item.publisherId}
                          onClick={handleAvatarClick}
                          key={item.nickname}>
                          {item.publisherNickname}
                        </div>,
                        <div key={item.createTime}>{item.createTime}</div>,
                        // eslint-disable-next-line react/jsx-key
                        <div>
                          {item.tags.map((tag, index) => (
                            <Tag color="magenta" key={index}>
                              {tag}
                            </Tag>
                          ))}
                        </div>,
                      ]}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            data-userId={item.publisherId}
                            onClick={handleAvatarClick}
                            src={item.publisherAvatar}
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
                              {item.title.length > 50
                                ? item.title.substr(0, 50) + '...'
                                : item.title}
                            </div>
                            <div>
                              <Tag
                                icon={
                                  item.status === 1 ? <StarFilled /> : <></>
                                }
                                color={item.status === 1 ? 'green' : 'orange'}>
                                {item.status === 1
                                  ? 'Unprocessed'
                                  : item.status === 2
                                  ? 'Processing'
                                  : item.status === 3
                                  ? 'Processed'
                                  : 'Closed'}
                              </Tag>
                              <Tag icon={<DollarCircleOutlined />} color="cyan">
                                Bounty
                              </Tag>
                            </div>
                          </div>
                        }
                      />
                      {item.content.length > 150
                        ? item.content.substr(0, 150) + '...'
                        : item.content}
                    </List.Item>
                  )}
                />
              ),
            };
          })}
        />
      </Card>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // const cookies = ctx.req.headers.cookie;
  // const parsedCookies = cookie.parse(cookies);
  // const userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;

  // const data = await getBountyList(1, 5, 0, userinfo.token);
  // return {
  //   props: {
  //     data,
  //   },
  // };

  const cookies = ctx.req.headers.cookie;
  let parsedCookies = {};
  let userinfo = {};
  let data = {};
  if (cookies) {
    parsedCookies = cookie.parse(cookies);
    userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
    if (!userinfo) {
      data = await getBountyList(1, 5, 0);
    } else {
      data = await getBountyList(1, 5, 0, userinfo.token);
    }
  } else {
    data = await getBountyList(1, 5, 0);
  }
  return {
    props: {
      data,
    },
  };
};

export default Orders;
