package fr.epita.assistants.myide.domain.entity.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.IOException;

public class GitCommit implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            Repository existingRepo = new FileRepositoryBuilder()
                    .findGitDir(project.getRootNode().getPath().toFile())
                    .build();

            Git git = new Git(existingRepo);

            if (params.length == 1) {
                git.commit().setMessage(params[0].toString()).call();
            } else if (params.length > 1) {
                Logger.logError("Too many parameters");
                return () -> false;
            } else {
                Logger.logError("Parameter missing");
                return () -> false;
            }

        } catch (IOException e) {
            Logger.logError("IOException in GitCommit : " + e.getMessage());
            return () -> false;
        } catch (GitAPIException e) {
            Logger.logError("GitAPIException in GitCommit : " + e.getMessage());
            return () -> false;
        }

        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.COMMIT;
    }
}
