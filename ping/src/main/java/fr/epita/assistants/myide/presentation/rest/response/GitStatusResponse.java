package fr.epita.assistants.myide.presentation.rest.response;

import fr.epita.assistants.myide.domain.entity.git.GitStatus;

import java.util.Set;

public class GitStatusResponse {
    private Set<String> untrackedFiles;
    private Set<String> addedFiles;
    private Set<String> changedFile;
    private Set<String> uncommittedFiles;

    public GitStatusResponse(Set<String> untrackedFiles, Set<String> addedFiles, Set<String> changedFile, Set<String> uncommittedFiles) {
        this.untrackedFiles = untrackedFiles;
        this.addedFiles = addedFiles;
        this.changedFile = changedFile;
        this.uncommittedFiles = uncommittedFiles;
    }
}
