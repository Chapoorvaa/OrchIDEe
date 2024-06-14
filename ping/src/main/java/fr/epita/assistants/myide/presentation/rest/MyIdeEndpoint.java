package fr.epita.assistants.myide.presentation.rest;

import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.service.MyProjectService;
import fr.epita.assistants.myide.domain.service.NodeService;
import fr.epita.assistants.myide.domain.service.ProjectService;
import fr.epita.assistants.myide.presentation.rest.request.ExecFeatureRequest;
import fr.epita.assistants.myide.presentation.rest.request.MoveRequest;
import fr.epita.assistants.myide.presentation.rest.request.SimpleRequest;
import fr.epita.assistants.myide.presentation.rest.request.UpdateRequest;

import fr.epita.assistants.myide.presentation.rest.response.FileReponse;
import fr.epita.assistants.myide.presentation.rest.response.ProjectResponse;
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
    public Project myProject;

    @GET
    @Path("/hello")
    public Response helloWorld() {
        Logger.log("Saying hello !");
        return Response.ok("Hello World !").build();
    }

    @POST
    @Path("/open/project")
    public Response openProject(SimpleRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        String name = path.getFileName().toString();
        ProjectsMap.put(name, myProjectService.load(path));
        Logger.log("open a project!");
        return Response.ok(new ProjectResponse(name, path)).build();
    }

    @POST
    @Path("/open/file")
    public Response openFile(SimpleRequest request) {
        Logger.log("open a file!");
        FileNode fileNode = new FileNode(Paths.get(request.getPath()));
        return Response.ok(new FileReponse(fileNode.read())).build();
    }

    @POST
    @Path("/create/file")
    public Response createFile(SimpleRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        File file = new File(path.toString());
        if (file.isFile())
        {
            return Response.serverError().status(400).build();
        }
        String fileName = path.getFileName().toString();
        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(java.nio.file.Path.of(directoryPath));
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.create(folderNode, fileName, Node.Types.FILE);
        File fileCreated = new File(path.toString());
        if (!fileCreated.isFile())
        {
            return Response.serverError().status(400).build();
        }
        Logger.log("create a file!");
        return Response.ok().build();
    }

    @POST
    @Path("/create/folder")
    public Response createFolder(SimpleRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        File folder = new File(path.toString());
        if (folder.isDirectory())
        {
            return Response.serverError().status(400).build();
        }
        String fileName = path.getFileName().toString();
        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(java.nio.file.Path.of(directoryPath));
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.create(folderNode, fileName, Node.Types.FOLDER);
        File folderCreated = new File(path.toString());
        if (!folderCreated.isDirectory())
        {
            return Response.serverError().status(400).build();
        }
        Logger.log("create a folder!");
        return Response.ok().build();
    }

    @POST
    @Path("/delete/file")
    public Response deleteFile(SimpleRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        File file = new File(path.toString());
        if (!file.isFile())
        {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Node fileNode = new FileNode(path);
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(fileNode);
        File fileDeleted = new File(path.toString());
        if (fileDeleted.isFile())
        {
            return Response.serverError().status(500).build();
        }
        Logger.log("delete a file!");
        return Response.ok().build();
    }

    @POST
    @Path("/delete/folder")
    public Response deleteFolder(SimpleRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        File folder = new File(path.toString());
        if (!folder.isDirectory())
        {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Node folderNode = new FolderNode(path);
        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(folderNode);
        File folderDeleted = new File(path.toString());
        if (folderDeleted.isDirectory())
        {
            return Response.serverError().status(500).build();
        }
        Logger.log("delete a folder!");
        return Response.ok(new FileReponse(path.getFileName().toString())).build();
    }

    @POST
    @Path("/execFeature")
    public Response execFeature(ExecFeatureRequest request) {
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
        return Response.ok().build();
    }

    @POST
    @Path("/update")
    public Response update(UpdateRequest request) {
        NodeService myNodeService = myProjectService.getNodeService();
        byte[] byteArrray = request.getContent().getBytes();
        Node fileNode = new FileNode(java.nio.file.Path.of(request.getPath()));
        myNodeService.update(fileNode, request.getFrom(), request.getTo(), byteArrray);
        Logger.log("update a file!");
        return Response.ok().build();
    }
}