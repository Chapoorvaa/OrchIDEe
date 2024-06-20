package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.maven.MavenExec;
import fr.epita.assistants.myide.domain.service.ProjectService;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("Maven Feature Exec Tests")
public class MavenFeatureExecTest {
    // Change the string to your project's path file
    String project_file = "/home/novar/Documents/epita/ing1/s6/proj/";

    @Tag("Maven Exec Test")
    @Test
    public void maven_exec_test(){
        ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
        Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));
        MavenExec mavenExec = new MavenExec();
        assertTrue(mavenExec.execute(project).isSuccess());
    }
}
