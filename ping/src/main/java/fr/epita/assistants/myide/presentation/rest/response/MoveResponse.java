package fr.epita.assistants.myide.presentation.rest.response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MoveResponse {
    private String src;
    private String dst;
}
