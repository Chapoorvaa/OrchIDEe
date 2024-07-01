package fr.epita.assistants.myide.domain.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FileTree {
    private String name;
    private String type;
    private String path;
    private List<FileTree> children;

    public FileTree(String name, String type, String path) {
        this.name = name;
        this.type = type;
        this.path = path;
        this.children = new ArrayList<>();
    }
}