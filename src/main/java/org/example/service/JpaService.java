package org.example.service;

import org.example.model.HitEntity;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

public class JpaService {

    private static EntityManagerFactory buildEmf() {
        return Persistence.createEntityManagerFactory("default");
    }

    private static class EmfHolder {
        static final EntityManagerFactory EMF = buildEmf();
    }

    private EntityManager em() {
        return EmfHolder.EMF.createEntityManager();
    }


    public void insertResult(double x, double y, double r, boolean hit, LocalTime createdAt) {
        EntityManager em = em();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            HitEntity e = new HitEntity();
            e.setX(x); e.setY(y); e.setR(r);
            e.setHit(hit);
            e.setCreatedAt(createdAt);
            em.persist(e);
            tx.commit();
        } catch (RuntimeException ex) {
            if (tx.isActive()) tx.rollback();
            throw ex;
        } finally {
            em.close();
        }
    }
    public List<HitEntity> listLatest(int maxRows) {
        EntityManager em = em();
        try {
            return em.createQuery(
                            "SELECT h FROM HitEntity h ORDER BY h.createdAt DESC", HitEntity.class)
                    .setMaxResults(maxRows)
                    .getResultList();
        } finally {
            em.close();
        }
    }
}

