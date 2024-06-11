package fr.epita.assistants.myide.domain.entity;

public class AnySearch implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        return null;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.SEARCH;
    }
}
