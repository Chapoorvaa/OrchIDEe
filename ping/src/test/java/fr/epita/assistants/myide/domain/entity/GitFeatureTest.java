package fr.epita.assistants.myide.domain.entity;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("Git Feature Tests")
public class GitFeatureTest {
    @Tag("Git Pull Test")
    @Test
    public void git_pull_test(){}

    @Tag("Git Push Test")
    @Test
    public void git_push_test(){}

    @Tag("Git Add Multiple Files Test")
    @Test
    public void git_add_multiple_files_test(){}

    @Tag("Git Add Regex Test")
    @Test
    public void git_add_regex_test(){}

    @Tag("Git Add Folder Test")
    @Test
    public void git_add_folder_test(){}

    @Tag("Git Add Non Existing File Test")
    @Test
    public void git_add_non_existing_file_test(){}

    @Tag("Git Add File Test")
    @Test
    public void git_add_file_test(){}

    @Tag("Git Commit Test")
    @Test
    public void git_commit_test(){}

    @Tag("Git Error Test")
    @Test
    public void git_error_test(){}

    @Tag("Git Push Up To Date Test")
    @Test
    public void git_push_up_to_date_test(){}
}
