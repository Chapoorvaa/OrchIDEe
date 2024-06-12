package fr.epita.assistants.myide.presentation.rest.request;

public class MoveRequest {

    private String dst;
    private String src;

    public String getDst() {
        return dst;
    }
    public String getSrc() {
        return src;
    }

    public void setDst(String to) {
        this.dst = dst;
    }

    public void setSrc(String from) {
        this.src = src;
    }
}
