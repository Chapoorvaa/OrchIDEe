package fr.epita.assistants.myide.presentation.rest.response;

import fr.epita.assistants.myide.domain.entity.git.GitStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class GitStatusResponse {
    private Set<String> untrackedFiles;
    private Set<String> addedFiles;
    private Set<String> changedFile;
    private Set<String> uncommittedFiles;
}
