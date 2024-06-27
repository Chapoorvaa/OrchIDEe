package fr.epita.assistants.myide.domain.entity.maven;

import fr.epita.assistants.myide.domain.entity.ExtraFeatures;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.any.AnyCleanup;
import fr.epita.assistants.myide.domain.entity.report.RunReport;
import fr.epita.assistants.myide.utils.Logger;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class MavenRun implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        MavenClean clean = new MavenClean();
        clean.execute(project);
        MavenPackage pack = new MavenPackage();
        pack.execute(project);

        try {
            List<String> arguments = new ArrayList<>();
            arguments.add("java");
            arguments.add("-jar");
            arguments.add("target/" + project
                    .getRootNode()
                    .getPath()
                    .getFileName() + ".jar");

            Process process = new ProcessBuilder(arguments)
                    .directory(project.getRootNode().getPath().toFile())
                    .redirectErrorStream(true)
                    .start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append(System.lineSeparator());
            }

            int exitCode = process.waitFor();

            return new RunReport(output.toString(), exitCode == 0);
        } catch (Exception e) {
            Logger.logError("Maven clean failed: " + e);
            return new RunReport("", false);
        }
    }

    @Override
    public Type type() {
        return ExtraFeatures.Features.Maven.RUN;
    }
}
