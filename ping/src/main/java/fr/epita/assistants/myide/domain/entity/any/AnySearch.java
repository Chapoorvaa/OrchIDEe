package fr.epita.assistants.myide.domain.entity.any;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.report.SearchFeatureReport;
import fr.epita.assistants.myide.utils.Logger;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class AnySearch implements Feature {

    public void recSearch(Node node, String search, List<Node> searchResult) {

        if (node.getPath().toString().contains(search)) {
            searchResult.add(node);
        }
        if (node.isFolder()) {
            for (Node child : node.getChildren()) {
                recSearch(child, search, searchResult);
            }
        }
        else {
            Path path = node.getPath();
            try {
                String content = Files.readString(path);
                if (content.contains(search)) {
                    searchResult.add(node);
                }
            } catch (IOException e) {
                Logger.logError("Failed to read file in AnySearch");
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        if (params.length == 0 ) {
            Logger.logError("Any search doesn't have any parameters");
            throw new IllegalArgumentException("The search parameters must not be empty");
        }
        if (!(params[0] instanceof String)) {
            Logger.logError("Any search doesn't contain a parameter of type String");
            throw new IllegalArgumentException("The search parameters must be a string");
        }
        Node root = project.getRootNode();
        String search = (String) params[0];
        List<Node> searchResult = new ArrayList<>();
        recSearch(root, search, searchResult);
        boolean isSuccess = !searchResult.isEmpty();
        return new SearchFeatureReport(searchResult, isSuccess);
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.SEARCH;
    }
}
