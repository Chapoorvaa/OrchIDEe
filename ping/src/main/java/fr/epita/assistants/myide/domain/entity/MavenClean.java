package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.myide.utils.Logger;

public class MavenClean implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command("mvn", "clean", "--file", project.getRootNode().getPath().toString());
            processBuilder.start();
        } catch (Exception e) {
            return () -> false;
        }
        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Maven.CLEAN;
    }
}
