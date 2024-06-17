package fr.epita.assistants.myide.domain.entity;

import javax.validation.constraints.NotNull;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.util.List;

public class FileNode implements Node {

    private final Path path;

    public FileNode(Path path) {
        this.path = path.toAbsolutePath().normalize();
    }

    @Override
    public Path getPath() {
        return this.path;
    }

    @Override
    public Type getType() {
        return Node.Types.FILE;
    }

    @Override
    public List<@NotNull Node> getChildren() {
        return List.of();
    }

    public String read() {
        StringBuilder resultStringBuilder = new StringBuilder();
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path.toFile())));
            String line;
            while ((line = br.readLine()) != null) {
                resultStringBuilder.append(line).append("\n");
            }
        } catch (IOException e) {
            return "";
        }

        return resultStringBuilder.toString();
    }
}