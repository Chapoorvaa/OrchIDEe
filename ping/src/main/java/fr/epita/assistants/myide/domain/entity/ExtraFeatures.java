package fr.epita.assistants.myide.domain.entity;

public enum ExtraFeatures {
    ;

    public enum Aspects implements Aspect.Type {
        ANY,
        MAVEN,
        GIT
    }

    public enum Features {
        ;
        /**
         * Extra Features for the git project type.
         */
        public enum Git implements Feature.Type {

            /**
             * Git status
             */
            STATUS
        }
    }
}
