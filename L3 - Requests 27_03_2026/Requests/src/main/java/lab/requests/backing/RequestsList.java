package lab.requests.backing;

import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Size;
import lab.requests.data.RequestRepository;
import lab.requests.entities.Request;
import jakarta.faces.component.html.HtmlDataTable;

import java.util.List;

@Named
@RequestScoped
public class RequestsList {
    @Inject
    private RequestRepository requestRepository;

    @Size(min = 3, max = 30, message = "{request.size}")
    private String newRequest;

    private HtmlDataTable requestsDataTable;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public HtmlDataTable getRequestsDataTable() {
        return requestsDataTable;
    }

    @Transactional
    public String addRequest() {
        Request request = new Request();
        request.setRequestDate(java.time.LocalDate.now());
        request.setRequestText(newRequest);
        requestRepository.create(request);
        setNewRequest("");
        return "requestsList?faces-redirect=true";
    }

    @Transactional
    public String deleteRequest() {
        Request req = (Request) requestsDataTable.getRowData();
        requestRepository.remove(req);
        return "requestsList?faces-redirect=true";
    }

    public String getNewRequest() { return newRequest; }
    public void setNewRequest(String newRequest) { this.newRequest = newRequest; }
    public void setRequestsDataTable(HtmlDataTable requestsDataTable) { this.requestsDataTable = requestsDataTable; }
}
