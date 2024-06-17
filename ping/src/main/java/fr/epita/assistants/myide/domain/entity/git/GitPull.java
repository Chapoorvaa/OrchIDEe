package fr.epita.assistants.myide.domain.entity.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.PullResult;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.IOException;

public class GitPull implements Feature {

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            Repository existingRepo = new FileRepositoryBuilder()
                    .findGitDir(project.getRootNode().getPath().toFile())
                    .build();

            Git git = new Git(existingRepo);

            // TODO: there is an issue with push (get error: git@github.com:emmanuelvln/OrchIDEe.git: remote hung up unexpectedly)

            PullResult res = git.pull().call();

        } catch (IOException e) {
            Logger.logError("IOException in GitPull : " + e.getMessage());
            return () -> false;
        } catch (GitAPIException e) {
            Logger.logError("GitAPIException in GitPull : " + e.getMessage());
            return () -> false;
        }

        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.PULL;
    }
}
