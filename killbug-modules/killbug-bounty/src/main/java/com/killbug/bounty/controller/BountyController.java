package com.killbug.bounty.controller;

import cn.hutool.core.util.BooleanUtil;
import com.killbug.bounty.api.domain.Bounty;
import com.killbug.bounty.api.vo.BountyVO;
import com.killbug.bounty.dto.BountyDTO;
import com.killbug.bounty.dto.FinishBountyDTO;
import com.killbug.bounty.dto.GrabBountyDTO;
import com.killbug.bounty.mapper.BountyMapper;
import com.killbug.bounty.service.IBountyService;
import com.killbug.common.core.domain.R;
import com.killbug.common.core.vo.ListVO;
import com.killbug.common.redis.utils.RedisUtils;
import com.killbug.question.api.domain.Question;
import com.killbug.question.api.vo.QuestionVO;
import com.killbug.user.api.RemoteUserService;
import com.killbug.user.api.domain.User;
import lombok.RequiredArgsConstructor;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Validated
@RequiredArgsConstructor
@RestController
public class BountyController {

    private final IBountyService bountyService;

    @DubboReference
    private RemoteUserService remoteUserService;

    private final BountyMapper bountyMapper;

    @PostMapping("createBounty")
    public R<Long> createBounty(@Validated @RequestBody BountyDTO bountyDTO) {
        Long bountyId = bountyService.createBounty(bountyDTO);
        return R.ok(bountyId);
    }

    @GetMapping("/getBountyList/{pageNum}/{pageSize}/{status}")
    public R<ListVO<BountyVO>> getBountyList(@PathVariable("pageNum") Integer pageNum,
                                             @PathVariable("pageSize") Integer pageSize,
                                             @PathVariable("status") Integer status) {
        ListVO<BountyVO> result = bountyService.getBountyList(pageNum, pageSize, status);
        List<BountyVO> records = result.getRecords();
        records.stream().forEach(r -> {
            User user = remoteUserService.getUserById(r.getPublisherId());
            r.setPublisherAvatar(user.getAvatar());
            r.setPublisherNickname(user.getNickname());
        });
        return R.ok(result);
    }

    @GetMapping("/getBounty/{id}")
    public R<BountyVO> getBounty(@PathVariable("id") String id) {
        Long idInt = Long.valueOf(id);
        BountyVO q = bountyService.getBountyById(idInt);
        User u1 = remoteUserService.getUserById(q.getPublisherId());
        q.setPublisherNickname(u1.getNickname());
        q.setPublisherAvatar(u1.getAvatar());
        if (q.getSolverId() != null) {
            User u2 = remoteUserService.getUserById(q.getSolverId());
            q.setSolverNickname(u2.getNickname());
            q.setSolverAvatar(u2.getAvatar());
        }
        return R.ok(q);
    }

    @PostMapping("/grabBounty")
    public R<Void> grabBounty(@RequestBody @Validated GrabBountyDTO grabBountyDTO) {
        bountyService.grabBounty(grabBountyDTO);
        return R.ok();
    }

    @PostMapping("/closeBounty")
    public R<Void> closeBounty(@RequestBody @Validated GrabBountyDTO grabBountyDTO) {
        bountyService.closeBounty(grabBountyDTO);
        return R.ok();
    }

    @PostMapping("/cancelBounty")
    public R<Void> cancelBounty(@RequestBody @Validated GrabBountyDTO grabBountyDTO) {
        bountyService.cancelBounty(grabBountyDTO);
        return R.ok();
    }

    @PostMapping("/finishBounty")
    public R<Void> finishBounty(@RequestBody @Validated FinishBountyDTO finishBountyDTO) {
        bountyService.finishBounty(finishBountyDTO);
        return R.ok();
    }

    @GetMapping("/getMyBounties")
    public R<List<BountyVO>> getMyBounties() {
        List<BountyVO> list = bountyService.getMyBounties();
        return R.ok(list);
    }

    @GetMapping("/getBountiesByUserId/{id}")
    public R<List<BountyVO>> getBountiesByUserId(@PathVariable String id) {
        Long idInt = Long.valueOf(id);
        List<BountyVO> list = bountyService.getBountiesByUserId(idInt);
        return R.ok(list);
    }

    @GetMapping("/getMyGrabbedBounties")
    public R<List<BountyVO>> getMyGrabbedBounties() {
        List<BountyVO> list = bountyService.getMyGrabbedBounties();
        return R.ok(list);
    }

    @GetMapping("/getGrabbedBountiesByUserId/{id}")
    public R<List<BountyVO>> getGrabbedBountiesByUserId(@PathVariable String id) {
        Long idInt = Long.valueOf(id);
        List<BountyVO> list = bountyService.getGrabbedBountiesByUserId(idInt);
        return R.ok(list);
    }

    @PostMapping("/addTags")
    public R<Void> addTags() {
        List<Bounty> bounties = bountyMapper.selectList();
        String[] s = new String[]{"Backend", "Frontend", "AI", "Android", "IOS"};
        Random random = new Random();
        bounties.forEach(q -> {
            Set<String> set = new HashSet<>();
            set.add(s[random.nextInt(s.length)]);
            set.add(s[random.nextInt(s.length)]);
            RedisUtils.setCacheSet("tags:" + q.getId(), set);
        });
        return R.ok();
    }

    @PostMapping("/addIdToTag")
    public R<Void> addIdToTag() {
        List<Bounty> bounties = bountyMapper.selectList();
        bounties.forEach(b -> {
            Set<String> set = RedisUtils.getCacheSet("tags:" + b.getId());
            for (String s : set) {
                Set<String> idSet = RedisUtils.getCacheSet("tagName:" + s);
                idSet.add(b.getId().toString());
                RedisUtils.setCacheSet("tagName:" + s, idSet);
            }
        });
        return R.ok();
    }
}
