import styles from './index.module.scss';
import { Space, message } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import { like } from 'api/question';

const IconCount = ({ item }) => {
  const store = useStore();
  const { userId } = store.user.userInfo;

  const [isLiked, setIsLiked] = useState(item.isLiked);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!userId) {
      message.error('Please Login first!');
    }
    console.log(item)
    const data = {
      userId: userId,
      likedId: item.id,
      type: 0,
    };
    console.log(data);
    like(data).then((res) => {
      setIsLiked(1 - isLiked);
      if (res) {
        item.likeCount += 1;
      } else {
        item.likeCount -= 1;
      }
    });
  };

  return (
    <Space className={styles.iconText} onClick={handleLikeClick}>
      {isLiked === 0 ? (
        <LikeOutlined />
      ) : (
        <LikeOutlined style={{ color: '#3f7ef7' }} />
      )}
      {isLiked === 0 ? (
        <span>{item.likeCount}</span>
      ) : (
        <span style={{ color: '#3f7ef7' }}>{item.likeCount}</span>
      )}
    </Space>
  );
};

export default observer(IconCount);
