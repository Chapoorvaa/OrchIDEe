package fr.epita.assistants.myide.presentation.rest.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileResponse {

    String name;
    String path;
    String content;

    public FileResponse(String name, String path, String content) {
        this.name = name;
        this.path = path;
        this.content = content;
    }
}