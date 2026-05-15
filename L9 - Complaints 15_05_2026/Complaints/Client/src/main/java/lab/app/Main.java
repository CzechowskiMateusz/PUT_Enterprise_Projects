package lab.app;

import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.MediaType;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args){
        Client client = ClientBuilder.newClient();

        String allComplaints =
                client.target("http://localhost:8080/Server-1.0-SNAPSHOT/" +
                                "api/complaints/")
                        .request(MediaType.APPLICATION_JSON)
                        .get(String.class);
        System.out.println("Wszystkie skargi : \n" + allComplaints);

        Pattern pattern = Pattern.compile("\"id\":(\\d+)");
        Matcher matcher = pattern.matcher(allComplaints);
        String id = "252";
        if(matcher.find()){
            id = matcher.group(1);
        }

        String status = client.target("http://localhost:8080/Server-1.0-SNAPSHOT/" +
                        "api/complaints/")
                .path(id)
                .path("status")
                .request(MediaType.TEXT_PLAIN)
                .get(String.class);
        System.out.println("Status skargi " + id + ": " + status);

        String oneComplaint =
                client.target("http://localhost:8080/Server-1.0-SNAPSHOT/" +
                                "api/complaints/")
                        .path(id)
                        .request(MediaType.APPLICATION_JSON)
                        .get(String.class);

        System.out.println("Skarga " + id + ": " + oneComplaint);

        String updatedComplaint = "{" +
                "\"id\":"+id+"," +
                "\"author\":\"Marvin Doherty\"," +
                "\"complaintDate\":\"2026-05-11\"," +
                "\"complaintText\":\"Please fix a tap in room 234 - Fixed Date\"," +
                "\"status\":\"closed\"" +
                "}";

        client.target("http://localhost:8080/Server-1.0-SNAPSHOT/api/complaints/")
                .request()
                .put(Entity.entity(updatedComplaint, MediaType.APPLICATION_JSON));

        System.out.println("Zaktualizowano skargę " + id);

        String openComplaints = client.target("http://localhost:8080/Server-1.0-SNAPSHOT/api/complaints/")
                .queryParam("status", "open")
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);
        System.out.println("\nWszystkie otwarte skargi:\n" + openComplaints);

        client.close();
    }
}
