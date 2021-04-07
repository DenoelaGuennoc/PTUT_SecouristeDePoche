package secouristedepoche.entity;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.*;
import lombok.*;


// Un exemple d'entité
// On utilise Lombok pour auto-générer getter / setter / toString...
// cf. https://examples.javacodegeeks.com/spring-boot-with-lombok/
@Getter @Setter @NoArgsConstructor @RequiredArgsConstructor @ToString
@Entity // Une entité JPA
public class Theme {
    @Id  @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer id;

    @Column(unique=true)
    @NonNull
    public String titre; //passage en public car ne fonctionnait pas dans templates/afficheTheme sur les ordi de Deno et Camille
    
    @OneToMany(mappedBy = "theme")
    private List<Chapitre> chapitres = new LinkedList<>();

    @ManyToMany (mappedBy = "sujets")
    private List<Quizz> interrogations = new LinkedList<>();

}