package fr.epita.assistants.myide.domain.entity;

import javax.validation.constraints.NotNull;
import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class FolderNode implements Node {

    private final Path path;

    public FolderNode(Path path) {
        this.path = path.toAbsolutePath().normalize();
    }

    @Override
    public Path getPath() {
        return this.path;
    }

    @Override
    public Type getType() {
        return Node.Types.FOLDER;
    }

    @Override
    public List<@NotNull Node> getChildren() {
        File curDir = new File(this.path.toString());
        List<Node> children = new ArrayList<>();
        File[] fileList= curDir.listFiles();
        if (fileList != null) {
            for (File file : fileList) {
                if (file.isDirectory()) {
                    children.add(new FolderNode(file.toPath()));
                } else {
                    children.add(new FileNode(file.toPath()));
                }
            }
        }
        return children;
    }
}