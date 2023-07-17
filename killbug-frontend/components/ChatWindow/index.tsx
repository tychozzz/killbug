import type { NextPage } from 'next';
import { Avatar, Card, Input, message, Image } from 'antd';
// import io from "socket.io-client";
import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import { useStore } from 'store';
import moment from 'moment';
import { sendMessage } from 'api/chat';

const ChatWindow: NextPage = ({
  current,
  currentRecords,
  chatUserId,
  chatNickname,
  chatAvatar,
}) => {
  const [records, setRecords] = useState([]);
  const [inputText, setInputText] = useState('');
  const [websocket, setWebsocket] = useState(null);
  const store = useStore();
  const { userId, avatar } = store.user.userInfo;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatUserId) {
      scrollToBottom();
    }
    const newWebsocket = new WebSocket(`ws://127.0.0.1:8099/chat/${userId}`);
    newWebsocket.onopen = () => {
      console.log('WebSocket connected');
    };
    newWebsocket.onmessage = (message) => {
      // const data = JSON.parse(message.data);
      const datas = message.data.split(':');
      const senderId = datas[0];
      const content = datas[1];
      const data = {
        content: content,
        senderId: senderId,
        receiverId: userId,
        createTime: new Date(),
      };
      setRecords((prevState) => [...prevState, data]);
    };
    setWebsocket(newWebsocket);
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop =
        messagesEndRef.current.scrollHeight -
        messagesEndRef.current.clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [records]);

  useEffect(() => {
    setRecords(currentRecords);
    console.log('records', records);
    // const date = new Date();
    // const formattedDate = moment(date).format('MM-DD HH:mm');
    // console.log('date', formattedDate);
  }, [currentRecords]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    let type = +current - 1;
    // console.log(type)
    console.log(chatUserId);
    if (!chatUserId) {
      message.warning('Please select one user before chatting!');
      return;
    }
    if (inputText && websocket) {
      let input = chatUserId + ':' + inputText;
      console.log(input);
      websocket.send(input);
      const data = {
        receiverId: chatUserId,
        content: inputText,
        type: type,
      };
      sendMessage(data).then((res) => {
        const msg = {
          content: inputText,
          senderId: userId,
          receiverId: chatUserId,
          createTime: res,
        };
        setRecords((prevState) => [...prevState, msg]);
      });
      setInputText('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* chat content */}
      <Card
        ref={messagesEndRef}
        title={chatNickname}
        style={{ height: '400px', overflow: 'auto' }}>
        {!chatUserId ? (
          <div>
            <Image
              width={150}
              src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/message-tip.png"
            />
            <div style={{ color: '#8b909f' }}>
              No Chat Initiated or Selected
            </div>
          </div>
        ) : records && records.length > 0 ? (
          <div style={{ padding: '10px 10px' }}>
            {records.map((item, index) => (
              <div key={item.content}>
                {(index === 0 ||
                  moment
                    .duration(
                      moment(records[index].createTime).diff(
                        moment(records[index - 1].createTime)
                      )
                    )
                    .asMinutes() > 2) && (
                  <div style={{ marginBottom: '5px', marginTop: '5px' }}>
                    {moment(item.createTime).format('MM-DD HH:mm')}
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: item.senderId === userId ? 'end' : 'start',
                    marginTop: '12px',
                  }}>
                  {item.senderId === userId ? (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'end',
                          maxWidth: '250px',
                          wordBreak: 'break-word',
                          textAlign: 'left',
                          marginRight: '10px',
                          backgroundColor: '#8cb7ed',
                          color: 'white',
                          padding: '10px 10px',
                          borderRadius: '6px',
                        }}>
                        {item.content}
                      </div>
                      <Avatar src={avatar}></Avatar>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Avatar src={chatAvatar}></Avatar>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'start',
                          maxWidth: '250px',
                          wordBreak: 'break-word',
                          textAlign: 'left',
                          marginLeft: '10px',
                          backgroundColor: '#f7f7f7',
                          padding: '10px 10px',
                          borderRadius: '6px',
                        }}>
                        {item.content}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#8b909f' }}>No Message Sent Before</div>
        )}
      </Card>
      <div
        style={{
          flexGrow: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Input.TextArea
          style={{ height: '80%', boxSizing: 'border-box' }}
          bordered={false}
          value={inputText}
          onPressEnter={handleMessageSend}
          onChange={(e) => {
            setInputText(e.target.value);
          }}></Input.TextArea>
      </div>
    </div>
  );
};

export default ChatWindow;
