package fr.epita.assistants.myide.domain.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
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