package fr.epita.assistants.myide.domain.entity;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("Maven Feature Tests")
public class MavenFeatureTest {
    @Tag("Maven Compile Test")
    @Test
    public void maven_compile_test(){}

    @Tag("Maven Tree Test")
    @Test
    public void maven_tree_test(){}

    @Tag("Maven Compile and Clean Test")
    @Test
    public void maven_compile_and_clean_test(){}

    @Tag("Maven Clean Test")
    @Test
    public void maven_clean_test(){}

    @Tag("Maven Package Test")
    @Test
    public void maven_package_test(){}

    @Tag("Maven Install Test")
    @Test
    public void maven_install_test(){}
}

