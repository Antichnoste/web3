package org.example.beans;

import org.example.model.HitEntity;
import org.example.service.JpaService;

import java.util.List;

public class ResultsBean{

    private JpaService jpa;
    private int maxRows = 2000;
    private volatile List<HitEntity> data;

    public void setJpa(JpaService jpa) { this.jpa = jpa; }
    public int getMaxRows() { return maxRows; }
    public void setMaxRows(int maxRows) { this.maxRows = maxRows; }

    public void reload() {
        data = jpa.listLatest(maxRows);
    }

    public List<HitEntity> getData() {
        if (data == null) reload();
        return data;
    }
}
