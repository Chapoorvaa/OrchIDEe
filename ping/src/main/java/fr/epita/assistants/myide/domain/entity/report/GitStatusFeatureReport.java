package fr.epita.assistants.myide.domain.entity.report;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.utils.Logger;

import java.util.Iterator;
import java.util.Set;

/**
 * @param untracked
 * @param added
 * @param modified
 * @param uncommited
 * @param isSuccess  Is the report successful.
 */
public record GitStatusFeatureReport(Set<String> untracked, Set<String> added, Set<String> modified, Set<String> uncommited, boolean isSuccess) implements Feature.ExecutionReport {}