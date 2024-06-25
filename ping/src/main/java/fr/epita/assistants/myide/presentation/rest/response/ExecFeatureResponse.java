package fr.epita.assistants.myide.presentation.rest.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ExecFeatureResponse {
    private String feature;
    private String project;
    private List<String> params;
}
