package fr.epita.assistants.myide.domain.entity.git;

import fr.epita.assistants.myide.domain.entity.ExtraMandatory;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.Status;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.IOException;

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

            System.out.println("Untracked files : " + status.getUntracked());
            System.out.println("Added files : " + status.getAdded());
            System.out.println("Changed files : " + status.getChanged());
            System.out.println("Uncommited changes: " + status.getUncommittedChanges());
        } catch (IOException e) {
            Logger.logError("IOException in GitStatus : " + e.getMessage());
            return () -> false;
        } catch (GitAPIException e) {
            Logger.logError("GitAPIException in GitStatus : " + e.getMessage());
            return () -> false;
        }
        return () -> true;
    }

    @Override
    public Type type() {
        return ExtraMandatory.Features.Git.STATUS;
    }
}
