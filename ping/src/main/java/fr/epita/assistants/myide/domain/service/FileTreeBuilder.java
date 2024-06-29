package fr.epita.assistants.myide.domain.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.epita.assistants.myide.domain.entity.FileTree;

import java.io.IOException;
import java.nio.file.*;

public class FileTreeBuilder {
    public FileTree buildTree(Path path) {
        String name = path.getFileName().toString();
        String type = Files.isDirectory(path) ? "folder" : "file";
        String curPath = path.toString();
        FileTree fTree = new FileTree(name, type, curPath);

        if (Files.isDirectory(path)) {
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(path)) {
                for (Path entry : stream) {
                    fTree.getChildren().add(buildTree(entry));
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return fTree;
    }

    public String convertToJson(FileTree fTree) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(fTree);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
