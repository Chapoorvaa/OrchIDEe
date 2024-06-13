package fr.epita.assistants.myide.domain.entity.any;

import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.service.MyNodeService;
import fr.epita.assistants.myide.domain.service.NodeService;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.nio.file.Paths;

public class AnyCleanup implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        Node root = project.getRootNode();

        Node ignoreNode = root.getChildren().stream()
                .filter((e) -> e.isFile() && e.getPath().getFileName().toString().equals(".myideignore"))
                .findFirst()
                .orElse(null);

        if (ignoreNode == null) {
            return () -> false;
        }

        NodeService nodeService = new MyNodeService();

        try {
            BufferedReader reader = new BufferedReader(new FileReader(ignoreNode.getPath().getFileName().toString()));
            String line;
            while ((line = reader.readLine()) != null) {
                nodeService.delete(new FileNode(Paths.get(root.getPath().toString() + File.separator + line)));
            }
        } catch (Exception e) {
            return () -> false;
        }

        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.CLEANUP;
    }
}
