// TODO format this class / optimize imports
package com.serve.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "owners")
public class Owner implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name", length = 128, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 128)
    private String lastName;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Device> devices;


}
