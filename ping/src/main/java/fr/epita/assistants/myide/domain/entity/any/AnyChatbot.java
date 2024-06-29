package fr.epita.assistants.myide.domain.entity.any;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import fr.epita.assistants.myide.domain.entity.ExtraFeatures;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.report.ChatbotFeatureReport;
import fr.epita.assistants.myide.utils.Logger;

public class AnyChatbot implements Feature {

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            AnyAspect aspect = (AnyAspect) project.getAspects().stream().filter(e -> e instanceof AnyAspect).findFirst().orElse(null);

            String model = params[0].toString();
            String prompt = params[1].toString();
            int contextLength = 4096;
            HttpResponse<JsonNode> response
                    = Unirest.post("http://localhost:11434/api/generate")
                    .body("{\"model\":\"" + model + "\"," +
                            "\"prompt\":\"" + prompt + "\"," +
                            " \"options\":{\"num_ctx\":" + contextLength + "}," +
                            "\"stream\": false," +
                            "\"context\": " + aspect.context + "" +
                            "}")
                    .asJson();

            aspect.context = response.getBody().getObject().get("context").toString();

            return new ChatbotFeatureReport(response.getBody().getObject().getString("response"), true);
        } catch (Exception e) {
            Logger.logError("An error occured chatbotting: " + e.getMessage());
            return new ChatbotFeatureReport("", false);
        }
    }

    @Override
    public Type type() {
        return ExtraFeatures.Features.Any.CHATBOT;
    }
}
