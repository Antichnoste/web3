package org.example.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "hit")
public class HitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double x;
    private double y;
    private double r;
    private boolean hit;

    @Column(nullable = false)
    private LocalTime createdAt;
}
