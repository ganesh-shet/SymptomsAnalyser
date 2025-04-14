package com.springai.symptoms_analyser_ai;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class SymptomsService {
    public final ChatModel chatModel;

    public SymptomsService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createSymptom(String symptoms, String place) {
        var template = """
        You are a healthcare assistant. A user reports the following symptoms:
        {symptoms}

        Respond with:
        1. Possible causes
        2. Urgency level (low, medium, high)
        3. Recommended next steps
        4.Recommend some temporary medication as a first-aid.
        5. Recommend nearby hospitals. {place}
        """;

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Map<String, Object> params = Map.of("place", place, "symptoms", symptoms);

        Prompt prompt = promptTemplate.create(params);

        var response = chatModel.call(prompt);

        return response.getResults().get(0).getOutput().getText();

    }
}
