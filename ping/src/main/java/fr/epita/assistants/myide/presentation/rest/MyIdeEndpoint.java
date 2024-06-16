package fr.epita.assistants.myide.presentation.rest;

import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.service.MyProjectService;
import fr.epita.assistants.myide.domain.service.NodeService;
import fr.epita.assistants.myide.domain.service.ProjectService;
import fr.epita.assistants.myide.presentation.rest.request.ExecFeatureRequest;
import fr.epita.assistants.myide.presentation.rest.request.MoveRequest;
import fr.epita.assistants.myide.presentation.rest.request.SimpleRequest;
import fr.epita.assistants.myide.presentation.rest.request.UpdateRequest;

import fr.epita.assistants.myide.presentation.rest.response.FileResponse;
import fr.epita.assistants.myide.presentation.rest.response.MoveResponse;
import fr.epita.assistants.myide.presentation.rest.response.ProjectResponse;
import fr.epita.assistants.myide.presentation.rest.response.UpdateResponse;
import jakarta.ws.rs.*;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import fr.epita.assistants.myide.utils.Logger;

import java.io.File;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;

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
            Logger.logError("ERROR on OPEN/PROJECT project " + projectName + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        ProjectsMap.put(projectName, myProject);
        Logger.log("open a project! name: " + projectName + "path: " + path);
        return Response.ok(new ProjectResponse(projectName, path.toString())).build();
    }

    @POST
    @Path("/open/file")
    public Response openFile(SimpleRequest request) {
        Logger.log("Attempting OPEN/FILE");

        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();
        File file = new File(path.toString());

        if (file.isFile())
        {
            Logger.logError("ERROR on OPEN/FILE: file " + fileName + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        FileNode fileNode = new FileNode(path);
        Logger.log("open a file! name: " + fileName + "path: " + path);
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
            Logger.logError("ERROR on CREATE/FILE: file " + fileName + " already exists");
            return Response.serverError().status(404).build();
        }

        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(java.nio.file.Path.of(directoryPath));
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.create(folderNode, fileName, Node.Types.FILE);
        File fileCreated = new File(path.toString());

        if (!fileCreated.isFile())
        {
            Logger.logError("ERROR on CREATE/FILE: file " + fileName + " has not been created.");
            return Response.serverError().status(500).build();
        }

        Logger.log("create a file!");
        return Response.ok().build();
    }

    @POST
    @Path("/create/folder")
    public Response createFolder(SimpleRequest request) {
        Logger.log("Attempting CREATE/FOLDER");

        String pathString = request.getPath();
        while (pathString.endsWith("/")) {
            pathString = pathString.substring(0, pathString.length() - 1);
        }

        java.nio.file.Path path = Paths.get(request.getPath());
        String folderName = path.getFileName().toString();
        File folder = new File(path.toString());

        if (folder.isDirectory())
        {
            Logger.logError("ERROR on CREATE/FOLDER: file " + folderName + " already exists");
            return Response.status(404).build();
        }

        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(java.nio.file.Path.of(directoryPath));
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.create(folderNode, folderName, Node.Types.FOLDER);
        File folderCreated = new File(path.toString());

        if (!folderCreated.isDirectory())
        {
            Logger.logError("ERROR on CREATE/FOLDER: folder " + folderName + " has not been created.");
            return Response.serverError().status(500).build();
        }

        Logger.log("create a folder! name:" + folderName + "path:" + path);
        return Response.ok(new FileResponse(folderName, pathString, "")).build();
    }

    @POST
    @Path("/delete/file")
    public Response deleteFile(SimpleRequest request) {
        Logger.log("Attempting DELETE/FILE");

        String pathString = request.getPath();

        java.nio.file.Path path = Paths.get(pathString);
        String fileName = path.getFileName().toString();
        File file = new File(path.toString());

        if (!file.isFile())
        {
            Logger.logError("ERROR on DELETED/FILE: file " + fileName + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Node fileNode = new FileNode(path);
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(fileNode);
        File fileDeleted = new File(path.toString());

        if (fileDeleted.isFile())
        {
            Logger.logError("ERROR on DELETE/FILE: file " + fileName + " has not been deleted.");
            return Response.serverError().status(500).build();
        }

        Logger.log("delete a file! name: " + fileName + "path: " + path);
        return Response.ok(new FileResponse(fileName, pathString, "")).build();
    }

    @POST
    @Path("/delete/folder")
    public Response deleteFolder(SimpleRequest request) {
        Logger.log("Attempting DELETE/FOLDER");

        String pathString = request.getPath();
        while (pathString.endsWith("/")) {
            pathString = pathString.substring(0, pathString.length() - 1);
        }

        java.nio.file.Path path = Paths.get(request.getPath());
        File folder = new File(path.toString());
        String folderName = path.getFileName().toString();
        if (!folder.isDirectory())
        {
            Logger.logError("ERROR on DELETED/FILE: file " + folderName + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Node folderNode = new FolderNode(path);
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(folderNode);
        File folderDeleted = new File(path.toString());

        if (folderDeleted.isDirectory())
        {
            Logger.logError("ERROR on DELETE/FILE: file " + folderName + " has not been deleted.");
            return Response.serverError().status(500).build();
        }

        Logger.log("delete a folder!, name: " + folderName + "path: " + path);
        return Response.ok(new FileResponse(folderName, pathString, "")).build();
    }

    @POST
    @Path("/execFeature")
    public Response execFeature(ExecFeatureRequest request) {
        Logger.log("Attempting EXECFEATURE");

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
            Logger.logError("Error on EXECFEATURE");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        boolean result = myProjectService.execute(ProjectsMap.get(request.getFeature()), type, request.getParams()).isSuccess();
        if (!result)
        {
            Logger.logError("execute feature failed");
            return Response.serverError().status(500).build();
        }
      
        Logger.log("exec a feature!");
        return Response.ok().build();
    }

    @POST
    @Path("/move")
    public Response move(MoveRequest request) {
        Logger.log("Attempting MOVE");

        if (request.getSrc() == null || request.getSrc().isEmpty() || request.getDst() == null
                || request.getDst().isEmpty()) {
            Logger.logError("Error in MOVE: from " + request.getSrc() + " to " + request.getDst());
            return Response.serverError().status(400).build();
        }

        java.nio.file.Path path_src = Paths.get(request.getSrc());
        java.nio.file.Path path_dst = Paths.get(request.getDst());

        Node fileNodeSrc = new FileNode(path_src);
        Node folderNodeDst = new FolderNode(path_dst);
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.move(fileNodeSrc, folderNodeDst);
        Logger.log("move a file: from " + request.getSrc() + " to " + request.getDst());
        return Response.ok(new MoveResponse(request.getSrc(), request.getDst())).build();
    }

    @POST
    @Path("/update")
    public Response update(UpdateRequest request) {
        Logger.log("Attempting UPDATE");

        NodeService myNodeService = myProjectService.getNodeService();
        byte[] byteArrray = request.getContent().getBytes();
        Node fileNode = new FileNode(java.nio.file.Path.of(request.getPath()));
        myNodeService.update(fileNode, request.getFrom(), request.getTo(), byteArrray);
        Logger.log("update a file path: " + request.getPath() + ", to: " + request.getTo() + ", from: " + request.getFrom() + ", content: " + request.getContent());
        return Response.ok(new UpdateResponse(request.getPath(), request.getFrom(), request.getTo(), request.getContent())).build();
    }
}