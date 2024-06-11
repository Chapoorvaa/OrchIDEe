package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

public class GitPull implements Feature {

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        Repository newRepo;
        try{
            newRepo = FileRepositoryBuilder.create(
                    new File(project.getRootNode().getPath() + "/.git"));
            newRepo.create();


            Git git = new Git(newRepo);

            git.pull();
        }
        catch (IOException e)
        {
            Logger.log("The repository could not be accessed to configure the rest of the builder's parameters.");
            return () -> false;
        }

        return () ->  true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.PULL;
    }
}
