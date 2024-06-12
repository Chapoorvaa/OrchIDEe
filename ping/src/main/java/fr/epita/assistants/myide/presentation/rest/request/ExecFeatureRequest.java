package fr.epita.assistants.myide.presentation.rest.request;

import java.util.List;

public class ExecFeatureRequest {
    private String feature;
    private List<String> params;
    private String project;

    public String getFeature() {
        return feature;
    }

    public List<String> getParams() {
        return params;
    }

    public String getProject() {
        return project;
    }

    public void setParams(List<String> params) {
        this.params = params;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }
}
