package fr.epita.assistants.myide.domain.entity;

import javax.validation.constraints.NotNull;
import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class FolderNode implements Node {

    private final Path path;

    FolderNode(Path path) {
        this.path = path.toAbsolutePath().normalize();
    }

    @Override
    public Path getPath() {
        return this.path;
    }

    @Override
    public Type getType() {
        return Types.FOLDER;
    }

    @Override
    public List<@NotNull Node> getChildren() {
        File cur_dir = new File(this.path.toString());
        List<Node> children = new ArrayList<>();
        File[] listFiles = cur_dir.listFiles();
        if (listFiles != null) {
            for (File file : listFiles) {
                if (file.isDirectory()) {
                    children.add(new FolderNode(file.toPath()));
                } else if (file.isFile()) {
                    children.add(new FileNode(file.toPath()));
                }
            }
        }
        return children;
    }
}