package fr.epita.assistants.myide.domain.entity;

public enum ExtraFeatures {
    ;

    public enum Aspects implements Aspect.Type {
        MAKE
    }

    public enum Features {
        ;

        /**
         * Extra features for all projects.
         */
        public enum Any implements Feature.Type {

            /**
             * Chatbot
             */
            CHATBOT
        }

        /**
         * Extra features for maven projects.
         */
        public enum Maven implements Feature.Type {

            /**
             * Run
             */
            RUN
        }

        /**
         * Extra Features for the git project type.
         */
        public enum Git implements Feature.Type {

            /**
             * Git status
             */
            STATUS
        }

        /**
         * Extra Features for the make project type.
         */
        public enum Make implements Feature.Type {

            /**
             * Make
             */
            MAKE,
        }
    }
}
