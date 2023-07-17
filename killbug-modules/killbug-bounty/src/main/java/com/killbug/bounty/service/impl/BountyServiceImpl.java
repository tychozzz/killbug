package com.killbug.bounty.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.killbug.bounty.api.domain.Bounty;
import com.killbug.bounty.api.vo.BountyVO;
import com.killbug.bounty.dto.BountyDTO;
import com.killbug.bounty.dto.FinishBountyDTO;
import com.killbug.bounty.dto.GrabBountyDTO;
import com.killbug.bounty.mapper.BountyMapper;
import com.killbug.bounty.service.IBountyService;
import com.killbug.common.core.exception.ServiceException;
import com.killbug.common.core.utils.BeanCopyUtils;
import com.killbug.common.core.vo.ListVO;
import com.killbug.common.redis.utils.RedisUtils;
import com.killbug.common.satoken.utils.LoginHelper;
import com.killbug.question.api.domain.Question;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class BountyServiceImpl implements IBountyService {

    private final BountyMapper bountyMapper;

    @DubboReference
    private RemoteUserService remoteUserService;

    @Override
    public Long createBounty(BountyDTO bountyDTO) {
        Long userId = LoginHelper.getUserId();
        User user = remoteUserService.getUserById(userId);
        if (user.getBalance() < bountyDTO.getReward()) {
            throw new ServiceException("Your balance is insufficient!");
        }
        Bounty bounty = BeanCopyUtils.copy(bountyDTO, Bounty.class);
        bounty.setPublisherId(userId);
        bountyMapper.insert(bounty);
        List<String> tags = bountyDTO.getTags();
        RedisUtils.setCacheSet("tags:" + bounty.getId(), new HashSet<>(bountyDTO.getTags()));
        tags.forEach(t -> {
            Set<String> set = RedisUtils.getCacheSet("tagName:" + t);
            set.add(bounty.getId().toString());
            RedisUtils.setCacheSet("tagName:" + t, set);
        });
        remoteUserService.decrBalanceById(userId, bountyDTO.getReward());
        return bounty.getId();
    }

    @Override
    public ListVO<BountyVO> getBountyList(Integer pageNum, Integer pageSize, Integer status) {
        Page<Bounty> page = new Page<>(pageNum, pageSize);
        IPage<Bounty> bountyIPage;
        List<OrderItem> orders = new ArrayList<>();
        orders.add(OrderItem.asc("status"));
        orders.add(OrderItem.desc("create_time"));
        page.setOrders(orders);
        if (status == 0) {
            bountyIPage = bountyMapper.selectPage(page, null);
        } else {
            bountyIPage = bountyMapper.selectPage(page, new QueryWrapper<Bounty>().eq("status", status));
        }
        ListVO<BountyVO> result = new ListVO<>();
        result.setCurrent(bountyIPage.getCurrent());
        result.setPages(bountyIPage.getPages());
        result.setSize(bountyIPage.getSize());
        result.setTotal(bountyIPage.getTotal());
        List<Bounty> records = bountyIPage.getRecords();
        List<BountyVO> collect = records.stream().map(r -> {
            BountyVO q = new BountyVO();
            BeanUtils.copyProperties(r, q);
            Set<String> set = RedisUtils.getCacheSet("tags:" + r.getId().toString());
            q.setTags(new ArrayList<>(set));
            return q;
        }).collect(Collectors.toList());
        result.setRecords(collect);
        return result;
    }

    @Override
    public BountyVO getBountyById(Long id) {
        Bounty bounty = bountyMapper.selectById(id);
        BountyVO vo = new BountyVO();
        BeanCopyUtils.copy(bounty, vo);
        Set<String> set = RedisUtils.getCacheSet("tags:" + bounty.getId().toString());
        vo.setTags(new ArrayList<>(set));
        return vo;
    }

    @Override
    public List<BountyVO> getBountyList() {
        List<Bounty> bounties = bountyMapper.selectList();
        List<BountyVO> collect = bounties.stream().map(b -> {
            BountyVO vo = new BountyVO();
            BeanUtils.copyProperties(b, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + b.getId().toString());
            vo.setTags(new ArrayList<>(set));
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    public void grabBounty(GrabBountyDTO grabBountyDTO) {
        Long idInt = Long.valueOf(grabBountyDTO.getId());
        Long userId = LoginHelper.getUserId();
        Bounty bounty = bountyMapper.selectById(idInt);
        if (bounty.getSolverId() != null || bounty.getStatus() != 1) {
            throw new ServiceException("The order has been grabbed!");
        }
        if (bounty.getPublisherId().equals(userId)) {
            throw new ServiceException("You cannot grab your own order!");
        }
        bounty.setSolverId(userId);
        bounty.setStatus(2);
        bountyMapper.updateById(bounty);
    }

    @Override
    @Transactional
    public void closeBounty(GrabBountyDTO grabBountyDTO) {
        Long idInt = Long.valueOf(grabBountyDTO.getId());
        Long userId = LoginHelper.getUserId();
        Bounty bounty = bountyMapper.selectById(idInt);
        if (bounty.getStatus() == 3) {
            throw new ServiceException("The order has been solved!");
        }
        if (bounty.getStatus() == 4) {
            throw new ServiceException("The order has been closed!");
        }
        if (!bounty.getPublisherId().equals(userId)) {
            throw new ServiceException("No permission to close!");
        }
        bounty.setStatus(4);
        bountyMapper.updateById(bounty);
        remoteUserService.incrBalanceById(userId, bounty.getReward());
    }

    @Override
    public List<BountyVO> getMyBounties() {
        Long userId = LoginHelper.getUserId();
        List<Bounty> bounties = bountyMapper.selectList(new QueryWrapper<Bounty>().eq("publisher_id", userId));
        List<BountyVO> collect = bounties.stream().map(b -> {
            BountyVO vo = new BountyVO();
            BeanUtils.copyProperties(b, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + b.getId().toString());
            vo.setTags(new ArrayList<>(set));
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    public List<BountyVO> getBountiesByUserId(Long id) {
        List<Bounty> bounties = bountyMapper.selectList(new QueryWrapper<Bounty>().eq("publisher_id", id).orderByDesc("create_time"));
        List<BountyVO> collect = bounties.stream().map(b -> {
            BountyVO vo = new BountyVO();
            BeanUtils.copyProperties(b, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + b.getId().toString());
            vo.setTags(new ArrayList<>(set));
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void finishBounty(FinishBountyDTO finishBountyDTO) {
        Long idInt = Long.valueOf(finishBountyDTO.getId());
        Long userId = LoginHelper.getUserId();
        Bounty bounty = bountyMapper.selectById(idInt);
        System.out.println(bounty);
        if (bounty.getStatus() == 1) {
            throw new ServiceException("No people grab this order!");
        }
        if (bounty.getStatus() == 3) {
            throw new ServiceException("The order has been solved!");
        }
        if (bounty.getStatus() == 4) {
            throw new ServiceException("The order has been closed!");
        }
        if (!bounty.getPublisherId().equals(userId)) {
            throw new ServiceException("No permission to close!");
        }
        bounty.setStatus(3);
        bountyMapper.updateById(bounty);
        remoteUserService.incrBalanceById(Long.valueOf(finishBountyDTO.getSolverId()), bounty.getReward());
    }

    @Override
    public void cancelBounty(GrabBountyDTO grabBountyDTO) {
        Long idInt = Long.valueOf(grabBountyDTO.getId());
        Long userId = LoginHelper.getUserId();
        Bounty bounty = bountyMapper.selectById(idInt);
        System.out.println(bounty);
        if (bounty.getStatus() == 1) {
            throw new ServiceException("No people grab this order!");
        }
        if (bounty.getStatus() == 3) {
            throw new ServiceException("The order has been solved!");
        }
        if (bounty.getStatus() == 4) {
            throw new ServiceException("The order has been closed!");
        }
        if (!bounty.getPublisherId().equals(userId)) {
            throw new ServiceException("No permission to cancel!");
        }
        bounty.setStatus(1);
        bounty.setSolverId(null);
        bountyMapper.updateById(bounty);
    }

    @Override
    public List<BountyVO> getGrabbedBountiesByUserId(Long id) {
        List<Bounty> bounties = bountyMapper.selectList(new QueryWrapper<Bounty>().eq("solver_id", id).orderByDesc("create_time"));
        List<BountyVO> collect = bounties.stream().map(b -> {
            BountyVO vo = new BountyVO();
            BeanUtils.copyProperties(b, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + b.getId().toString());
            vo.setTags(new ArrayList<>(set));
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }

    @Override
    public List<BountyVO> getMyGrabbedBounties() {
        Long userId = LoginHelper.getUserId();
        List<Bounty> bounties = bountyMapper.selectList(new QueryWrapper<Bounty>().eq("solver_id", userId));
        List<BountyVO> collect = bounties.stream().map(b -> {
            BountyVO vo = new BountyVO();
            BeanUtils.copyProperties(b, vo);
            Set<String> set = RedisUtils.getCacheSet("tags:" + b.getId().toString());
            vo.setTags(new ArrayList<>(set));
            return vo;
        }).collect(Collectors.toList());
        return collect;
    }
}
