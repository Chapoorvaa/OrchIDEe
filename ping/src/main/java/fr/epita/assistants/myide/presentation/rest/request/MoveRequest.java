package fr.epita.assistants.myide.presentation.rest.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoveRequest {
    private String src;
    private String dst;
}
