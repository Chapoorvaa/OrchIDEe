package fr.epita.assistants.myide.domain.entity.maven;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;

import java.util.ArrayList;
import java.util.List;

public class MavenInstall implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            List<String> arguments = new ArrayList<>();
            arguments.add("mvn");
            arguments.add("install");
            for (Object str : params) {
                arguments.add(str.toString());
            }

            Process process = new ProcessBuilder(arguments)
                    .directory(project.getRootNode().getPath().toFile())
                    .start();

            int exitCode = process.waitFor();

            return () -> exitCode == 0;
        } catch (Exception e) {
            Logger.logError("Maven install failed: " + e);
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Maven.INSTALL;
    }
}
