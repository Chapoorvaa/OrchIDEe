package fr.epita.assistants.myide.domain.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.epita.assistants.myide.domain.entity.FileTree;

import java.io.IOException;
import java.nio.file.*;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class FileTreeBuilder {
    public FileTree buildTree(Path path) {
        String name = path.getFileName().toString();
        String type = Files.isDirectory(path) ? "folder" : "file";
        String curPath = path.toString();
        FileTree fTree = new FileTree(name, type, curPath);

        if (Files.isDirectory(path)) {
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(path)) {
                List<Path> sortedPaths = StreamSupport.stream(stream.spliterator(), false)
                        .sorted(Comparator.comparing((Path p) -> p.getFileName().toString().toLowerCase())
                                .thenComparing(p -> !Files.isDirectory(p)))
                        .collect(Collectors.toList());
                for (Path entry : sortedPaths) {
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
