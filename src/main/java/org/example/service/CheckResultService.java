package org.example.service;

import lombok.Setter;

import java.time.LocalTime;

@Setter
public class CheckResultService {

    private JpaService jpaService;

    public void checkAndPersist(double x, double y, int r) {
        boolean hit = Geometry.hit(x, y, r);

        jpaService.insertResult(x, y, r, hit, LocalTime.now());
    }
}
