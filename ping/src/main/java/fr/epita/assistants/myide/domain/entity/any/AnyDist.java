package fr.epita.assistants.myide.domain.entity.any;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class AnyDist implements Feature {
    private static void zipFile(File fileToZip, String fileName, ZipOutputStream zipOut) throws IOException {
        if (fileToZip.isHidden()) {
            return;
        }

        if (fileToZip.isDirectory()) {
            if (fileName.endsWith("/")) {
                zipOut.putNextEntry(new ZipEntry(fileName));
                zipOut.closeEntry();
            }
            else {
                zipOut.putNextEntry(new ZipEntry(fileName + "/"));
                zipOut.closeEntry();
            }

            File[] children = fileToZip.listFiles();
            for (File childFile : children) {
                zipFile(childFile, fileName + "/" + childFile.getName(), zipOut);
            }

            return;
        }

        FileInputStream fis = new FileInputStream(fileToZip);
        ZipEntry zipEntry = new ZipEntry(fileName);
        zipOut.putNextEntry(zipEntry);

        byte[] bytes = new byte[1024];
        int length;
        while ((length = fis.read(bytes)) >= 0) {
            zipOut.write(bytes, 0, length);
        }

        fis.close();
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        AnyCleanup cleanup = new AnyCleanup();
        cleanup.execute(project);

        try {
            String projectPath = project.getRootNode().getPath().toString();

            FileOutputStream fos = new FileOutputStream(projectPath + ".zip");
            ZipOutputStream zipOut = new ZipOutputStream(fos);

            zipFile(new File(project.getRootNode().getPath().toString()), project.getRootNode().getPath().getFileName().toString(), zipOut);

            zipOut.close();
            fos.close();
        }
        catch (Exception e) {
            Logger.logError("Got error in DIST: " + e.getMessage());
            return () -> false;
        }

        return () -> true;
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.DIST;
    }
}
