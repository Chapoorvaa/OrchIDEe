package fr.epita.assistants.myide.domain.entity.make;

import fr.epita.assistants.myide.domain.entity.Aspect;
import fr.epita.assistants.myide.domain.entity.ExtraFeatures;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.git.*;

import java.util.ArrayList;
import java.util.List;

public class MakeAspect implements Aspect {

    private final List<Feature> featureList_ = new ArrayList<>();

    public MakeAspect() {
        featureList_.add(new MakeMake());
        featureList_.add(new MakeClean());
    }

    @Override
    public Type getType() {
        return ExtraFeatures.Aspects.MAKE;
    }

    @Override
    public List<Feature> getFeatureList() {
        return featureList_;
    }
}
