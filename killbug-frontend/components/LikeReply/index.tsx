import styles from './index.module.scss';
import {
  LikeFilled,
  MessageFilled,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Input, Button, message } from 'antd';
import { like } from 'api/question';
import { useStore } from 'store';

const { TextArea } = Input;

const LikeReply = ({
  answer,
  item,
  replyType,
  commentId,
  replyId,
  fromUserId,
  toUserId,
  handleReplySubmit,
  isLike
}) => {
  const [showReplyArea, setShowReplyArea] = useState(false);
  const [isLiked, setIsLiked] = useState(isLike)
  const [replyContent, setReplyContent] = useState('');
  const likeIconColor = isLiked ? '#3f7ef7' : 'black';

  const store = useStore();
  const { userId } = store.user.userInfo;

  const handleLikeClick = () => {
    if (!userId) {
      message.error('Please Login first!');
    }
    console.log(replyType)
    const data = {
      userId: userId,
      likedId: replyId,
      type: replyType + 1,
    };
    like(data).then((res) => {
      setIsLiked(1 - isLiked);
      if (res) {
        item.likeCount += 1;
      } else {
        item.likeCount -= 1;
      }
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={styles.iconCount} onClick={handleLikeClick}>
          <LikeOutlined style={{ color: likeIconColor }} />
          <span style={{ marginLeft: '3px', color: likeIconColor }}>{item.likeCount}</span>
        </div>
        <div
          className={styles.iconCount}
          style={showReplyArea ? { color: '#3f7ef7' } : {}}
          onClick={() => setShowReplyArea(!showReplyArea)}>
          <MessageOutlined style={{ marginLeft: '12px' }} />
          {replyType === 1 ? (
            <span style={{ marginLeft: '5px', fontSize: '13px' }}>Reply</span>
          ) : (
            <span style={{ marginLeft: '3px' }}>{item.replyCount}</span>
          )}
        </div>
      </div>
      {showReplyArea && (
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <TextArea
            value={replyContent}
            allowClear
            showCount
            placeholder="Enter your comment"
            maxLength={200}
            onChange={(e) => {
              setReplyContent(e.target.value);
            }}>
          </TextArea>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '8px',
            }}>
            <Button
              style={{}}
              type="primary"
              onClick={() => {
                handleReplySubmit(
                  answer,
                  replyType,
                  commentId,
                  replyId,
                  fromUserId,
                  toUserId,
                  replyContent
                );
                setReplyContent('')
                setShowReplyArea(false)
              }}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeReply;
