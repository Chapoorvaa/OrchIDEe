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
    private List<FileTree> children;

    public FileTree(String name, String type) {
        this.name = name;
        this.type = type;
        this.children = new ArrayList<>();
    }
}