package fr.epita.assistants.myide.domain.entity;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("Any Feature Tests")
public class AnyFeatureTest {
    @Tag("Any Dist Test")
    @Test
    public void any_dist_test(){}

    @Tag("Any Cleanup Test")
    @Test
    public void any_cleanup_test(){}
}
