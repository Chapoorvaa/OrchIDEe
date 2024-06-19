package fr.epita.assistants.myide.domain.entity.report;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.utils.Logger;

import java.util.Iterator;
import java.util.Set;

/**
 * @param untracked
 * @param added
 * @param changed
 * @param uncommited
 * @param isSuccess  Is the report successful.
 */
public record GitStatusFeatureReport(Set<String> untracked, Set<String> added, Set<String> changed, Set<String> uncommited, boolean isSuccess) implements Feature.ExecutionReport {

    public void printReport() {
        Logger.log("Added files : \n");
        for (String s : added) {
            Logger.log(s);
        }
        Logger.log("Changed files : \n");
        for (String s : changed) {
            Logger.log(s);
        }
        Logger.log("Untracked files : \n");
        for (String s : untracked) {
            Logger.log(s);
        }
        Logger.log("Uncommited files : \n");
        for (String s : uncommited) {
            Logger.log(s);
        }
    }
}