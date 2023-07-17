package com.killbug.bounty.api;

import com.killbug.bounty.api.vo.BountyVO;

import java.util.List;

/**
 * @author ltyzzz
 * @email ltyzzz2000@gmail.com
 * @date 2023/4/19 21:48
 */
public interface RemoteBountyService {

    List<BountyVO> getBountyList();

    List<BountyVO> getMyBounties();

    List<BountyVO> getBountiesByUserId(Long id);

    List<BountyVO> getGrabbedBountiesByUserId(Long id);
}
