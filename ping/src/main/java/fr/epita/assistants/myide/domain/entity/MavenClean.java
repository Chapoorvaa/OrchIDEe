package fr.epita.assistants.myide.domain.entity;

public class MavenClean implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command("mvn", "clean");
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
