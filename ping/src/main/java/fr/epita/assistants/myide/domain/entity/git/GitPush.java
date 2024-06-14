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

public class GitPush implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            Repository existingRepo = new FileRepositoryBuilder()
                    .findGitDir(project.getRootNode().getPath().toFile())
                    .build();

            Git git = new Git(existingRepo);

            System.out.println(existingRepo.getBranch());

            System.out.println(existingRepo.getRemoteNames());
            System.out.println(existingRepo.getConfig().toString());
//            System.out.println(git.remoteList().call().get(0).toString());

            // TODO: there is an issue with push (get error: git@github.com:emmanuelvln/OrchIDEe.git: remote hung up unexpectedly)
            // I think it is due to the SSH key or the way we connect to GitHub

            git.push().setForce(false).call();

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
        return Mandatory.Features.Git.PUSH;
    }
}
