package fr.epita.assistants.myide.domain.entity.any;

import fr.epita.assistants.myide.domain.entity.Aspect;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AnyAspect implements Aspect {
    List<Feature> features_ = new ArrayList<>();
    String context = "[]";

    public AnyAspect() {
        features_.add(new AnyCleanup());
        features_.add(new AnyDist());
        features_.add(new AnySearch());
        features_.add(new AnyChatbot());
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
