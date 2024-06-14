package fr.epita.assistants.myide.presentation.rest.response;

import lombok.Getter;
import lombok.Setter;

import java.beans.ConstructorProperties;
import java.nio.file.Path;

@Getter
@Setter
public class ProjectResponse {

    public String name;
    public Path rootPath;

    public ProjectResponse(String name, Path rootPath) {
        this.name = name;
        this.rootPath = rootPath;
    }
}
