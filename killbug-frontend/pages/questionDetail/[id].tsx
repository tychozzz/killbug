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
  Tag,
} from 'antd';
import {
  LikeFilled,
  MessageFilled,
  LikeOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import ReactMarkdown from 'react-markdown';
import React from 'react';
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';
import {
  getQuestion,
  getAnswers,
  submitAnswer,
  submitReply,
} from '../../api/question';
import LikeReply from 'components/LikeReply';
import { useStore } from 'store';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { like } from '../../api/question';
import cookie from 'cookie';
import Link from 'next/link';

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const QuestionDetail: NextPage = ({ detail, answers }) => {
  const store = useStore();
  const { userId } = store.user.userInfo;
  const [answer, setAnswer] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isLiked, setIsLiked] = useState(detail.isLiked);
  const likeIconColor = isLiked ? '#3f7ef7' : 'black';

  console.log(detail.content);

  const scrollRef = useRef(null);

  const router = useRouter();
  const { id } = router.query;
  const push = router.push;
  const questionId = id?.toString();

  const scrollToAnswerArea = () => {
    const offset = scrollRef.current.offsetTop;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  const handleAnswerSubmit = () => {
    if (!userId) {
      message.warning('Please Login first!');
      return;
    }
    const content = answer;
    submitAnswer({ content, userId, questionId }).then((res) => {
      message.success('Submitted successfully!');
      answers.unshift(res);
      detail.commentCount += 1;
      setAnswer('');
      setRefresh(!refresh);
    });
  };

  const handleReplySubmit = (
    answer,
    replyType,
    commentId,
    replyId,
    fromUserId,
    toUserId,
    replyContent
  ) => {
    if (!userId) {
      message.warning('Please Login first!');
      return;
    }
    console.log('replyType', replyType);
    console.log('commentId', commentId);
    console.log('replyId', replyId);
    console.log('fromUserId', fromUserId);
    console.log('toUserId', toUserId);
    console.log('replyContent', replyContent);
    submitReply({
      replyType,
      commentId,
      replyId,
      fromUserId,
      toUserId,
      replyContent,
    }).then((res) => {
      message.success('Submitted successfully!');
      answer?.replies.push(res);
      answer.replyCount += 1;
      setRefresh(!refresh);
    });
  };

  const handleGotoMySpace = () => {
    push(`/user/${userId}`);
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    const userId = e.currentTarget.getAttribute('data-userId');
    push(`/user/${userId}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!userId) {
      message.error('Please Login first!');
    }
    const likedId = e.currentTarget.getAttribute('data-likedId');
    const data = {
      userId: userId,
      likedId: likedId,
      type: 0,
    };
    like(data).then((res) => {
      setIsLiked(1 - isLiked);
      if (res) {
        detail.likeCount += 1;
      } else {
        detail.likeCount -= 1;
      }
    });
  };

  return (
    <div>
      {/* like/comment count */}
      <div className={styles.countBox}>
        <div>
          {isLiked === 1 ? (
            <Badge
              count={detail.likeCount}
              size="small"
              overflowCount={999}
              color="#3f7ef7"
              showZero>
              <div
                data-likedId={detail.id}
                className={styles.circleBox}
                onClick={handleLikeClick}>
                <LikeOutlined
                  style={{ fontSize: '20px', color: likeIconColor }}
                />
              </div>
            </Badge>
          ) : (
            <Badge
              count={detail.likeCount}
              size="small"
              overflowCount={999}
              color="#c3c8d0"
              showZero>
              <div
                data-likedId={detail.id}
                className={styles.circleBox}
                onClick={handleLikeClick}>
                <LikeOutlined
                  style={{ fontSize: '20px', color: likeIconColor }}
                />
              </div>
            </Badge>
          )}
        </div>
        <div style={{ marginTop: '30px' }}>
          <Badge
            count={detail.commentCount}
            size="small"
            overflowCount={999}
            color="#c3c8d0"
            showZero>
            <Tooltip placement="right" title="Post your answer to help">
              <div className={styles.circleBox} onClick={scrollToAnswerArea}>
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
            {/* question area */}
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
                      data-userId={detail.userId}
                      onClick={handleAvatarClick}
                      src={detail.avatar}
                      size={35}
                    />
                    {/* nickname and questionInfo */}
                    <div className={styles.upDownInfo}>
                      <div
                        data-userId={detail.userId}
                        onClick={handleAvatarClick}
                        style={{
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '400',
                        }}>
                        {detail.nickname}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8b909f' }}>
                        {detail.publishTime}
                      </div>
                    </div>
                  </div>

                  <div>
                    {detail.tags.map((tag, index) => (
                      <Tag color="magenta" key={index}>
                        {tag}
                      </Tag>
                    ))}
                    <Tag icon={<QuestionCircleOutlined />} color="red">
                      question
                    </Tag>
                  </div>
                </div>

                {/* Content */}
                <div style={{ marginTop: '20px' }}>
                  <ReactMarkdown>{detail.content}</ReactMarkdown>
                </div>
              </div>
            </Card>
            <Divider />
            {/* answer area */}
            <Card
              title={`All Answers ${detail.commentCount}`}
              style={{ width: '100%', borderRadius: '6px' }}>
              {answers.map((item) => (
                <div
                  key={item.id}
                  style={{ display: 'flex', flexDirection: 'row' }}>
                  <Avatar
                    key={item.avatar}
                    src={item.avatar}
                    size={35}
                    data-userId={item.userId}
                    onClick={handleAvatarClick}
                    style={{
                      cursor: 'pointer',
                      position: 'relative',
                      top: '5px',
                      left: '5px',
                    }}
                  />
                  <div key={item.id} className={styles.commentBox}>
                    <div className={styles.firstRow}>
                      <div style={{ fontSize: '14px', fontWeight: '550' }}>
                        <span
                          data-userId={item.userId}
                          onClick={handleAvatarClick}
                          style={{ cursor: 'pointer' }}>
                          {item.nickname}
                        </span>
                      </div>
                      <div style={{ color: '#8b919e' }}>{item.createTime}</div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <ReactMarkdown>{item.content}</ReactMarkdown>
                    </div>
                    <LikeReply
                      answer={item}
                      item={item}
                      replyType={0}
                      fromUserId={userId}
                      toUserId={item.userId}
                      commentId={item.id}
                      replyId={item.id}
                      handleReplySubmit={handleReplySubmit}
                      isLike={item.isLiked}
                    />
                    {item.replyCount > 0 ? (
                      <Card
                        style={{
                          width: '100%',
                          borderRadius: '6px',
                          marginTop: '15px',
                        }}>
                        {item.replies.map((reply) => (
                          <div
                            key={reply.fromUserId}
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              marginTop: '20px',
                              marginBottom: '10px',
                            }}>
                            <Avatar
                              key={reply.fromUserId}
                              data-userId={reply.fromUserId}
                              onClick={handleAvatarClick}
                              src={reply.avatar}
                              size={35}
                              style={{
                                cursor: 'pointer',
                                position: 'relative',
                                top: '5px',
                                left: '5px',
                              }}
                            />
                            <div className={styles.commentBox}>
                              <div className={styles.firstRow}>
                                <div
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '550',
                                  }}>
                                  <span
                                    data-userId={reply.fromUserId}
                                    onClick={handleAvatarClick}
                                    style={{ cursor: 'pointer' }}>
                                    {reply.nickname}
                                  </span>
                                  <span
                                    style={{
                                      color: '#8b919e',
                                      fontWeight: '400',
                                    }}>
                                    &nbsp;&nbsp;reply&nbsp;&nbsp;
                                  </span>
                                  <span
                                    data-userId={reply.toUserId}
                                    onClick={handleAvatarClick}
                                    style={{ cursor: 'pointer' }}>
                                    {reply.toUserNickname}
                                  </span>
                                </div>
                                <div style={{ color: '#8b919e' }}>
                                  {reply.createTime}
                                </div>
                              </div>
                              <div style={{ marginTop: '10px' }}>
                                <div>{reply.content}</div>
                              </div>
                              <div
                                style={{
                                  marginTop: '10px',
                                }}>
                                <LikeReply
                                  answer={item}
                                  item={reply}
                                  replyType={1}
                                  fromUserId={userId}
                                  toUserId={reply.fromUserId}
                                  commentId={item.id}
                                  replyId={reply.id}
                                  handleReplySubmit={handleReplySubmit}
                                  isLike={item.isLiked}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </Card>
                    ) : (
                      <></>
                    )}
                    <Divider />
                  </div>
                </div>
              ))}
            </Card>
            <Divider />
            {/* your answer area */}
            <Card
              ref={scrollRef}
              title="Your Answer"
              style={{ width: '100%', borderRadius: '6px' }}>
              <MarkdownEditor
                value={answer}
                onChange={setAnswer}
                style={{ width: '100%', height: '400px' }}
              />
              <div
                style={{
                  display: 'flex',
                  marginTop: '25px',
                  marginRight: '20px',
                  borderRadius: '10px',
                  justifyContent: 'end',
                }}>
                <Button
                  type="primary"
                  shape="round"
                  onClick={handleAnswerSubmit}>
                  Submit
                </Button>
              </div>
            </Card>
          </Col>
          <Col span={7}>
            <Card style={{ width: '100%', borderRadius: '6px' }}>
              <div className={styles.userInfo} style={{ marginTop: '1px' }}>
                <Avatar
                  data-userId={detail.userId}
                  onClick={handleAvatarClick}
                  src={detail.avatar}
                  size={35}
                  style={{ cursor: 'pointer' }}
                />
                {/* nickname and questionInfo */}
                <div className={styles.upDownInfo}>
                  <div
                    data-userId={detail.userId}
                    onClick={handleAvatarClick}
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      cursor: 'pointer',
                    }}>
                    {detail.nickname}
                  </div>
                  <div style={{ fontSize: '13px', color: '#8b909f' }}>
                    {/* {'Backend Engineer'} */}
                    {detail.position ? detail.position : 'Unknown Position'}
                  </div>
                </div>
              </div>
              {userId === detail.userId ? (
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
                      query: { chatUserId: detail.userId, type: 0 },
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
              title="Directory"
              style={{
                width: '285px',
                borderRadius: '6px',
                marginTop: '12px',
                position: 'fixed',
              }}>
              <div className="navigation">
                <MarkdownNavbar source={detail.content} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {

  const cookies = ctx.req.headers.cookie;
  let parsedCookies = {};
  let userinfo = {};
  let detail = {};
  let answers = {};
  if (cookies) {
    parsedCookies = cookie.parse(cookies);
    userinfo = parsedCookies.user ? JSON.parse(parsedCookies.user) : null;
    if (!userinfo) {
      detail = await getQuestion(ctx.params.id);
      answers = await getAnswers(ctx.params.id);
    } else {
      detail = await getQuestion(ctx.params.id, userinfo.token);
      answers = await getAnswers(ctx.params.id, userinfo.token);
    }
  } else {
    detail = await getQuestion(ctx.params.id);
    answers = await getAnswers(ctx.params.id);
  }
  return {
    props: {
      detail,
      answers,
    },
  };
};

export default observer(QuestionDetail);
