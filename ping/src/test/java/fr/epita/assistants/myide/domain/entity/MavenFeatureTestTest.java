package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.maven.MavenTest;
import fr.epita.assistants.myide.domain.service.ProjectService;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("Maven Feature Test Tests")
public class MavenFeatureTestTest {
    // Change the string to your project's path file
    String project_file = "/home/novar/Documents/epita/ing1/s6/proj/";

    @Tag("Maven Test Test")
    @Test
    public void maven_test_test(){
        ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
        Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));
        MavenTest mavenTest = new MavenTest();
        assertTrue(mavenTest.execute(project).isSuccess());
    }
}
