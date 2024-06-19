package fr.epita.assistants.myide.domain.entity.git;

import fr.epita.assistants.myide.domain.entity.ExtraFeatures;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.report.GitStatusFeatureReport;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.Status;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.IOException;
import java.util.Collections;

public class GitStatus implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        System.out.println("hello im gonna git status");
        try {
            // The repository exists because if it did not, it would not have a Git Aspect
            Repository existingRepo = new FileRepositoryBuilder()
                    .findGitDir(project.getRootNode().getPath().toFile())
                    .build();

            Git git = new Git(existingRepo);
            Status status = git.status().call();

            // TODO: return or write the Set<String> for git status somewhere

            return new GitStatusFeatureReport(status.getUntracked(), status.getAdded(), status.getChanged(), status.getUncommittedChanges(), true);
        } catch (IOException e) {
            Logger.logError("IOException in GitStatus : " + e.getMessage());
            return new GitStatusFeatureReport(Collections.emptySet(), Collections.emptySet(), Collections.emptySet(),Collections.emptySet(), false);
        } catch (GitAPIException e) {
            Logger.logError("GitAPIException in GitStatus : " + e.getMessage());
            return new GitStatusFeatureReport(Collections.emptySet(), Collections.emptySet(), Collections.emptySet(),Collections.emptySet(), false);
        }
    }

    @Override
    public Type type() {
        return ExtraFeatures.Features.Git.STATUS;
    }
}
