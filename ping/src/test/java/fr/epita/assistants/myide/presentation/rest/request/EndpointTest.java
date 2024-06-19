package fr.epita.assistants.myide.presentation.rest.request;

import io.restassured.response.Response;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.*;
import io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.Matchers.*;

/** For the endpoints we used to different packages: JUnit and Rest Assured.
 * Rest Assured is a test unit used primarily for http request.
 * You can see a simple guide on how to use it with the {@link #endpoint_hello_world_test() hello_world} test.
 **/
@Tag("Endpoint Tests")
public class EndpointTest {
    @Tag("Endpoint Hello World Test")
    @Test
    public void endpoint_hello_world_test(){
        // Mandatory. It is here to specify what you give to it at the beginning (config file, etc.).
        given()
        // Mandatory. Here you can make your requests
        .when()
            .get("/api/hello")
        // Mandatory. There you check everything you want to test.
        .then()
            .statusCode(200)
            .body(equalTo("Hello World !"));
    }

    @Tag("Endpoint Open Project Test")
    @Test
    public void endpoint_open_project_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/open/project")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint ExecFeature Project Not Opened Test")
    @Test
    public void endpoint_execfeature_project_not_opened_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n" +
                "  \"feature\": [],\n" +
                "  \"project\": \"\" \n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/execFeature")
        .then()
            .statusCode(404);
    }

    @Tag("Endpoint ExecFeature Opened No Feature Test")
    @Test
    public void endpoint_execfeature_opened_no_feature_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n" +
                "  \"feature\": [],\n" +
                "  \"project\": \"\" \n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("api/execFeature")
        .then()
            .statusCode(500);
    }

    @Tag("Endpoint ExecFeature Test")
    @Test
    public void endpoint_execfeature_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n" +
                "  \"feature\": [],\n" +
                "  \"project\": \"\" \n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("api/execFeature")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Open Project Not Exist Test")
    @Test
    public void endpoint_open_project_not_exist_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/open/project")
        .then()
            .statusCode(404);
    }

    @Tag("Endpoint Open File Test")
    @Test
    public void endpoint_open_file_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/open/file")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Open File Not Exist Test")
    @Test
    public void endpoint_open_file_not_exist_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/open/file")
        .then()
            .statusCode(404);
    }

    @Tag("Endpoint Create File Test")
    @Test
    public void endpoint_create_file_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/create/file")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Create File Already Exist Test")
    @Test
    public void endpoint_create_file_already_exist_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/create/file")
        .then()
            .statusCode(409);
    }

    @Tag("Endpoint Create Folder Test")
    @Test
    public void endpoint_create_folder_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/create/folder")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Create Folder Already Exist Test")
    @Test
    public void endpoint_create_folder_already_exist_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/create/folder")
        .then()
            .statusCode(409);
    }

    @Tag("Endpoint Delete File Test")
    @Test
    public void endpoint_delete_file_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/delete/file")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Delete File Not Exist Test")
    @Test
    public void endpoint_delete_file_not_exist_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/delete/file")
        .then()
            .statusCode(404);
    }

    @Tag("Endpoint Delete Folder Test")
    @Test
    public void endpoint_delete_folder_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/delete/folder")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Delete Folder Not Exist Test")
    @Test
    public void endpoint_delete_folder_not_exist_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("/api/delete/folder")
        .then()
            .statusCode(404);
    }

    @Tag("Endpoint Move Test")
    @Test
    public void endpoint_move_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n" +
                "  \"src\": \"\",\n" +
                "  \"dst\": \"\" \n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("api/move")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Update File Test")
    @Test
    public void endpoint_update_file_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n" +
                "  \"from\": 0,\n" +
                "  \"to\": 0,\n" +
                "  \"content\": \"\" \n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("api/update")
        .then()
            .statusCode(200);
    }

    @Tag("Endpoint Update Folder Test")
    @Test
    public void endpoint_update_folder_test(){
        String requestBody = "{\n" +
                "  \"path\": \"\",\n" +
                "  \"from\": 0,\n" +
                "  \"to\": 0,\n" +
                "  \"content\": \"\" \n}";
        given()
            // TODO: add a testing project
            .header("Content-type", "application/json")
            .and()
            .body(requestBody)
        .when()
            .post("api/update")
        .then()
            .statusCode(200);
    }
}
