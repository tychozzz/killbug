package com.killbug.bounty.controller;

import com.killbug.bounty.service.ISolutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RestController
public class SolutionController {
    private final ISolutionService solutionService;
}
