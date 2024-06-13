package fr.epita.assistants.myide.domain.entity;

import javax.validation.constraints.NotNull;
import java.util.Optional;
import java.util.Set;

/**
 * Implementation of the interface Project
 */
public class MyProject implements Project {
    private Node rootNode;
    private Set<Aspect> aspect;

    public MyProject(Node rootNode, Set<Aspect> aspect) {
        this.rootNode = rootNode;
        this.aspect = aspect;
    }

    /**
     * @return The root node of the project.
     */
    public @NotNull Node getRootNode() {
        return rootNode;
    }

    /**
     * @return The aspects of the project.
     */
    public Set<Aspect> getAspects() {
        return aspect;
    }

    /**
     * Get an optional feature of the project depending
     * on its type. Returns an empty optional if the
     * project does not have the features queried.
     *
     * @param featureType Type of the feature to retrieve.
     * @return An optional feature of the project.
     */
    public @NotNull Optional<Feature> getFeature(@NotNull final Feature.Type featureType) {
        for (Aspect aspect : aspect) {
            for (Feature feature : aspect.getFeatureList()) {
                if (feature.type() == featureType) {
                    return Optional.of(feature);
                }
            }
        }
        return Optional.empty();
    }
}