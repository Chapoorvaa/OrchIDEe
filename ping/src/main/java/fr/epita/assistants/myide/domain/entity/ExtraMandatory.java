package fr.epita.assistants.myide.domain.entity;

public enum ExtraMandatory {
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
