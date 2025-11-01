package org.example.beans;

import org.example.service.Geometry;
import org.example.service.JpaService;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

public class FormBean implements Serializable {

    private Integer x;
    private Double y;
    private Double r;

    private Double graphX;
    private Double graphY;

    private JpaService jpa;
    private ResultsBean results;
    private SettingsBean settings;

    public void submit() {
        if (r == null || y == null) return;
        persistAndRefresh(x, y, r);
    }

    public void submitFromGraph() {
        if (graphX == null || graphY == null || r == null || r <= 0) return;
        persistAndRefresh(graphX, graphY, r);
        graphX = null;
        graphY = null;
    }

    private void persistAndRefresh(double px, double py, double pr) {
        boolean hit = Geometry.hit(px, py, pr);
        jpa.insertResult(px, py, pr, hit, new Date());
        results.reload();
    }

    public Integer getX() { return x; }
    public void setX(Integer x) { this.x = x; }

    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }

    public Double getR() { return r; }
    public void setR(Double r) { this.r = r; }

    public Double getGraphX() { return graphX; }
    public void setGraphX(Double graphX) { this.graphX = graphX; }

    public Double getGraphY() { return graphY; }
    public void setGraphY(Double graphY) { this.graphY = graphY; }

    public void setJpa(JpaService jpa) { this.jpa = jpa; }
    public void setResults(ResultsBean results) { this.results = results; }
    public SettingsBean getSettings() { return settings; }
    public void setSettings(SettingsBean settings) { this.settings = settings; }
}
