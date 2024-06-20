package fr.epita.assistants.myide.domain.service;

import fr.epita.assistants.myide.domain.entity.FileNode;
import fr.epita.assistants.myide.domain.entity.FolderNode;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.utils.Logger;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class MyNodeService implements NodeService {

    @Override
    public Node update(Node node, int from, int to, byte[] insertedContent) {
        if (from < 0 || from > to ) {
            throw new IllegalArgumentException("Invalid from or to");
        }

        Path nodePath = node.getPath();
        if (!Files.exists(nodePath) || Files.isDirectory(nodePath)) {
            throw new IllegalArgumentException("File does not exist or is a directory");
        }

        try {
            String content = new String(Files.readAllBytes(nodePath));
            String newContent = content.substring(0,from) + new String(insertedContent) + content.substring(to);
            Files.write(nodePath, newContent.getBytes());
            return node;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    boolean recDelete(File dir) {
        File[] allContents = dir.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                recDelete(file);
            }
        }
        return dir.delete();
    }

    @Override
    public boolean delete(Node node) {
        Path nodePath = node.getPath();
        if (node instanceof FileNode) {
            try {
                Files.delete(nodePath);
                return true;
            } catch (IOException e) {
                Logger.logError("Deletion of " + nodePath + " failed: " + e.getMessage());
                return false;
            }
        }
        else {
            return recDelete(new File(nodePath.toString()));
        }
    }

    @Override
    public Node create(Node folder, String name, Node.Type type) {
        Path nodePath = folder.getPath();

        if (!Files.exists(nodePath) || !Files.isDirectory(nodePath)) {
            throw new IllegalArgumentException("Folder does not exist or is not a directory");
        }

        Path newPath = nodePath.resolve(name);
        try {
            if (type == Node.Types.FOLDER) {
                Files.createDirectory(newPath);
                return new FolderNode(newPath);

            } else if (type == Node.Types.FILE) {
                Files.createFile(newPath);
                return new FileNode(newPath);
            }
            else {
                throw new IllegalArgumentException("Invalid node type");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Node move(Node nodeToMove, Node destinationFolder) {
        Path srcPath = nodeToMove.getPath();
        Path destFolderPath = destinationFolder.getPath();

        if (!Files.exists(srcPath)) {
            throw new IllegalArgumentException("File does not exist");
        }
        if (!Files.exists(destFolderPath) || !Files.isDirectory(destFolderPath)) {
            throw new IllegalArgumentException("Destination directory does not exist or isn't a directory");
        }

        Path newDstPath = destFolderPath.resolve(nodeToMove.getPath().getFileName());
        try {
            Files.move(nodeToMove.getPath(), newDstPath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (nodeToMove.getType() == Node.Types.FOLDER) {
            return new FolderNode(newDstPath);
        }
        return new FileNode(newDstPath);
    }
}
