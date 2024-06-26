package fr.epita.assistants.myide.presentation.rest.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RenameRequest {
    private String path;
    private String newName;
}