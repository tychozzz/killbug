package com.killbug.question.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.killbug.common.core.utils.BeanCopyUtils;
import com.killbug.common.redis.utils.RedisUtils;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.question.api.domain.Question;
import com.killbug.common.core.vo.ListVO;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.question.dto.QuestionDTO;
import com.killbug.question.mapper.QuestionMapper;
import com.killbug.question.service.IQuestionService;
import com.killbug.question.service.IThumbupService;
import com.killbug.user.api.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/3/21 16:39
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class QuestionServiceImpl implements IQuestionService {

    private final QuestionMapper questionMapper;

    private final IThumbupService thumbupService;

    @Override
    public Long createQuestion(QuestionDTO questionDTO) {
        System.out.println(questionDTO);
        Long userId = LoginHelper.getUserId();
        Question question = BeanCopyUtils.copy(questionDTO, Question.class);
        question.setUserId(userId);
        questionMapper.insert(question);
        List<String> tags = questionDTO.getTags();
        RedisUtils.setCacheSet("tags:" + question.getId(), new HashSet<>(tags));
        tags.forEach(t -> {
            Set<String> set = RedisUtils.getCacheSet("tagName:" + t);
            System.out.println(set);
            set.add(question.getId().toString());
            RedisUtils.setCacheSet("tagName:" + t, set);
        });
        return question.getId();
    }

    @Override
    public ListVO<QuestionVO> getQuestionList(Integer pageNum, Integer pageSize, Integer type) {

        Long userId = null;
        if (LoginHelper.isLogin()) {
            userId = LoginHelper.getUserId();
        }

        Page<Question> page = new Page<>(pageNum, pageSize);
        IPage<Question> questionIPage;
        if (type == 0 || type == 1) {
            // order by createTime
            page.addOrder(OrderItem.desc("create_time"));
        }
        if (type == 2) {
            // order by likeCount
            page.addOrder(OrderItem.desc("like_count"));
        }
        questionIPage = questionMapper.selectPage(page, null);
        ListVO<QuestionVO> result = new ListVO<>();
        result.setCurrent(questionIPage.getCurrent());
        result.setPages(questionIPage.getPages());
        result.setSize(questionIPage.getSize());
        result.setTotal(questionIPage.getTotal());
        List<Question> records = questionIPage.getRecords();
        Long uId = userId;
        List<QuestionVO> collect = records.stream().map(r -> {
            QuestionVO q = new QuestionVO();
            BeanUtils.copyProperties(r, q);
            Set<String> set = RedisUtils.getCacheSet("tags:" + r.getId().toString());
            q.setTags(new ArrayList<>(set));
            if (uId != null && thumbupService.selectOne(r.getId(), uId, 0) != null) {
                q.setIsLiked(1);
            } else {
                q.setIsLiked(0);
            }
            return q;
        }).collect(Collectors.toList());
        result.setRecords(collect);
        return result;
    }

    @Override
    public List<QuestionVO> getQuestionList() {

        Long userId = null;
        if (LoginHelper.isLogin()) {
            userId = LoginHelper.getUserId();
        }

        System.out.println(userId);

        List<Question> questions = questionMapper.selectList();
        Long uId = userId;
        List<QuestionVO> collect = questions.stream().map(q -> {
            QuestionVO vo = new QuestionVO();
            BeanUtils.copyProperties(q, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + q.getId().toString());
            vo.setTags(new ArrayList<>(set));
            if (uId != null && thumbupService.selectOne(q.getId(), uId, 0) != null) {
                vo.setIsLiked(1);
            } else {
                vo.setIsLiked(0);
            }
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    public QuestionVO getQuestionById(Long id) {

        Long userId = null;
        if (LoginHelper.isLogin()) {
            userId = LoginHelper.getUserId();
        }

        Question question = questionMapper.selectById(id);
        QuestionVO q = new QuestionVO();
        BeanUtils.copyProperties(question, q);
        Set<String> set = RedisUtils.getCacheSet("tags:" + q.getId().toString());
        q.setTags(new ArrayList<>(set));
        if (userId != null && thumbupService.selectOne(q.getId(), userId, 0) != null) {
            q.setIsLiked(1);
        } else {
            q.setIsLiked(0);
        }
        System.out.println("点赞用户:" + userId);
        System.out.println("是否点赞:" + q.getIsLiked());
        return q;
    }

    @Override
    public void incrCommentCountById(Long id) {
        questionMapper.incrCommentCountById(id);
    }

    @Override
    public List<QuestionVO> getMyQuestions() {
        Long userId = LoginHelper.getUserId();
        List<Question> questions = questionMapper.selectList(new QueryWrapper<Question>().eq("user_id", userId));
        List<QuestionVO> collect = questions.stream().map(q -> {
            QuestionVO vo = new QuestionVO();
            BeanUtils.copyProperties(q, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + q.getId().toString());
            vo.setTags(new ArrayList<>(set));
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    public List<QuestionVO> getQuestionsByUserId(Long id) {

        Long userId = null;
        if (LoginHelper.isLogin()) {
            userId = LoginHelper.getUserId();
        }

        List<Question> questions = questionMapper.selectList(new QueryWrapper<Question>().eq("user_id", id).orderByDesc("create_time"));
        Long uId = userId;
        List<QuestionVO> collect = questions.stream().map(q -> {
            QuestionVO vo = new QuestionVO();
            BeanUtils.copyProperties(q, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + q.getId().toString());
            vo.setTags(new ArrayList<>(set));
            if (uId != null && thumbupService.selectOne(q.getId(), uId, 0) != null) {
                vo.setIsLiked(1);
            } else {
                vo.setIsLiked(0);
            }
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }
}
