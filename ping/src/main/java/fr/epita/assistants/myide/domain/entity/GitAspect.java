package fr.epita.assistants.myide.domain.entity;

import java.util.ArrayList;
import java.util.List;

public class GitAspect implements Aspect {

    private final List<Feature> featureList_ = new ArrayList<>();

    public GitAspect() {
        featureList_.add(new GitAdd());
    }

    @Override
    public Type getType() {
        return Mandatory.Aspects.GIT;
    }

    @Override
    public List<Feature> getFeatureList() {
        return featureList_;
    }
}
