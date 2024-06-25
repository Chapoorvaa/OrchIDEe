package fr.epita.assistants.myide.presentation.rest.response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class UpdateResponse {
    private String path;
    private int from;
    private int to;
    private String content;
}
