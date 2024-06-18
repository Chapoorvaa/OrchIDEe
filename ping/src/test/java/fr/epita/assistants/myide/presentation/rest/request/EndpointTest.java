package fr.epita.assistants.myide.presentation.rest.request;

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
    @Tag("Endpoint Open Project Test")
    @Test
    public void endpoint_open_project_test(){}

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

    @Tag("Endpoint ExecFeature Project Not Opened Test")
    @Test
    public void endpoint_execfeature_project_not_opened_test(){}

    @Tag("Endpoint ExecFeature Opened No Feature Test")
    @Test
    public void endpoint_execfeature_opened_no_feature_test(){}

    @Tag("Endpoint ExecFeature Test")
    @Test
    public void endpoint_execfeature_test(){}

    @Tag("Endpoint Open Project Not Exist Test")
    @Test
    public void endpoint_open_project_not_exist_test(){}

    @Tag("Endpoint Open File Test")
    @Test
    public void endpoint_open_file_test(){}

    @Tag("Endpoint Open File Not Exist Test")
    @Test
    public void endpoint_open_file_not_exist_test(){}

    @Tag("Endpoint Create File Test")
    @Test
    public void endpoint_create_file_test(){}

    @Tag("Endpoint Create File Already Exist Test")
    @Test
    public void endpoint_create_file_already_exist_test(){}

    @Tag("Endpoint Create Folder Test")
    @Test
    public void endpoint_create_folder_test(){}

    @Tag("Endpoint Create Folder Already Exist Test")
    @Test
    public void endpoint_create_folder_already_exist_test(){}

    @Tag("Endpoint Delete File Test")
    @Test
    public void endpoint_delete_file_test(){}

    @Tag("Endpoint Delete File Not Exist Test")
    @Test
    public void endpoint_delete_file_not_exist_test(){}

    @Tag("Endpoint Delete Folder Test")
    @Test
    public void endpoint_delete_folder_test(){}

    @Tag("Endpoint Delete Folder Not Exist Test")
    @Test
    public void endpoint_delete_folder_not_exist_test(){}

    @Tag("Endpoint Move Test")
    @Test
    public void endpoint_move_test(){}

    @Tag("Endpoint Update File Test")
    @Test
    public void endpoint_update_file_test(){}

    @Tag("Endpoint Update Folder Test")
    @Test
    public void endpoint_update_folder_test(){}
}
