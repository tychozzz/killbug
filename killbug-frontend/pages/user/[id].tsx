import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Avatar,
  List,
  Card,
  Tag,
  Space,
  Button,
  Tabs,
  Divider,
  InputNumber,
  Modal,
  message,
} from 'antd';
import {
  MessageOutlined,
  QuestionCircleOutlined,
  DollarCircleOutlined,
  DollarCircleTwoTone,
  BugOutlined,
  HighlightOutlined,
  QuestionCircleTwoTone,
  MoneyCollectTwoTone,
  LikeTwoTone,
  ExclamationCircleFilled,
  FieldTimeOutlined,
  LoadingOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import { recharge, renderUserSpace } from 'api/user';
import IconCount from 'components/IconCount';
import cookie from 'cookie';
import Link from 'next/link';
import {
  cancelBounty,
  closeBounty,
  finishBounty,
  getBountiesByUserId,
  getMyBounties,
  getGrabbedBountiesByUserId,
  getMyGrabbedBounties,
} from '../../api/bounty';

const { confirm } = Modal;

const User: NextPage = ({ detail }) => {
  const store = useStore();
  const { userId } = store.user.userInfo;

  const [displayRecharge, setDisplayRecharge] = useState(false);
  const [rechargeDollar, setRechargeDollar] = useState(0);
  const [balance, setBalance] = useState(detail.user.balance);

  const router = useRouter();
  const push = router.push;
  const { id } = router.query;

  const [questionCount, setQuestionCount] = useState(detail.questionCount);
  const [orderCount, setOrderCount] = useState(detail.orderCount);
  const [likeCount, setLikeCount] = useState(detail.likeCount);
  const [questions, setQuestions] = useState(detail.questions);
  const [bounties, setBounties] = useState(detail.bounties);
  const [grabbedBounties, setGrabbedBounties] = useState(
    detail.grabbedBounties
  );
  const [user, setUser] = useState(detail.user);

  const [current, setCurrent] = useState(0);
  const [currentList, setCurrentList] = useState(detail.questions);
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const [currentGrabbedOrderList, setCurrentGrabbedOrderList] = useState([]);
  const [currentOrder, setCurrentOrder] = useState('1');
  const [currentGrabbedOrder, setCurrentGrabbedOrder] = useState('2');
  const [refresh, setRefresh] = useState(false);

  const [icon, setIcon] = useState(<QuestionCircleOutlined />);
  const [color, setColor] = useState('red');
  const [tagName, setTagName] = useState('question');

  useEffect(() => {
    setQuestionCount(detail.questionCount);
    setOrderCount(detail.orderCount);
    setLikeCount(detail.likeCount);
    setQuestions(detail.questions);
    setBounties(detail.bounties);
    setGrabbedBounties(detail.grabbedBounties);
    setUser(detail.user);
    setCurrentList(detail.questions);
  }, []);

  useEffect(() => {
    renderUserSpace(id).then((detail) => {
      setQuestionCount(detail.questionCount);
      setOrderCount(detail.orderCount);
      setLikeCount(detail.likeCount);
      setQuestions(detail.questions);
      setBounties(detail.bounties);
      setGrabbedBounties(detail.grabbedBounties);
      setUser(detail.user);
      setCurrentList(detail.questions);
    });
  }, [router.query.id]);

  useEffect(() => {
    if (id == userId) {
      getMyBounties().then((res) => {
        setBounties(res);
        let orderList = [];
        res.forEach((b) => {
          if (b.status == currentOrder) {
            orderList.push(b);
          }
        });
        console.log('refresh effect', orderList);
        setCurrentOrderList(orderList);
      });
      getMyGrabbedBounties().then((res) => {
        setGrabbedBounties(res);
        let orderList = [];
        res.forEach((b) => {
          if (b.status == currentGrabbedOrder) {
            orderList.push(b);
          }
        });
        console.log('refresh effect', orderList);
        setCurrentGrabbedOrderList(orderList);
      });
    } else {
      getBountiesByUserId(id).then((res) => {
        setBounties(res);
        let orderList = [];
        res.forEach((b) => {
          if (b.status == currentOrder) {
            orderList.push(b);
          }
        });
        console.log('refresh effect', orderList);
        setCurrentOrderList(orderList);
      });
      getGrabbedBountiesByUserId(id).then((res) => {
        setGrabbedBounties(res);
        let orderList = [];
        res.forEach((b) => {
          if (b.status == currentGrabbedOrder) {
            orderList.push(b);
          }
        });
        console.log('refresh effect', orderList);
        setCurrentGrabbedOrderList(orderList);
      });
    }
  }, [refresh]);

  useEffect(() => {}, [currentOrderList]);

  const handleGotoProfile = () => {
    push('/user/profile');
  };

  const handleTabChange = (e: number) => {
    setCurrent(e);
    if (e == 0) {
      setCurrentList(questions);
      setIcon(<QuestionCircleOutlined />);
      setColor('red');
      setTagName('Question');
    } else if (e == 1) {
      setCurrentList(bounties);
      setIcon(<DollarCircleOutlined />);
      setColor('cyan');
      setTagName('Bounty');
      let orderList = [];
      bounties.forEach((b) => {
        if (b.status === 1) {
          orderList.push(b);
        }
      });
      setCurrentOrderList(orderList);
      console.log(orderList);
    } else {
      setCurrentList(grabbedBounties);
      setIcon(<DollarCircleOutlined />);
      setColor('cyan');
      setTagName('Bounty');
      let orderList = [];
      grabbedBounties.forEach((b) => {
        if (b.status === 2) {
          orderList.push(b);
        }
      });
      setCurrentGrabbedOrderList(orderList);
      console.log(orderList);
    }
    setCurrentOrder('1');
    setCurrentGrabbedOrder('1');
    console.log(e);
  };

  const handleOrderTabChange = (e) => {
    console.log(e);
    setCurrentOrder(e);
    let orderList = [];
    bounties.forEach((b) => {
      console.log(b.status, e);
      if (b.status == e) {
        orderList.push(b);
      }
    });
    console.log(orderList);
    setCurrentOrderList(orderList);
  };

  const handleGrabbedOrderTabChange = (e) => {
    let c = (+e + 1).toString();
    console.log(c);
    setCurrentGrabbedOrder(c);
    let orderList = [];
    grabbedBounties.forEach((b) => {
      // console.log(b.status, e);
      if (b.status == c) {
        orderList.push(b);
      }
    });
    console.log(orderList);
    setCurrentGrabbedOrderList(orderList);
  };

  // useEffect(() => {}, [current]);

  const handleGotoDetailPage = (e: any) => {
    const id = e.currentTarget.getAttribute('data-key');
    const type = e.currentTarget.getAttribute('data-type');
    console.log(id, type);
    if (type === '0') {
      push(`/questionDetail/${id}`);
    }
    if (type === '1' || type === '2') {
      push(`/orderDetail/${id}`);
    }
  };

  const handleClickRecharge = () => {
    setDisplayRecharge(!displayRecharge);
  };

  const handleClickConfirm = () => {
    if (!userId) {
      message.warning('Please login first!');
      return;
    }
    if (userId?.toString() !== id?.toString()) {
      message.warning('No permission to recharge!');
      return;
    }
    confirm({
      title: `Do you want to recharge $${rechargeDollar}?`,
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleConfirm();
      },
    });
  };

  const handleConfirm = () => {
    recharge(rechargeDollar).then(() => {
      setDisplayRecharge(false);
      setBalance(rechargeDollar + balance);
      setRechargeDollar(0);
      message.success('Recharge successfully!');
    });
  };

  const handleGotoMessage = (type) => {
    // my message
    if (type === 0) {
      push('/user/chat');
    }
  };

  const handleClickClose = (event, id) => {
    event.stopPropagation();
    console.log(id);
    confirm({
      title: 'Do you want to close?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleClose(id);
      },
    });
  };

  const handleClickCancel = (event, id) => {
    event.stopPropagation();
    console.log(id);
    confirm({
      title:
        'Do you want to cancel? Your bounty will return to unprocessed status.',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleCancel(id);
      },
    });
  };

  const handleClickFinish = (event, item) => {
    event.stopPropagation();
    console.log(item);
    confirm({
      title: 'Do you want to finish?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleFinish(item);
      },
    });
  };

  const handleClose = (id) => {
    if (!userId) {
      message.error('Please login first!');
      return;
    }
    console.log(id);
    closeBounty({ id: id }).then(() => {
      message.success('Close successfully!');
      setRefresh(!refresh);
    });
  };

  const handleCancel = (id) => {
    if (!userId) {
      message.error('Please login first!');
      return;
    }
    console.log(id);
    cancelBounty({ id: id }).then(() => {
      message.success('Cancel successfully!');
      setRefresh(!refresh);
    });
  };

  const handleFinish = (item) => {
    if (!userId) {
      message.error('Please login first!');
      return;
    }
    finishBounty({ id: item.id, solverId: item.solverId }).then(() => {
      message.success('Finish successfully!');
      setRefresh(!refresh);
    });
  };

  return (
    <div style={{ padding: '20px 220px', marginTop: '60px' }}>
      <Row justify="center" align="top" gutter={16}>
        <Col span={16}>
          <Card style={{ width: '100%', borderRadius: '6px' }}>
            <Row justify="center" align="top" gutter={10}>
              <Col span={4}>
                <Avatar
                  style={{ marginLeft: '5px' }}
                  src={user.avatar}
                  size={64}
                />
              </Col>
              <Col span={15}>
                <div className={styles.profileBox}>
                  <div className={styles.nickname}>{user.nickname}</div>
                  <div className={styles.iconWord}>
                    <BugOutlined
                      style={{ fontSize: '16px', color: '#73777b' }}
                    />
                    <span style={{ marginLeft: '5px', color: '#73777b' }}>
                      {/* {'Backend Engineer'} */}
                      {user.position ? user.position : 'Unknown Position'}
                    </span>
                  </div>
                  <div className={styles.iconWord}>
                    <HighlightOutlined
                      style={{ fontSize: '16px', color: '#73777b' }}
                    />
                    <span style={{ marginLeft: '5px', color: '#73777b' }}>
                      {/* {'Coding for Changing the World!'} */}
                      {user.introduction}
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={5}>
                {userId === id ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      top: '30px',
                    }}>
                    <Button
                      onClick={() => handleGotoMessage(0)}
                      type="primary"
                      ghost
                      style={{
                        borderRadius: '5px',
                        marginBottom: '10px',
                      }}>
                      Message
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      onClick={handleGotoProfile}
                      style={{
                        borderRadius: '5px',
                      }}>
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <Link
                    href={{
                      pathname: '/user/chat',
                      query: { chatUserId: id, type: 0 },
                    }}>
                    <Button
                      type="primary"
                      ghost
                      style={{
                        position: 'relative',
                        top: '65px',
                        borderRadius: '5px',
                      }}>
                      Message
                    </Button>
                  </Link>
                )}
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              width: '100%',
              marginTop: '10px',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
            }}>
            <span style={{ fontWeight: '500', fontSize: '16px' }}>
              Personal Posts
            </span>
            <Tabs
              onChange={handleTabChange}
              className={styles.tabs}
              activeKey={current.toString()}
              defaultActiveKey="0"
              items={[
                QuestionCircleOutlined,
                DollarCircleOutlined,
                DollarCircleOutlined,
              ].map((Icon, i) => {
                const id = String(i);
                return {
                  label: (
                    <span>
                      <Icon />
                      {id === '0'
                        ? 'Question'
                        : id === '1'
                        ? 'Published Bounty'
                        : 'Grabbed Bounty'}
                    </span>
                  ),
                  key: id,
                  children:
                    id === '0' ? (
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
                          pageSize: 5,
                        }}
                        dataSource={currentList}
                        renderItem={(item) => (
                          <List.Item
                            onClick={handleGotoDetailPage}
                            data-key={item.id}
                            data-type={current}
                            className={styles.cardItem}
                            key={item.id}
                            actions={
                              current === '1'
                                ? [<div key={item.id}>{item.createTime}</div>]
                                : [
                                    <IconCount
                                      item={item}
                                      key={item.id}></IconCount>,
                                    <Space
                                      className={styles.iconText}
                                      key={item.id}>
                                      <MessageOutlined />
                                      {item.commentCount}
                                    </Space>,
                                    <div key={item.id}>{item.createTime}</div>,
                                  ]
                            }>
                            <List.Item.Meta
                              title={
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <div>{item.title}</div>
                                  <div>
                                    <Tag icon={icon} color={color}>
                                      {tagName}
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
                    ) : id === '1' ? (
                      <div>
                        <Tabs
                          style={{ padding: '0 20px' }}
                          onChange={handleOrderTabChange}
                          className={styles.tabs}
                          activeKey={currentOrder.toString()}
                          defaultActiveKey="0"
                          items={[
                            FieldTimeOutlined,
                            LoadingOutlined,
                            CheckSquareOutlined,
                            CloseCircleOutlined,
                          ].map((Icon, i) => {
                            const id = String(i + 1);
                            return {
                              label: (
                                <span>
                                  <Icon />
                                  {id === '1'
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
                                    pageSize: 5,
                                  }}
                                  dataSource={currentOrderList}
                                  renderItem={(item) => (
                                    <List.Item
                                      onClick={handleGotoDetailPage}
                                      data-key={item.id}
                                      data-type={current}
                                      className={styles.cardItem}
                                      key={item.id}
                                      actions={[
                                        <div
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                          key={item.id}>
                                          <div>{item.createTime}</div>
                                          {userId === item.publisherId &&
                                            item.status == 1 && (
                                              <div
                                                style={{
                                                  position: 'relative',
                                                  left: '220px',
                                                }}>
                                                <Button
                                                  onClick={(event) =>
                                                    handleClickClose(
                                                      event,
                                                      item.id
                                                    )
                                                  }
                                                  danger
                                                  type="text"
                                                  style={{
                                                    borderRadius: '5px',
                                                  }}>
                                                  Close
                                                </Button>
                                              </div>
                                            )}
                                          {userId === item.publisherId &&
                                            item.status == 2 && (
                                              <div
                                                style={{
                                                  position: 'relative',
                                                  left: '70px',
                                                }}>
                                                <Link
                                                  href={{
                                                    pathname: '/user/chat',
                                                    query: {
                                                      chatUserId: item.solverId,
                                                      type: 1,
                                                    },
                                                  }}>
                                                  <Button
                                                    style={{
                                                      borderColor: '#448ef7',
                                                      color: '#448ef7',
                                                      borderRadius: '5px',
                                                      marginRight: '12px',
                                                    }}>
                                                    Message
                                                  </Button>
                                                </Link>
                                                <Button
                                                  onClick={(event) =>
                                                    handleClickFinish(
                                                      event,
                                                      item
                                                    )
                                                  }
                                                  style={{
                                                    borderRadius: '5px',
                                                    borderColor: '#448ef7',
                                                    color: '#448ef7',
                                                  }}>
                                                  Finish
                                                </Button>
                                                <Button
                                                  onClick={(event) =>
                                                    handleClickCancel(
                                                      event,
                                                      item.id
                                                    )
                                                  }
                                                  type="text"
                                                  danger
                                                  style={{
                                                    borderRadius: '5px',
                                                    marginRight: '12px',
                                                  }}>
                                                  Cancel
                                                </Button>
                                              </div>
                                            )}
                                          {userId === item.publisherId &&
                                            item.status == 3 && (
                                              <div
                                                style={{
                                                  position: 'relative',
                                                  left: '110px',
                                                }}>
                                                <Link
                                                  href={{
                                                    pathname: '/user/chat',
                                                    query: {
                                                      chatUserId: item.solverId,
                                                      type: 1,
                                                    },
                                                  }}>
                                                  <Button
                                                    style={{
                                                      borderColor: '#448ef7',
                                                      color: '#448ef7',
                                                      borderRadius: '5px',
                                                      marginRight: '12px',
                                                    }}>
                                                    Message
                                                  </Button>
                                                </Link>
                                                <Button
                                                  style={{
                                                    borderRadius: '5px',
                                                    borderColor: '#448ef7',
                                                    color: '#448ef7',
                                                  }}>
                                                  Review
                                                </Button>
                                              </div>
                                            )}
                                        </div>,
                                      ]}>
                                      <List.Item.Meta
                                        title={
                                          <div
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                            }}>
                                            <div>{item.title}</div>
                                            <div>
                                              <Tag icon={icon} color={color}>
                                                {tagName}
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
                      </div>
                    ) : (
                      <div>
                        <Tabs
                          style={{ padding: '0 20px' }}
                          onChange={handleGrabbedOrderTabChange}
                          // activeKey={currentGrabbedOrder}
                          className={styles.tabs}
                          defaultActiveKey="2"
                          // activeKey={currentGrabbedOrder}
                          items={[
                            LoadingOutlined,
                            CheckSquareOutlined,
                            CloseCircleOutlined,
                          ].map((Icon, i) => {
                            const id = String(i + 1);
                            return {
                              label: (
                                <span>
                                  <Icon />
                                  {id === '1'
                                    ? 'Processing'
                                    : id === '2'
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
                                    pageSize: 5,
                                  }}
                                  dataSource={currentGrabbedOrderList}
                                  renderItem={(item) => (
                                    <List.Item
                                      onClick={handleGotoDetailPage}
                                      data-key={item.id}
                                      data-type={current}
                                      className={styles.cardItem}
                                      key={item.id}
                                      actions={[
                                        <div
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                          key={item.id}>
                                          <div>{item.createTime}</div>

                                          {userId === item.solverId &&
                                            item.status == 2 && (
                                              <div
                                                style={{
                                                  position: 'relative',
                                                  left: '115px',
                                                }}>
                                                <Link
                                                  href={{
                                                    pathname: '/user/chat',
                                                    query: {
                                                      chatUserId:
                                                        item.publisherId,
                                                      type: 1,
                                                    },
                                                  }}>
                                                  <Button
                                                    style={{
                                                      borderColor: '#448ef7',
                                                      color: '#448ef7',
                                                      borderRadius: '5px',
                                                      marginRight: '12px',
                                                    }}>
                                                    Message
                                                  </Button>
                                                </Link>
                                                <Button
                                                  onClick={(event) =>
                                                    handleClickCancel(
                                                      event,
                                                      item.id
                                                    )
                                                  }
                                                  type="text"
                                                  danger
                                                  style={{
                                                    borderRadius: '5px',
                                                    marginRight: '12px',
                                                  }}>
                                                  Cancel
                                                </Button>
                                              </div>
                                            )}
                                          {userId === item.solverId &&
                                            item.status == 3 && (
                                              <div
                                                style={{
                                                  position: 'relative',
                                                  left: '115px',
                                                }}>
                                                <Link
                                                  href={{
                                                    pathname: '/user/chat',
                                                    query: {
                                                      chatUserId:
                                                        item.publisherId,
                                                      type: 1,
                                                    },
                                                  }}>
                                                  <Button
                                                    style={{
                                                      borderColor: '#448ef7',
                                                      color: '#448ef7',
                                                      borderRadius: '5px',
                                                      marginRight: '12px',
                                                    }}>
                                                    Message
                                                  </Button>
                                                </Link>
                                                <Button
                                                  style={{
                                                    borderRadius: '5px',
                                                    borderColor: '#448ef7',
                                                    color: '#448ef7',
                                                  }}>
                                                  Review
                                                </Button>
                                              </div>
                                            )}
                                        </div>,
                                      ]}>
                                      <List.Item.Meta
                                        title={
                                          <div
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              justifyContent: 'space-between',
                                            }}>
                                            <div>{item.title}</div>
                                            <div>
                                              <Tag icon={icon} color={color}>
                                                {tagName}
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
                      </div>
                    ),
                };
              })}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Achievements" style={{ width: '100%' }}>
            <div className={styles.achievement}>
              <QuestionCircleTwoTone
                style={{ fontSize: '16px', color: '#448ef7' }}
              />
              <span style={{ marginLeft: '5px' }}>
                Published Questions -{' '}
                <span style={{ fontWeight: '500' }}>{questionCount}</span>
              </span>
            </div>
            <div className={styles.achievement}>
              <MoneyCollectTwoTone style={{ fontSize: '16px' }} />
              <span style={{ marginLeft: '5px' }}>
                Published Bounties -{' '}
                <span style={{ fontWeight: '500' }}>{orderCount}</span>
              </span>
            </div>
            {/* <div className={styles.achievement}>
              <CheckSquareTwoTone style={{ fontSize: '16px' }} />
              <span style={{ marginLeft: '5px' }}>
                Solved Orders - <span style={{ fontWeight: '500' }}>{}</span>
              </span>
            </div> */}
            <div className={styles.achievement}>
              <LikeTwoTone style={{ fontSize: '16px' }} />
              <span style={{ marginLeft: '5px' }}>
                Received Likes -{' '}
                <span style={{ fontWeight: '500' }}>{likeCount}</span>
              </span>
            </div>
          </Card>
          {userId === id && (
            <Card title="Balance Recharge" style={{ marginTop: '15px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <div className={styles.achievement}>
                  <DollarCircleTwoTone style={{ fontSize: '16px' }} />
                  <span style={{ marginLeft: '5px' }}>
                    Balance :{' '}
                    <span style={{ fontWeight: '500' }}>${balance}</span>
                  </span>
                </div>
                <Button
                  onClick={handleClickRecharge}
                  type="primary"
                  style={{ marginTop: '5px' }}>
                  {!displayRecharge ? 'Recharge' : 'Cancel Recharge'}
                </Button>
                {displayRecharge && (
                  <Card style={{ marginTop: '15px' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <InputNumber
                        min={0}
                        max={1000}
                        value={rechargeDollar}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        onChange={setRechargeDollar}
                        addonAfter="$"
                      />
                      <Button
                        onClick={handleClickConfirm}
                        style={{ marginTop: '20px' }}
                        danger>
                        Confirm
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          )}
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: '450',
            }}>
            Registered on {user.createTime}
          </div>
          <Divider />
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // const cookies = ctx.req.headers.cookie;
  // const parsedCookies = cookie.parse(cookies);
  // const userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;

  // const detail = await renderUserSpace(ctx.params.id, userinfo.token);
  // return {
  //   props: {
  //     detail,
  //   },
  // };

  const cookies = ctx.req.headers.cookie;
  let parsedCookies = {};
  let userinfo = {};
  let detail = {};
  if (cookies) {
    parsedCookies = cookie.parse(cookies);
    userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
    if (!userinfo) {
      detail = await renderUserSpace(ctx.params.id);
    } else {
      detail = await renderUserSpace(ctx.params.id, userinfo.token);
    }
  } else {
    detail = await renderUserSpace(ctx.params.id);
  }
  return {
    props: {
      detail,
    },
  };
};

export default observer(User);
