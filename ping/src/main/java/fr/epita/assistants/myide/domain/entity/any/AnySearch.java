package fr.epita.assistants.myide.domain.entity.any;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.report.SearchFeatureReport;
import fr.epita.assistants.myide.utils.Logger;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class AnySearch implements Feature {

    public void recSearch(Node node, String search, List<Node> searchResult) {
        /*
        I am not too sure about the name search in there
        if (node.getPath().toString().contains(search)) {
            searchResult.add(node);
        }
         */

        if (node.isFolder()) {
            for (Node child : node.getChildren()) {
                recSearch(child, search, searchResult);
            }
        } else {
            Path path = node.getPath();
            try {
                String content = Files.readString(path);
                if (content.toLowerCase().contains(search.toLowerCase())) {
                    searchResult.add(node);
                }
            } catch (Exception ignored) {
                // Nothing done because exceptions could arise from unreadable files
                // like binaries but I think we still want a result
                Logger.log("File " + path.toString() + " was unreadable and was skipped.");
            }
        }
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        if (params.length != 1 || !(params[0] instanceof String)) {
            Logger.logError("Parameters of AnySearch are invalid");
            return new SearchFeatureReport(new ArrayList<>(), false);
        }

        Node root = project.getRootNode();
        List<Node> searchResult = new ArrayList<>();

        try {
            recSearch(root, params[0].toString(), searchResult);
        } catch (Exception e) {
            Logger.logError("AnySearch failed due to: " + e.getMessage());
            return new SearchFeatureReport(new ArrayList<>(), false);
        }

        if (searchResult.isEmpty()) {
            return new SearchFeatureReport(searchResult, false);
        }
        return new SearchFeatureReport(searchResult, true);
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.SEARCH;
    }
}
