package fr.epita.assistants.myide.presentation.rest.response;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateResponse {

    private String path;
    private int from;
    private int to;
    private String content;

    public UpdateResponse(String path, int from, int to, String content) {
        this.path = path;
        this.from = from;
        this.to = to;
        this.content = content;
    }
}
