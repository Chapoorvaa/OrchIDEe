package fr.epita.assistants.myide.domain.entity;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

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

        try {
            BufferedReader reader = new BufferedReader(new FileReader(ignoreNode.getPath().getFileName().toString()));
            String line;
            while ((line = reader.readLine()) != null) {
                File target = new File(root.getPath().toString() + File.separator + line);
                target.delete();
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
