package fr.epita.assistants.myide.presentation.rest;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.entity.report.GitStatusFeatureReport;
import fr.epita.assistants.myide.domain.entity.report.ChatbotFeatureReport;
import fr.epita.assistants.myide.domain.entity.report.RunReport;
import fr.epita.assistants.myide.domain.entity.report.SearchFeatureReport;
import fr.epita.assistants.myide.domain.service.NodeService;
import fr.epita.assistants.myide.domain.service.ProjectService;
import fr.epita.assistants.myide.presentation.rest.request.*;

import fr.epita.assistants.myide.presentation.rest.response.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import fr.epita.assistants.myide.utils.Logger;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;
import java.nio.charset.StandardCharsets;

@Path("/api")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MyIdeEndpoint {
    public ProjectService myProjectService = MyIde.init(null);
    public Map<String, Project> ProjectsMap = new HashMap<>();

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
        String projectName = path.getFileName().toString();

        Logger.log("Attempting OPEN/PROJECT: project " + projectName + " at " + path);

        Project myProject = myProjectService.load(path);

        if (myProject == null) {
            Logger.logError("ERROR on OPEN/PROJECT: project " + projectName + " at " + path + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        ProjectsMap.put(projectName, myProject);
        Logger.log("SUCCESS on OPEN/PROJECT: project " + projectName + " at " + path);
        return Response.ok(new ProjectResponse(projectName, path.toString())).build();
    }

    @POST
    @Path("/create/project")
    public Response createProject(CreateProjectRequest request) {
        Logger.log("Attempting CREATE/PROJECT: project " + request.getName() + " at " + request.getPath());

        java.nio.file.Path path = Paths.get(request.getPath()).resolve(request.getName());

        File rootDir = new File(path.toString());
        if (!rootDir.exists()){
            rootDir.mkdirs();
        }
        else {
            Logger.logError("ERROR on CREATE/PROJECT: project " + request.getName() + " at " + request.getPath());
            return Response.status(Response.Status.CONFLICT).build();
        }

        if (Objects.equals(request.getLanguage(), "JAVA")) {
            try {
                InputStream input = getClass().getClassLoader().getResourceAsStream("pom.txt");
                String content = new BufferedReader(
                        new InputStreamReader(input, StandardCharsets.UTF_8))
                        .lines()
                        .collect(Collectors.joining("\n"))
                        .replace("TITLE_PLACEHOLDER", request.getName());

                BufferedWriter writer = new BufferedWriter(new FileWriter(path.resolve("pom.xml").toString()));
                writer.write(content);
                writer.close();
            }
            catch (IOException e) {
                Logger.logError("ERROR on CREATE/PROJECT: project " + request.getName() + " at " + request.getPath());
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
        else if (Objects.equals(request.getLanguage(), "CPP")) {
            try {
                InputStream input = getClass().getClassLoader().getResourceAsStream("Makefile.txt");
                String content = new BufferedReader(
                        new InputStreamReader(input, StandardCharsets.UTF_8))
                        .lines()
                        .collect(Collectors.joining("\n"))
                        .replace("TITLE_PLACEHOLDER", request.getName());

                BufferedWriter writer = new BufferedWriter(new FileWriter(path.resolve("Makefile").toString()));
                writer.write(content);
                writer.close();
            }
            catch (IOException e) {
                Logger.logError("ERROR on CREATE/PROJECT: project " + request.getName() + " at " + request.getPath());
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }

        Project myProject = myProjectService.load(path);

        if (myProject == null) {
            Logger.logError("ERROR on CREATE/PROJECT: project " + request.getName() + " at " + request.getPath());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        ProjectsMap.put(request.getName(), myProject);
        Logger.log("SUCCESS on CREATE/PROJECT: project " + request.getName()+ " at " + request.getPath());
        return Response.ok(new ProjectResponse(request.getName(), path.toString())).build();
    }

    @POST
    @Path("/open/file")
    public Response openFile(SimpleRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();

        Logger.log("Attempting OPEN/FILE: file " + fileName + " at " + path);

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
        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();

        Logger.log("Attempting CREATE/FILE: file " + fileName + " at " + path);

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
        java.nio.file.Path path = Paths.get(request.getPath());
        File folder = new File(path.toString());
        String folderName = folder.getName();

        Logger.log("Attempting CREATE/FOLDER: folder " + folderName + " at " + path);

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
    @Path("/delete")
    public Response delete(SimpleRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        String fName = path.getFileName().toString();

        File f = new File(path.toString());

        Logger.log("Attempting DELETE/FILE-FOLDER: " + fName + " at " + path);

        if (!f.exists()) {
            Logger.logError("ERROR on DELETED/FILE-FOLDER: " + fName + " at " + path + " not found");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Node fNode;

        if (Files.isDirectory(path)) {
            fNode = new FolderNode(path);
        }
        else {
            fNode = new FileNode(path);
        }

        NodeService myNodeService = myProjectService.getNodeService();
        myNodeService.delete(fNode);
        File fDeleted = new File(path.toString());

        if (fDeleted.isDirectory() || fDeleted.isFile())
        {
            Logger.logError("ERROR on DELETE/FILE-FOLDER: " + fName + " at " + path + " has not been deleted.");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on DELETE/FILE-FOLDER: " + fName + " at " + path);
        return Response.ok(new FileResponse(fName, request.getPath(), "")).build();
    }
    
    @POST
    @Path("/execFeature")
    public Response execFeature(ExecFeatureRequest request) {
        Logger.log("Attempting EXECFEATURE: feature " + request.getFeature() + " in project " + request.getProject());

        if (!ProjectsMap.containsKey(request.getProject()))
        {
            Logger.logError("ERROR on EXECFEATURE: project " + request.getProject() + " not opened");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        String projectName = request.getProject();
        Feature.Type type = null;
        switch(request.getFeature().toUpperCase()) {
            case "CLEANUP":
                type = Mandatory.Features.Any.CLEANUP;
                break;
            case "DIST":
                type = Mandatory.Features.Any.DIST;
                break;
            case "SEARCH":
                type = Mandatory.Features.Any.SEARCH;
                break;
            case "CHATBOT":
                type = ExtraFeatures.Features.Any.CHATBOT;
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
            case "STATUS":
                type = ExtraFeatures.Features.Git.STATUS;
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
            case "RUN":
                type = ExtraFeatures.Features.Maven.RUN;
                break;
            case "MAKE":
                type = ExtraFeatures.Features.Make.MAKE;
                break;
            default:
                Logger.logError("ERROR on EXECFEATURE: feature " + request.getFeature() + " unknown");
                return Response.status(Response.Status.NOT_FOUND).build();
        }

        Feature.ExecutionReport report = myProjectService.execute(ProjectsMap.get(projectName), type, request.getParams().toArray());
        if (!report.isSuccess())
        {
            Logger.logError("ERROR on EXECFEATURE: executing feature " + request.getFeature() + " failed");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on EXECFEATURE: feature " + request.getFeature() + " in project " + request.getProject());

        if (report instanceof GitStatusFeatureReport gitStatusFeatureReport) {
            return Response.ok(new GitStatusResponse(gitStatusFeatureReport.untracked(), gitStatusFeatureReport.added(), gitStatusFeatureReport.modified(), gitStatusFeatureReport.uncommited())).build();
        }
        else if (report instanceof SearchFeatureReport searchReport) {
            List<String> result = new ArrayList<>();
            searchReport.getResults().forEach(e -> result.add(e.getPath().toString()));
            return Response.ok(new SearchFeatureResponse(request.getFeature(), request.getProject(), request.getParams(), result)).build();
        }
        else if (report instanceof ChatbotFeatureReport chatbotReport) {
            return Response.ok(new ChatbotFeatureResponse(chatbotReport.chatbotResponse())).build();
        }
        else if (report instanceof RunReport runReport) {
            return Response.ok(new RunResponse(runReport.output())).build();
        }
        return Response.ok(new ExecFeatureResponse(request.getFeature(), request.getProject(), request.getParams())).build();
    }

    @POST
    @Path("/move")
    public Response move(MoveRequest request) {
        Logger.log("Attempting MOVE: from " + request.getSrc() + " to " + request.getDst());

        if (request.getSrc() == null || request.getSrc().isEmpty() || request.getDst() == null
                || request.getDst().isEmpty()) {
            Logger.logError("ERROR on MOVE: from " + request.getSrc() + " to " + request.getDst());
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        java.nio.file.Path path_src = Paths.get(request.getSrc());
        java.nio.file.Path path_dst = Paths.get(request.getDst());

        if (!path_src.toFile().exists() || !path_dst.toFile().exists()) {
            Logger.logError("ERROR on MOVE: from " + request.getSrc() + " to " + request.getDst() + ", Src or Dst do not exist");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Node nodeSrc;
        if (path_src.toFile().isFile()) {
            nodeSrc = new FileNode(path_src);
        }
        else {
            nodeSrc = new FolderNode(path_src);
        }

        String fileName = path_src.getFileName().toString();
        FolderNode folderNodeDst = new FolderNode(path_dst);
        NodeService myNodeService = myProjectService.getNodeService();

        try {
            myNodeService.move(nodeSrc, folderNodeDst);
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
        java.nio.file.Path path = Paths.get(request.getPath());
        String fileName = path.getFileName().toString();

        Logger.log("Attempting UPDATE: file " + fileName + " at " + request.getPath() + " from " + request.getFrom() + " to " + request.getTo() + " with " + request.getContent());

        File file = new File(path.toString());

        if (!file.isFile()) {
            Logger.logError("ERROR on UPDATE: " + fileName + " at " + path + " is not a file");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        NodeService myNodeService = myProjectService.getNodeService();
        byte[] byteArray = request.getContent().getBytes();
        Node fileNode = new FileNode(java.nio.file.Path.of(request.getPath()));

        try {
            myNodeService.update(fileNode, request.getFrom(), request.getTo(), byteArray);
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


    @POST
    @Path("/rename")
    public Response rename(RenameRequest request) {
        java.nio.file.Path path = Paths.get(request.getPath());
        String newName = request.getNewName();

        Logger.log("Attempting RENAME: " + path + " to " + newName);

        File file = new File(path.toString());

        if (!file.exists()) {
            Logger.logError("ERROR on RENAME: " + path + " does not exist");
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        NodeService myNodeService = myProjectService.getNodeService();
        Node nodeToRename;
        if (Files.isDirectory(path)) {
            nodeToRename = new FolderNode(path);
        }
        else {
            nodeToRename = new FileNode(path);
        }

        try {
            myNodeService.rename(nodeToRename, newName);
        } catch (IllegalArgumentException e) {
            Logger.logError("ERROR on RENAME: file " + path + " to " + newName + " failed");
            return Response.status(Response.Status.BAD_REQUEST).build();

        } catch (RuntimeException e) {
            Logger.logError("ERROR on RENAME: rename failed on " + path + "with" + newName);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        Logger.log("SUCCESS on RENAME: renamed " + path + " with " + newName);
        return Response.ok(new RenameResponse(path.toString(), newName)).build();
    }
}