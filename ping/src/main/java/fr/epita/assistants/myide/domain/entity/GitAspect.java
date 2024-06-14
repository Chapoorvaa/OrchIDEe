package fr.epita.assistants.myide.domain.entity;

import java.util.ArrayList;
import java.util.List;

public class GitAspect implements Aspect {

    private final List<Feature> featureList_ = new ArrayList<>();

    public GitAspect() {
        featureList_.add(new GitAdd());
        featureList_.add(new GitPull());
        featureList_.add(new GitPush());
        featureList_.add(new GitCommit());
        featureList_.add(new GitStatus());
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
