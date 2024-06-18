package fr.epita.assistants.myide.domain.entity.any;

import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.service.MyNodeService;
import fr.epita.assistants.myide.domain.service.NodeService;
import fr.epita.assistants.myide.utils.Logger;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.tngtech.archunit.thirdparty.com.google.common.io.Files.isFile;


public class AnyCleanup implements Feature {

    public void recDelete(String line, Node root, NodeService myNodeService) {
        Path rootPath = root.getPath();
        try (Stream<Path> paths = Files.walk(rootPath)) {
            String pattern = line.replace("**", ".*").replace("*", "[^/]*");
            List<Path> matchedPaths = paths.filter(path -> {
                Path relativePath = rootPath.relativize(path);
                return relativePath.toString().matches(pattern);
            }).sorted(Comparator.comparing(Path::getNameCount).reversed()).toList();

            for (Path path : matchedPaths) {
                if (Files.isDirectory(path)) {
                    myNodeService.delete(new FolderNode(path));
                }
                else {
                    myNodeService.delete(new FileNode(path));
                }
            }
        } catch (IOException e) {
            Logger.logError("Failed to get the tree in AnyCleanup");
            throw new RuntimeException(e);
        }
    }


    @Override
    public ExecutionReport execute(Project project, Object... params) {
        Node root = project.getRootNode();

        Node ignoreNode = root.getChildren().stream()
                .filter((e) -> e.isFile() && e.getPath().getFileName().toString().equals(".myideignore"))
                .findFirst()
                .orElse(null);

        if (ignoreNode == null || Files.isDirectory(ignoreNode.getPath())) {
            Logger.logError(".myideignore node not found or is not a file");
            return () -> false;
        }

        NodeService nodeService = new MyNodeService();

        try {
            BufferedReader reader = new BufferedReader(new FileReader(ignoreNode.getPath().getFileName().toString()));
            String line;
            while ((line = reader.readLine()) != null) {
                recDelete(line.trim(), root, nodeService);
            }
        } catch (Exception e) {
            Logger.logError("Failed to read the ignore file");
            return () -> false;
        }
        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.CLEANUP;
    }
}
