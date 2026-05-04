package lab.requests.data;

import jakarta.enterprise.context.Dependent;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Dependent
public class EntityManagerProducer {
    @PersistenceContext
    private EntityManager em;

    @Produces
    @RequestScoped
    @Named("myEM")
    public EntityManager getEntityManager() {
        return em;
    }

}
