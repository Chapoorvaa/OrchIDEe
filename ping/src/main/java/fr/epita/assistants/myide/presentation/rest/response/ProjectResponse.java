package fr.epita.assistants.myide.presentation.rest.response;

import lombok.Getter;
import lombok.Setter;

import java.beans.ConstructorProperties;
import java.nio.file.Path;

@Getter
@Setter
public class ProjectResponse {

    public String name;
    public String path;

    public ProjectResponse(String name, String path) {
        this.name = name;
        this.path = path;
    }
}
