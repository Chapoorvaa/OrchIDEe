package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.JGitInternalException;
import org.eclipse.jgit.api.errors.NoFilepatternException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;

public class GitAdd implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try{
            Logger.log("hey im gonna create create repository with : " + project.getRootNode().getPath().toString());
//            Repository newRepo = FileRepositoryBuilder.create(
//                    new File(String.valueOf(project.getRootNode().getPath().resolve(Paths.get("/.git")))));
//            newRepo.create();
            Repository existingRepo = new FileRepositoryBuilder()
                    .setGitDir(new File(String.valueOf(project.getRootNode().getPath().resolve(Paths.get("/.git"))))).build();

            Logger.log("lets goooo");
            Git git = new Git(existingRepo);
            Logger.log("wtffff + " + Arrays.toString(params));
            for(Object s : params){
                Logger.log("Trying to add : " + s.toString());
                git.add().addFilepattern(s.toString()).call();
            }

//            git.add().addFilepattern(params[0].toString())
//                    .call();

        }
        catch (IOException e)
        {
            Logger.log("The repository could not be accessed to configure the rest of the builder's parameters.");
            return () -> false;
        } catch (GitAPIException e) {
            throw new RuntimeException(e);
        } catch (JGitInternalException e2) {
            Logger.log(e2.getMessage());
        }

        return () ->  true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.ADD;
    }
}
