package fr.epita.assistants.myide.presentation.rest;

import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.presentation.rest.request.ExecFeatureRequest;
import fr.epita.assistants.myide.presentation.rest.request.MoveRequest;
import fr.epita.assistants.myide.presentation.rest.request.SimpleRequest;
import fr.epita.assistants.myide.presentation.rest.request.UpdateRequest;
import fr.epita.assistants.myide.domain.service.NodeService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import fr.epita.assistants.myide.utils.Logger;

import java.nio.file.Paths;

@Path("/api")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MyIdeEndpoint {

    @Inject MyProjectService myProjectService;
    public MyProject myProject;

    @GET @Path("/hello")
    public Response helloWorld()
    {
        Logger.log("Saying hello !");
        return Response.ok("Hello World !").build();
    }

    @POST @Path("/open/project")
    public Response openProject(SimpleRequest request)
    {
        java.nio.file.Path path = Paths.get(request.getPath());
        MyProject project = myProjectService.load(path);
        myProject = project;
        Logger.log("open a project!");
        return Response.ok().build();
    }

    @POST @Path("/open/file")
    public Response openFile(SimpleRequest request)
    {
        Logger.log("open a file!");
        return Response.ok().build();
    }

    @POST @Path("/create/file")
    public Response createFile(SimpleRequest request)
    {
        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();
        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(directoryPath);
        MyNodeService myNodeService = myProjectService.getNodeService();
        myNodeService.create(folderNode, fileName, Node.Types.FILE);
        Logger.log("create a file!");
        return Response.ok().build();
    }

    @POST @Path("/create/folder")
    public Response createFolder(SimpleRequest request)
    {
        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();
        String directoryPath = path.getParent().toString() + "/";
        Node folderNode = new FolderNode(directoryPath);
        MyNodeService myNodeService = myProjectService.getNodeService();
        myNodeService.create(folderNode, fileName, Node.Types.FOLDER);
        Logger.log("create a folder!");
        return Response.ok().build();
    }

    @POST @Path("/delete/file")
    public Response deleteFile(SimpleRequest request)
    {
        java.nio.file.Path path = Paths.get(request.getPath());
        Node fileNode = new FileNode(path);
        MyNodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(fileNode);
        Logger.log("delete a file!");
        return Response.ok().build();
    }

    @POST @Path("/delete/folder")
    public Response deleteFolder(SimpleRequest request)
    {
        java.nio.file.Path path = Paths.get(request.getPath());
        Node folderNode = new FolderNode(path);
        MyNodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(folderNode);
        Logger.log("delete a folder!");
        return Response.ok().build();
    }

    @POST
    @Path("/execFeature")
    public Response execFeature(ExecFeatureRequest request) {
        myProjectService.execute(request.getProject(), request.getFeature().getType(), request.getParams());
        Logger.log("exec a feature!");
        return Response.ok().build();
    }

    @POST
    @Path("/move")
    public Response move(MoveRequest request) {
        java.nio.file.Path path_src = Paths.get(request.getSrc());
        java.nio.file.Path path_dst = Paths.get(request.getDst());
        Node fileNodeSrc = new FileNode(path_src);
        Node folderNodeDst = new FolderNode(path_dst);
        MyNodeService myNodeService = myProjectService.getNodeService();
        myNodeService.move(fileNodeSrc, folderNodeDst);
        Logger.log("move a file!");
        return Response.ok().build();
    }

    @POST
    @Path("/update")
    public Response update(UpdateRequest request) {
        MyNodeService myNodeService = myProjectService.getNodeService();
        byte[] byteArrray = request.getContent().getBytes();
        Node fileNode = new FileNode(request.getPath());
        myNodeService.update(fileNode, request.getFrom(), request.getTo(), byteArrray);
        Logger.log("update a file!");
        return Response.ok().build();
    }
}