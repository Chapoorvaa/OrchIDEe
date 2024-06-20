package fr.epita.assistants.myide.domain.entity.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.transport.PushResult;
import org.eclipse.jgit.transport.RemoteRefUpdate;

import java.io.IOException;

public class GitPush implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            Repository existingRepo = new FileRepositoryBuilder()
                    .findGitDir(project.getRootNode().getPath().toFile())
                    .build();

            Git git = new Git(existingRepo);

            // TODO: there is an issue with push (get error: git@github.com:emmanuelvln/OrchIDEe.git: remote hung up unexpectedly)
            // I think it is due to the SSH key or the way we connect to GitHub

            Iterable<PushResult> results = git.push().setForce(false).call();
            for (PushResult result : results) {
                for (RemoteRefUpdate update : result.getRemoteUpdates()) {
                    if (update.getStatus() != RemoteRefUpdate.Status.OK)
                    {
                        Logger.logError("Git push failed : " + update.getMessage());
                        return () -> false;
                    }
                }
            }

        } catch (IOException e) {
            Logger.logError("IOException in GitPush : " + e.getMessage());
            return () -> false;
        } catch (GitAPIException e) {
            Logger.logError("GitAPIException in GitPush : " + e.getMessage());
            return () -> false;
        }

        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.PUSH;
    }
}
