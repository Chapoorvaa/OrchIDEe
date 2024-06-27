package fr.epita.assistants.myide.domain.entity.make;

import fr.epita.assistants.myide.domain.entity.ExtraFeatures;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.JGitInternalException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class MakeMake implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            List<String> arguments = new ArrayList<>();
            arguments.add("make");
            for (Object str : params) {
                arguments.add(str.toString());
            }

            Process process = new ProcessBuilder(arguments)
                    .directory(project.getRootNode().getPath().toFile())
                    .start();

            int exitCode = process.waitFor();

            return () -> exitCode == 0;
        } catch (Exception e) {
            Logger.logError("Make failed: " + e);
            return () -> false;
        }
    }

    @Override
    public Type type() {
        return ExtraFeatures.Features.Make.MAKEMAKE;
    }
}