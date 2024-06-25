package fr.epita.assistants.myide.domain.entity.report;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Node;

import javax.validation.constraints.NotNull;
import java.util.List;

public record ChatbotFeatureReport(@NotNull String chatbotResponse, boolean isSuccess) implements Feature.ExecutionReport {
}