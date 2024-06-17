package fr.epita.assistants.myide.presentation.rest;

import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.service.MyProjectService;
import fr.epita.assistants.myide.domain.service.NodeService;
import fr.epita.assistants.myide.domain.service.ProjectService;
import fr.epita.assistants.myide.presentation.rest.request.ExecFeatureRequest;
import fr.epita.assistants.myide.presentation.rest.request.MoveRequest;
import fr.epita.assistants.myide.presentation.rest.request.SimpleRequest;
import fr.epita.assistants.myide.presentation.rest.request.UpdateRequest;

import fr.epita.assistants.myide.presentation.rest.response.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import fr.epita.assistants.myide.utils.Logger;

import java.io.File;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Path("/api")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MyIdeEndpoint {
    public ProjectService myProjectService = new MyProjectService();
    public Map<String, Project> ProjectsMap = new HashMap<String, Project>();

    @GET
    @Path("/hello")
    public Response helloWorld() {
        Logger.log("Saying hello !");
        return Response.ok("Hello World !").build();
    }

    @POST
    @Path("/open/project")
    public Response openProject(SimpleRequest request) {
        Logger.log("Attempting OPEN/PROJECT");

        java.nio.file.Path path = Paths.get(request.getPath());
        Project myProject = myProjectService.load(path);
        String projectName = path.getFileName().toString();

        if (myProject == null) {
            Logger.logError("ERROR on OPEN/PROJECT: project " + projectName + " at " + path + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        ProjectsMap.put(projectName, myProject);
        Logger.log("SUCCESS on OPEN/PROJECT: project " + projectName + " at " + path);
        return Response.ok(new ProjectResponse(projectName, path.toString())).build();
    }

    @POST
    @Path("/open/file")
    public Response openFile(SimpleRequest request) {
        Logger.log("Attempting OPEN/FILE");

        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();

        File file = new File(path.toString());
        if (!file.isFile())
        {
            Logger.logError("ERROR on OPEN/FILE: file " + fileName + " at " + path + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        FileNode fileNode = new FileNode(path);
        Logger.log("SUCCESS on OPEN/FILE: file " + fileName + " at " + path);
        return Response.ok(new FileResponse(fileName, path.toString(), fileNode.read())).build();
    }

    @POST
    @Path("/create/file")
    public Response createFile(SimpleRequest request) {
        Logger.log("Attempting CREATE/FILE");

        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();

        File file = new File(path.toString());
        if (file.isFile())
        {
            Logger.logError("ERROR on CREATE/FILE: file " + fileName + " at " + path + " already exists");
            return Response.status(Response.Status.CONFLICT).build();
        }

        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(java.nio.file.Path.of(directoryPath));
        NodeService myNodeService = myProjectService.getNodeService();
        try {
            myNodeService.create(folderNode, fileName, Node.Types.FILE);
        } catch (IllegalArgumentException e)
        {
            Logger.logError("ERROR on CREATE/FILE: parent folder of " + fileName + " at " + path + " does not exist or is not a directory");
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            Logger.logError("ERROR on CREATE/FILE: create file " + fileName + " at " + path + " failed");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        File fileCreated = new File(path.toString());
        if (!fileCreated.isFile())
        {
            Logger.logError("ERROR on CREATE/FILE: file " + fileName + " at " + path + " has not been created.");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on CREATE/FILE: file " + fileName + " at " + path);
        return Response.ok(new FileResponse(fileName, path.toString(), "")).build();
    }

    @POST
    @Path("/create/folder")
    public Response createFolder(SimpleRequest request) {
        Logger.log("Attempting CREATE/FOLDER");

        java.nio.file.Path path = Paths.get(request.getPath());
        File folder = new File(path.toString());
        String folderName = folder.getName();

        if (folder.isDirectory())
        {
            Logger.logError("ERROR on CREATE/FOLDER: folder " + folderName + " at " + path + " already exists");
            return Response.status(Response.Status.CONFLICT).build();
        }

        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(java.nio.file.Path.of(directoryPath));
        NodeService myNodeService = myProjectService.getNodeService();
        try {
            myNodeService.create(folderNode, folderName, Node.Types.FOLDER);
        } catch (IllegalArgumentException e) {
            Logger.logError("ERROR on CREATE/FILE: folder " + folderName + " at " + path + " does not exist or is not a directory");
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            Logger.logError("ERROR on CREATE/FILE: create folder " + folderName + " at " + path + " failed");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        File folderCreated = new File(path.toString());

        if (!folderCreated.isDirectory())
        {
            Logger.logError("ERROR on CREATE/FOLDER: folder " + folderName + " at " + path + " not been created.");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on CREATE/FOLDER: folder " + folderName + " at " + path);
        return Response.ok(new FileResponse(folderName, request.getPath(), "")).build();
    }

    @POST
    @Path("/delete/file")
    public Response deleteFile(SimpleRequest request) {
        Logger.log("Attempting DELETE/FILE");

        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();
        File file = new File(path.toString());

        if (!file.isFile())
        {
            Logger.logError("ERROR on DELETED/FILE: file " + fileName + " at " + path + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Node fileNode = new FileNode(path);
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(fileNode);
        File fileDeleted = new File(path.toString());

        if (fileDeleted.isFile())
        {
            Logger.logError("ERROR on DELETE/FILE: file " + fileName + " at " + path + " has not been deleted.");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on DELETE/FILE: file " + fileName + " at " + path);
        return Response.ok(new FileResponse(fileName, request.getPath(), "")).build();
    }

    @POST
    @Path("/delete/folder")
    public Response deleteFolder(SimpleRequest request) {
        Logger.log("Attempting DELETE/FOLDER");

        java.nio.file.Path path = Paths.get(request.getPath());
        File folder = new File(path.toString());
        String folderName = path.getFileName().toString();
        if (!folder.isDirectory())
        {
            Logger.logError("ERROR on DELETED/FILE: file " + folderName + " at " + path + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Node folderNode = new FolderNode(path);
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(folderNode);
        File folderDeleted = new File(path.toString());

        if (folderDeleted.isDirectory())
        {
            Logger.logError("ERROR on DELETE/FILE: file " + folderName + " at " + path + " not been deleted.");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on DELETE/FOLDER: folder " + folderName + " at " + path);
        return Response.ok(new FileResponse(folderName, request.getPath(), "")).build();
    }

    @POST
    @Path("/execFeature")
    public Response execFeature(ExecFeatureRequest request) {
        Logger.log("Attempting EXECFEATURE");

        if (!ProjectsMap.containsKey(request.getProject()))
        {
            Logger.logError("ERROR on EXECFEATURE: project " + request.getProject() + " not opened");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        String projectName = request.getProject();
        Feature.Type type = null;
        switch(request.getFeature().toUpperCase()){
            case "CLEANUP":
                type = Mandatory.Features.Any.CLEANUP;
                break;
            case "DIST":
                type = Mandatory.Features.Any.DIST;
                break;
            case "SEARCH":
                type = Mandatory.Features.Any.SEARCH;
                break;
            case "PULL":
                type = Mandatory.Features.Git.PULL;
                break;
            case "ADD":
                type = Mandatory.Features.Git.ADD;
                break;
            case "COMMIT":
                type = Mandatory.Features.Git.COMMIT;
                break;
            case "PUSH":
                type = Mandatory.Features.Git.PUSH;
                break;
            case "COMPILE":
                type = Mandatory.Features.Maven.COMPILE;
                break;
            case "CLEAN":
                type = Mandatory.Features.Maven.CLEAN;
                break;
            case "TEST":
                type = Mandatory.Features.Maven.TEST;
                break;
            case "PACKAGE":
                type = Mandatory.Features.Maven.PACKAGE;
                break;
            case "INSTALL":
                type = Mandatory.Features.Maven.INSTALL;
                break;
            case "EXEC":
                type = Mandatory.Features.Maven.EXEC;
                break;
            case "TREE":
                type = Mandatory.Features.Maven.TREE;
                break;
            default:
                break;
        }

        if (type == null) {
            Logger.logError("ERROR on EXECFEATURE: feature " + request.getFeature() + " unknown");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        boolean result = myProjectService.execute(ProjectsMap.get(projectName), type, request.getParams()).isSuccess();
        if (!result)
        {
            Logger.logError("ERROR on EXECFEATURE: executing feature " + request.getFeature() + " failed");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on EXECFEATURE: feature " + request.getFeature() + " in project " + request.getProject());
        return Response.ok(new ExecFeatureResponse(request.getFeature(), request.getProject(), request.getParams())).build();
    }

    @POST
    @Path("/move")
    public Response move(MoveRequest request) {
        Logger.log("Attempting MOVE");

        if (request.getSrc() == null || request.getSrc().isEmpty() || request.getDst() == null
                || request.getDst().isEmpty()) {
            Logger.logError("ERROR on MOVE: from " + request.getSrc() + " to " + request.getDst());
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        java.nio.file.Path path_src = Paths.get(request.getSrc());
        java.nio.file.Path path_dst = Paths.get(request.getDst());

        String fileName = path_src.getFileName().toString();
        Node fileNodeSrc = new FileNode(path_src);
        Node folderNodeDst = new FolderNode(path_dst);
        NodeService myNodeService = myProjectService.getNodeService();
        try {
            myNodeService.move(fileNodeSrc, folderNodeDst);
        } catch (IllegalArgumentException e) {
            Logger.logError("ERROR on MOVE: from " + request.getSrc() + " to " + request.getDst() + ": " + e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            Logger.logError("ERROR on MOVE: move file " + fileName + " from " + request.getSrc() + " to " + request.getDst() + " failed");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on MOVE: from " + request.getSrc() + " to " + request.getDst());
        return Response.ok(new MoveResponse(request.getSrc(), request.getDst())).build();
    }

    @POST
    @Path("/update")
    public Response update(UpdateRequest request) {
        Logger.log("Attempting UPDATE");

        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();
        File file = new File(path.toString());

        if (!file.isFile()) {
            Logger.logError("ERROR on UPDATE: " + fileName + " at " + path + " is not a file");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        NodeService myNodeService = myProjectService.getNodeService();
        byte[] byteArrray = request.getContent().getBytes();
        Node fileNode = new FileNode(java.nio.file.Path.of(request.getPath()));

        try {
            myNodeService.update(fileNode, request.getFrom(), request.getTo(), byteArrray);
        } catch (IllegalArgumentException e) {
            Logger.logError("ERROR on UPDATE: file " + fileName + ": invalid argument from " + request.getFrom() + " to " + request.getTo());
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            Logger.logError("ERROR on UPDATE: update failed on file " + fileName + " from " + request.getFrom() + " to " + request.getTo());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on UPDATE: updated " + fileName + " at " + request.getPath() + " from " + request.getFrom() + " to " + request.getTo() + " with " + request.getContent());
        return Response.ok(new UpdateResponse(request.getPath(), request.getFrom(), request.getTo(), request.getContent())).build();
    }
}