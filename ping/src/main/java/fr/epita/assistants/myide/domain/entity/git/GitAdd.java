package fr.epita.assistants.myide.domain.entity.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class GitAdd implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            Repository existingRepo = new FileRepositoryBuilder()
                    .findGitDir(project.getRootNode().getPath().toFile())
                    .build();

            Git git = new Git(existingRepo);

            // DONE: check if the file we are trying to add exists
            Path absolutePath = Paths.get(project.getRootNode().getPath().toFile().getAbsolutePath());
            for (Object param : params) {
                Path p = Paths.get(absolutePath.resolve(param.toString()).toUri());
                if(Files.exists(p)) {
                    git.add().addFilepattern(param.toString()).call();
                }
                else{
                    Logger.log("Trying to add " + param + " but it doesn't exist");
                }
            }
        }catch (IOException e) {
            Logger.log("IOException in GitStatus : " + e.getMessage());
        }
        catch (GitAPIException e) {
            Logger.log("GitAPIException in GitStatus : " + e.getMessage());
        }

        return () ->  true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.ADD;
    }
}
