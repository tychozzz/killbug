package com.killbug.bounty.service.impl;

import com.killbug.bounty.mapper.SolutionMapper;
import com.killbug.bounty.service.ISolutionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class SolutionServiceImpl implements ISolutionService {

    private final SolutionMapper solutionMapper;
}
