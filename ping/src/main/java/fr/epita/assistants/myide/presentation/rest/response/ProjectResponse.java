package fr.epita.assistants.myide.presentation.rest.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectResponse {
    public String name;
    public String path;
}
