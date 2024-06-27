package fr.epita.assistants.myide.domain.entity.make;

import fr.epita.assistants.myide.domain.entity.ExtraFeatures;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;

import java.util.ArrayList;
import java.util.List;

public class MakeClean implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            List<String> arguments = new ArrayList<>();
            arguments.add("make");
            arguments.add("clean");

            Process process = new ProcessBuilder(arguments)
                    .directory(project.getRootNode().getPath().toFile())
                    .start();

            int exitCode = process.waitFor();

            return () -> exitCode == 0;
        } catch (Exception e) {
            Logger.logError("Make clean failed: " + e);
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return ExtraFeatures.Features.Make.MAKECLEAN;
    }
}
