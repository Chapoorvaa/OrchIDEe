package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.maven.*;
import fr.epita.assistants.myide.domain.service.ProjectService;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.nio.file.Path;

@Tag("Maven Feature Tests")
public class MavenFeatureTest {
    // Change the string to your project's path file
    String project_file = "/home/novar/Documents/epita/ing1/s6/proj/";

    @Tag("Maven Compile Test")
    @Test
    public void maven_compile_test(){
        ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
        Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));
        MavenCompile mavenCompile = new MavenCompile();
        assertTrue(mavenCompile.execute(project).isSuccess());
    }

    @Tag("Maven Tree Test")
    @Test
    public void maven_tree_test(){
        ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
        Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));
        MavenTree mavenTree = new MavenTree();
        assertTrue(mavenTree.execute(project).isSuccess());
    }

    @Tag("Maven Compile and Clean Test")
    @Test
    public void maven_compile_and_clean_test(){
        ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
        Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));

        MavenCompile mavenCompile = new MavenCompile();
        assertTrue(mavenCompile.execute(project).isSuccess());

        MavenClean mavenClean = new MavenClean();
        assertTrue(mavenClean.execute(project).isSuccess());
    }

    @Tag("Maven Clean Test")
    @Test
    public void maven_clean_test(){
        ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
        Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));
        MavenClean mavenClean = new MavenClean();
        assertTrue(mavenClean.execute(project).isSuccess());
    }

    @Tag("Maven Package Test")
    @Test
    public void maven_package_test(){
        ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
        Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));
        MavenPackage mavenPackage = new MavenPackage();
        assertTrue(mavenPackage.execute(project).isSuccess());
    }

    @Tag("Maven Install Test")
    @Test
    public void maven_install_test(){
            ProjectService projectService = MyIde.init(new MyIde.Configuration(Path.of(""), Path.of("")));
            Project project = projectService.load(Path.of(project_file + "OrchIDEe/ping/"));
            MavenInstall mavenInstall = new MavenInstall();
            assertTrue(mavenInstall.execute(project).isSuccess());
    }
}

