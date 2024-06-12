package fr.epita.assistants.myide.domain.service;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;

import java.nio.file.Path;

public class MyProjectService implements ProjectService {
    @Override
    public Project load(Path root) {
        return null;
    }

    @Override
    public Feature.ExecutionReport execute(Project project, Feature.Type featureType, Object... params) {
        return null;
    }

    @Override
    public NodeService getNodeService() {
        return null;
    }
}
