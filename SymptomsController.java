package com.springai.symptoms_analyser_ai;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")

public class SymptomsController {

    private final SymptomsService symptomsService;

    public SymptomsController(SymptomsService symptomsService) {
        this.symptomsService = symptomsService;
    }

    @GetMapping("symptoms")
    public String createSymptom(@RequestParam String symptoms,
                                      @RequestParam String place) {
        return symptomsService.createSymptom(symptoms,place);
    }
}
