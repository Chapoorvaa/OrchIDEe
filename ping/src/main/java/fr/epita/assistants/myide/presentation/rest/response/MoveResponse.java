package fr.epita.assistants.myide.presentation.rest.response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoveResponse {

    private String src;
    private String dst;

    public MoveResponse(String src, String dst) {
        this.src = src;
        this.dst = dst;
    }
}
