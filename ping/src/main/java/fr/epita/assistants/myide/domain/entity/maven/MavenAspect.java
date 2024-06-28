package fr.epita.assistants.myide.domain.entity.maven;

import fr.epita.assistants.myide.domain.entity.Aspect;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;

import java.util.ArrayList;
import java.util.List;

public class MavenAspect implements Aspect {
    private final List<Feature> featureList_ = new ArrayList<>();

    public MavenAspect() {
        featureList_.add(new MavenCompile());
        featureList_.add(new MavenClean());
        featureList_.add(new MavenTest());
        featureList_.add(new MavenPackage());
        featureList_.add(new MavenInstall());
        featureList_.add(new MavenTree());
        featureList_.add(new MavenExec());
        featureList_.add(new MavenRun());
    }

    @Override
    public Type getType() {
        return Mandatory.Aspects.MAVEN;
    }

    @Override
    public List<Feature> getFeatureList() {
        return featureList_;
    }
}
