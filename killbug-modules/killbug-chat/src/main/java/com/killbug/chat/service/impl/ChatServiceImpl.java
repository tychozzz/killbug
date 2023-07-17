package com.killbug.chat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.killbug.chat.api.domain.Chat;
import com.killbug.chat.api.domain.PrivateMessage;
import com.killbug.chat.dto.MessageDTO;
import com.killbug.chat.mapper.ChatMapper;
import com.killbug.chat.mapper.PrivateMessageMapper;
import com.killbug.chat.service.IChatService;
import com.killbug.chat.vo.ChatRecordVO;
import com.killbug.chat.vo.ChatVO;
import com.killbug.common.core.utils.BeanCopyUtils;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/21 23:01
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements IChatService {

    private final ChatMapper chatMapper;

    private final PrivateMessageMapper privateMessageMapper;

    @DubboReference
    private RemoteUserService remoteUserService;

    @Override
    public List<ChatVO> getChatList(Integer type) {
        Long userId = LoginHelper.getUserId();
        List<Chat> chats = chatMapper.selectList(new QueryWrapper<Chat>()
                .eq("receiver_id", userId)
                .or().eq("sender_id", userId));
        chats = chats.stream().filter(c -> c.getType().equals(type)).collect(Collectors.toList());
        List<ChatVO> chatList = new ArrayList<>();
        chats.forEach(c -> {
            Long receiverId = c.getReceiverId();
            Long senderId = c.getSenderId();
            ChatVO chatVO = new ChatVO();
            if (userId.equals(receiverId)) {
                chatVO.setUserId(senderId);
                User u = remoteUserService.getUserById(senderId);
                chatVO.setNickname(u.getNickname());
                chatVO.setAvatar(u.getAvatar());
            } else {
                chatVO.setUserId(receiverId);
                User u = remoteUserService.getUserById(receiverId);
                chatVO.setNickname(u.getNickname());
                chatVO.setAvatar(u.getAvatar());
            }
            chatVO.setChatId(c.getId());
            chatVO.setUpdateTime(c.getUpdateTime());
            chatVO.setType(type);
            chatList.add(chatVO);
        });
        chatList.sort(Comparator.comparing(ChatVO::getUpdateTime).reversed());
        return chatList;
    }

    @Override
    public List<ChatRecordVO> getChatRecords(Long uId, Integer type) {
        Long userId = LoginHelper.getUserId();
        LambdaQueryWrapper<PrivateMessage> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.and(qw -> qw.eq(PrivateMessage::getReceiverId, userId).eq(PrivateMessage::getSenderId, uId))
                .or(qw -> qw.eq(PrivateMessage::getSenderId, userId).eq(PrivateMessage::getReceiverId, uId));
        List<PrivateMessage> privateMessages = privateMessageMapper.selectList(queryWrapper);
        privateMessages = privateMessages.stream().filter(p -> p.getType().equals(type)).collect(Collectors.toList());
        privateMessages.sort(Comparator.comparing(PrivateMessage::getCreateTime));
        List<ChatRecordVO> list = new ArrayList<>();
        privateMessages.forEach(p -> {
            ChatRecordVO chatRecordVO = new ChatRecordVO();
            BeanCopyUtils.copy(p, chatRecordVO);
            list.add(chatRecordVO);
        });
        return list;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Date sendMessage(MessageDTO messageDTO) {
        Long senderId = LoginHelper.getUserId();
        Long receiverId = Long.valueOf(messageDTO.getReceiverId());
        QueryWrapper<Chat> queryWrapper = new QueryWrapper<>();
        Integer type = messageDTO.getType();
        queryWrapper.eq("type", type)
                .and(wrapper -> wrapper.nested(nestedWrapper -> nestedWrapper.eq("sender_id", senderId).eq("receiver_id", receiverId))
                        .or(nestedWrapper -> nestedWrapper.eq("receiver_id", senderId).eq("sender_id", receiverId)));
        Chat chat = chatMapper.selectOne(queryWrapper);
        // insert or update chat
        if (chat == null) {
            chat = new Chat();
            chat.setSenderId(senderId);
            chat.setReceiverId(receiverId);
            chat.setType(messageDTO.getType());
            chatMapper.insert(chat);
        } else {
            chat.setUpdateTime(new Date());
            chatMapper.updateById(chat);
        }
        // insert message
        PrivateMessage privateMessage = new PrivateMessage();
        privateMessage.setSenderId(senderId);
        privateMessage.setReceiverId(receiverId);
        privateMessage.setType(type);
        privateMessage.setContent(messageDTO.getContent());
        privateMessageMapper.insert(privateMessage);
        return chat.getUpdateTime();
    }

    @Override
    public Long createChat(String userId, Integer type) {
        Chat chat = new Chat();
        Long sender = LoginHelper.getUserId();
        chat.setSenderId(sender);
        chat.setReceiverId(Long.valueOf(userId));
        chat.setType(type);
        chatMapper.insert(chat);
        return chat.getId();
    }
}
