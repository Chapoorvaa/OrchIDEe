package fr.epita.assistants.myide.domain.entity.maven;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;

public class MavenTest implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command("mvn", "test", "--file", project.getRootNode().getPath().toString());
            processBuilder.start();
        } catch (Exception e) {
            return () -> false;
        }
        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Maven.TEST;
    }
}
