import type { NextPage } from 'next';
import {
  Col,
  Row,
  Avatar,
  Badge,
  Card,
  Button,
  Divider,
  Tooltip,
  message,
  Modal,
  Tag,
} from 'antd';
import {
  DollarCircleOutlined,
  StarFilled,
  ExclamationCircleFilled,
  LikeFilled,
  MessageFilled,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import ReactMarkdown from 'react-markdown';
import React, { useEffect } from 'react';
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import LikeReply from 'components/LikeReply';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import {
  getBounty,
  grabBounty,
  closeBounty,
  finishBounty,
} from '../../api/bounty';
import Link from 'next/link';

const { confirm } = Modal;

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const OrderDetail: NextPage = ({ detail: initialDetail }) => {
  const store = useStore();
  const { userId } = store.user.userInfo;
  const [detail, setDetail] = useState(initialDetail);

  const router = useRouter();
  const push = router.push;
  const { id } = router.query;

  const handleGotoMySpace = () => {
    push(`/user/${userId}`);
  };

  const handleClickGrab = () => {
    confirm({
      title: 'Are you ready to grab?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleGrab();
      },
    });
  };

  const handleGrab = () => {
    if (!userId) {
      message.error('Please login first!');
      return;
    }
    grabBounty({ id: detail.id }).then(() => {
      message.success('Grab successfully!');
      getBounty(detail.id).then((res) => {
        setDetail(res);
      });
    });
  };

  const handleClickClose = () => {
    confirm({
      title: 'Do you want to close?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleClose();
      },
    });
  };

  const handleClickFinish = () => {
    confirm({
      title: 'Do you want to finish?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleFinish();
      },
    });
  };

  const handleClose = () => {
    if (!userId) {
      message.error('Please login first!');
      return;
    }
    if (detail.publisherId !== userId) {
      message.error('Not your order!');
      return;
    }
    closeBounty({ id: detail.id }).then(() => {
      message.success('Close successfully!');
      getBounty(detail.id).then((res) => {
        setDetail(res);
      });
    });
  };

  const handleFinish = () => {
    if (!userId) {
      message.error('Please login first!');
      return;
    }
    if (detail.publisherId !== userId) {
      message.error('Not your order!');
      return;
    }
    finishBounty({ id: detail.id, solverId: detail.solverId }).then(() => {
      console.log(detail.solverId);
      message.success('Finish successfully!');
      getBounty(detail.id).then((res) => {
        setDetail(res);
      });
    });
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    const userId = e.currentTarget.getAttribute('data-userId');
    push(`/user/${userId}`);
  };

  return (
    <div>
      {/* comment */}
      <div className={styles.countBox}>
        <div>
          <Badge size="small" overflowCount={999} color="#c3c8d0" showZero>
            <Tooltip placement="right" title="Move to Comment Area">
              <div className={styles.circleBox}>
                <MessageOutlined
                  style={{ fontSize: '20px', color: '8b909f' }}
                />
              </div>
            </Tooltip>
          </Badge>
        </div>
      </div>
      <div style={{ padding: '20px 150px', marginTop: '60px' }}>
        <Row justify="center" align="top" gutter={16}>
          <Col span={17}>
            {/* order area */}
            <Card style={{ width: '100%', borderRadius: '6px' }}>
              <div className={styles.articleBox}>
                {/* Title */}
                <div className={styles.title}>{detail.title}</div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {/* UserInfo */}
                  <div className={styles.userInfo}>
                    <Avatar
                      style={{ cursor: 'pointer' }}
                      data-userId={detail.publisherId}
                      onClick={handleAvatarClick}
                      src={detail.publisherAvatar}
                      size={35}
                    />
                    {/* nickname and questionInfo */}
                    <div className={styles.upDownInfo}>
                      <div
                        data-userId={detail.publisherId}
                        onClick={handleAvatarClick}
                        style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          cursor: 'pointer',
                        }}>
                        {detail.publisherNickname}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8b909f' }}>
                        {detail.createTime}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div>
                        {detail.tags.map((tag, index) => (
                          <Tag color="magenta" key={index}>
                            {tag}
                          </Tag>
                        ))}
                        <Tag
                          icon={detail.status === 1 ? <StarFilled /> : <></>}
                          color={detail.status === 1 ? 'green' : 'orange'}>
                          {detail.status === 1
                            ? 'Unprocessed'
                            : detail.status === 2
                            ? 'Processing'
                            : detail.status === 3
                            ? 'Processed'
                            : 'Closed'}
                        </Tag>
                        <Tag icon={<DollarCircleOutlined />} color="cyan">
                          order
                        </Tag>
                      </div>
                      {detail.publisherId === userId &&
                        detail.status != 4 &&
                        detail.status != 3 && (
                          <div
                            style={{
                              marginTop: '15px',
                              display: 'flex',
                              justifyContent: 'end',
                            }}>
                            <Button
                              onClick={handleClickClose}
                              danger
                              style={{
                                borderRadius: '5px',
                                marginRight: '12px',
                              }}>
                              Close
                            </Button>
                            <Button
                              onClick={handleClickFinish}
                              style={{
                                borderRadius: '5px',
                                borderColor: '#448ef7',
                                color: '#448ef7',
                              }}>
                              Finish
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div style={{ marginTop: '20px' }}>
                  <ReactMarkdown>{detail.content}</ReactMarkdown>
                </div>
              </div>
            </Card>
            <Divider />
          </Col>
          <Col span={7}>
            <Card
              title={'Publisher'}
              style={{ width: '100%', borderRadius: '6px' }}>
              <div className={styles.userInfo} style={{ marginTop: '1px' }}>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  data-userId={detail.publisherId}
                  onClick={handleAvatarClick}
                  src={detail.publisherAvatar}
                  size={35}
                />
                {/* nickname and questionInfo */}
                <div className={styles.upDownInfo}>
                  <div
                    data-userId={detail.publisherId}
                    onClick={handleAvatarClick}
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      cursor: 'pointer',
                    }}>
                    {detail.publisherNickname}
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b909f' }}>
                    {/* {'Backend Engineer'} */}
                    {detail.publisherPosition
                      ? detail.publisherPosition
                      : 'Unknown Position'}
                  </div>
                </div>
              </div>
              {userId === detail.publisherId ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={handleGotoMySpace}
                    style={{
                      width: '100px',
                      borderRadius: '5px',
                      marginTop: '15px',
                    }}
                    type="primary">
                    My Space
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: '15px',
                  }}>
                  {/* <Button
                    style={{ width: '100px', borderRadius: '5px' }}
                    type="primary">
                    Follow
                  </Button> */}
                  <Link
                    href={{
                      pathname: '/user/chat',
                      query: { chatUserId: detail.publisherId, type: 0 },
                    }}>
                    <Button
                      style={{
                        marginLeft: '30px',
                        width: '100px',
                        borderRadius: '5px',
                        borderColor: '#448ef7',
                        color: '#448ef7',
                      }}>
                      Message
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
            <Card
              title={'Solver'}
              style={{ width: '100%', borderRadius: '6px', marginTop: '12px' }}>
              {!detail.solverId && detail.status != 4 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div style={{ fontSize: '17px' }}>No solver right now!</div>
                  <div style={{ fontSize: '17px' }}>Come to grab an order!</div>
                  <Button
                    onClick={handleClickGrab}
                    type="primary"
                    style={{
                      width: '100px',
                      borderRadius: '5px',
                      marginTop: '15px',
                    }}>
                    Grab
                  </Button>
                </div>
              ) : !detail.solverId && detail.status == 4 ? (
                <div
                  style={{
                    display: 'flex',
                    fontSize: '17px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  The order has been closed
                </div>
              ) : (
                <div>
                  <div className={styles.userInfo} style={{ marginTop: '1px' }}>
                    <Avatar
                      style={{ cursor: 'pointer' }}
                      data-userId={detail.solverId}
                      onClick={handleAvatarClick}
                      src={detail.solverAvatar}
                      size={35}
                    />
                    {/* nickname and questionInfo */}
                    <div className={styles.upDownInfo}>
                      <div
                        data-userId={detail.solverId}
                        onClick={handleAvatarClick}
                        style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          cursor: 'pointer',
                        }}>
                        {detail.solverNickname}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8b909f' }}>
                        {/* {'Backend Engineer'} */}
                        {detail.solverPosition
                          ? detail.solverPosition
                          : 'Unknown Position'}
                      </div>
                    </div>
                  </div>
                  {userId === detail.solverId ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        onClick={handleGotoMySpace}
                        style={{
                          width: '100px',
                          borderRadius: '5px',
                          marginTop: '15px',
                        }}
                        type="primary">
                        My Space
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '15px',
                      }}>
                      {/* <Button
                        style={{ width: '100px', borderRadius: '5px' }}
                        type="primary">
                        Follow
                      </Button> */}
                      <Link
                        href={{
                          pathname: '/user/chat',
                          query: { chatUserId: detail.solverId },
                        }}>
                        <Button
                          style={{
                            marginLeft: '30px',
                            width: '100px',
                            borderRadius: '5px',
                            borderColor: '#448ef7',
                            color: '#448ef7',
                          }}>
                          Message
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const detail = await getBounty(context.params.id);
  return {
    props: {
      detail,
    },
  };
};

export default observer(OrderDetail);
