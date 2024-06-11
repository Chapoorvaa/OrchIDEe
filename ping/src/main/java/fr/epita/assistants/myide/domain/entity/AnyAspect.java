package fr.epita.assistants.myide.domain.entity;

import java.util.ArrayList;
import java.util.List;

public class AnyAspect implements Aspect {
    List<Feature> features_ = new ArrayList<>();

    public AnyAspect() {
        features_.add(new AnyCleanup());
    }

    @Override
    public List<Feature> getFeatureList() {
        return features_;
    }

    @Override
    public Type getType() {
        return Mandatory.Aspects.ANY;
    }
}
