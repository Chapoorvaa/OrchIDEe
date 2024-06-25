package fr.epita.assistants.myide.domain.entity.any;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import fr.epita.assistants.myide.domain.entity.ExtraFeatures;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.report.ChatbotFeatureReport;
import fr.epita.assistants.myide.utils.Logger;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class AnyChatbot implements Feature {

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            String model = params[0].toString();
            String prompt = params[1].toString();
            int contextLength = 4096;
            HttpResponse<InputStream> response
                    = Unirest.post("http://localhost:11434/api/generate")
                    .body("{\"model\":\"" + model + "\"," +
                            "\"prompt\":\"" + prompt + "\"," +
                            " \"options\":{\"num_ctx\":" + contextLength + "}" +
                            "}")
                    .asBinary();

            InputStream inputStream = response.getBody();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            ObjectMapper objectMapper = new ObjectMapper();
            StringBuilder wholeResponse = new StringBuilder();

            String line;
            while ((line = reader.readLine()) != null) {
                JsonNode jsonNode = objectMapper.readTree(line);

                wholeResponse.append(jsonNode.get("response").asText());
            }

            reader.close();

            return new ChatbotFeatureReport(wholeResponse.toString(), true);
        } catch (Exception ignored) {
            return new ChatbotFeatureReport("", false);
        }
    }

    @Override
    public Type type() {
        return ExtraFeatures.Features.Any.CHATBOT;
    }
}
