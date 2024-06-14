package fr.epita.assistants.myide.presentation.rest.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileReponse {
    String content;

    public FileReponse(String content) {
        this.content = content;
    }
}