package fr.epita.assistants.myide.presentation.rest.response;

import java.util.List;

public class ExecFeatureResponse {

    private String feature;
    private String project;
    private List<String> params;

    public ExecFeatureResponse(String feature, String project, List<String> params) {
        this.feature = feature;
        this.project = project;
        this.params = params;
    }

}
