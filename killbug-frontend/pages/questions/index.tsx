import type { NextPage } from 'next';
import React from 'react';
import { Avatar, List, Card, Tag, Tabs, Space } from 'antd';
import {
  LikeOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  UnorderedListOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import { getQuestionList } from '../../api/question';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import IconCount from 'components/IconCount';

// const IconText = ({ icon, text }: { icon: React.FC, text: string }) => (
//   <Space className={styles.iconText}>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

const Questions: NextPage = ({ data }) => {
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

  const handleLikeClick = (e) => {
    e.stopPropagation();
    console.log('like');
  };

  const handlePageChange = (pageNum: any) => {
    getQuestionList(pageNum, 5, type).then((res: any) => {
      setTotal(res.total);
      setSize(res.size);
      setRecords(res.records);
    });
  };

  const handleTabChange = (e: number) => {
    setType(e);
    setCurrent(1);
    getQuestionList(1, 5, e).then((res: any) => {
      setTotal(res.total);
      setSize(res.size);
      setRecords(res.records);
    });
    console.log(e);
  };

  const handleGotoQuestionDetail = (id) => {
    push(`/questionDetail/${id}`);
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
            All Questions
          </span>
          <span style={{ marginRight: '20px', fontWeight: '500' }}>
            {total} Questions
          </span>
        </div>

        <Tabs
          className={styles.tabs}
          defaultActiveKey="0"
          onChange={handleTabChange}
          items={[UnorderedListOutlined, FieldTimeOutlined, LikeOutlined].map(
            (Icon, i) => {
              const id = String(i);
              return {
                label: (
                  <span>
                    <Icon />
                    {id === '0' ? 'All' : id === '1' ? 'Newest' : 'Hottest'}
                  </span>
                ),
                key: id,
                children: (
                  <List
                    itemLayout="vertical"
                    size="large"
                    style={{ backgroundColor: 'white', borderRadius: '10px' }}
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
                        onClick={() => handleGotoQuestionDetail(item.id)}
                        actions={[
                          // <Space
                          //   onClick={handleLikeClick}
                          //   className={styles.iconText}
                          //   key="like">
                          //   <LikeOutlined />
                          //   {item.likeCount}
                          // </Space>,
                          <IconCount item={item} key={item.id}></IconCount>,
                          <Space className={styles.iconText} key={item.id}>
                            <MessageOutlined />
                            {item.commentCount}
                          </Space>,
                          <div
                            className={styles.iconText}
                            data-userId={item.userId}
                            onClick={handleAvatarClick}
                            key={item.nickname}>
                            {item.nickname}
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
                              data-userId={item.userId}
                              onClick={handleAvatarClick}
                              src={item.avatar}
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
                                  icon={<QuestionCircleOutlined />}
                                  color="red">
                                  Question
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
            }
          )}
        />
      </Card>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = ctx.req.headers.cookie;
  let parsedCookies = {};
  let userinfo = {};
  let data = {};
  if (cookies) {
    parsedCookies = cookie.parse(cookies);
    userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
    if (!userinfo) {
      data = await getQuestionList(1, 5, 0);
    } else {
      data = await getQuestionList(1, 5, 0, userinfo.token);
    }
  } else {
    data = await getQuestionList(1, 5, 0);
  }
  return {
    props: {
      data,
    },
  };
};

export default Questions;
