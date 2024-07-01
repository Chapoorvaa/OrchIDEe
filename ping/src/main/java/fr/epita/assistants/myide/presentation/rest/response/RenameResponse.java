package fr.epita.assistants.myide.presentation.rest.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RenameResponse {
    private String newName;
    private String oldPath;
}