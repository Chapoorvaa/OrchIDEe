package fr.epita.assistants.myide.domain.entity;

import javax.validation.constraints.NotNull;
import java.io.File;
import java.nio.file.Path;
import java.util.List;

public class FileNode implements Node {

    private final Path path;

    FileNode(Path path) {
        this.path = path.toAbsolutePath().normalize();
    }

    @Override
    public Path getPath() {
        return this.path;
    }

    @Override
    public Type getType() {
        return Types.FILE;
    }

    @Override
    public List<@NotNull Node> getChildren() {
        return List.of();
    }
}