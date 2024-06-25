package fr.epita.assistants.myide.presentation.rest.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileResponse {
    String name;
    String path;
    String content;
}