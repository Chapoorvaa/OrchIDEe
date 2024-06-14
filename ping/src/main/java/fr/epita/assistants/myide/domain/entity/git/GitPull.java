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


            System.out.println("Remote : " + git.pull().getRemote());
            System.out.println("Remote Branch : " + git.pull().getRemoteBranchName());
            PullResult res = git.pull().call();
            System.out.println("Fetch from : " + res.getFetchedFrom());
            System.out.println("Success : " + res.isSuccessful());

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
        return Mandatory.Features.Git.PULL;
    }
}
