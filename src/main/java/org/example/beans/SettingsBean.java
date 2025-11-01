package org.example.beans;

import java.util.List;

public class SettingsBean {

    private List<Integer> xOptions;
    private List<Double> rOptions;
    private double yMin;
    private double yMax;
    private int clockPeriodSec;

    private String studentFio;
    private String group;
    private String variant;

    private String resourceVersion;

    public List<Integer> getXOptions() { return xOptions; }
    public void setXOptions(List<Integer> xOptions) { this.xOptions = xOptions; }

    public List<Double> getROptions() { return rOptions; }
    public void setROptions(List<Double> rOptions) { this.rOptions = rOptions; }

    public double getYMin() { return yMin; }
    public void setYMin(double yMin) { this.yMin = yMin; }

    public double getYMax() { return yMax; }
    public void setYMax(double yMax) { this.yMax = yMax; }

    public int getClockPeriodSec() { return clockPeriodSec; }
    public void setClockPeriodSec(int clockPeriodSec) { this.clockPeriodSec = clockPeriodSec; }

    public String getStudentFio() { return studentFio; }
    public void setStudentFio(String studentFio) { this.studentFio = studentFio; }

    public String getGroup() { return group; }
    public void setGroup(String group) { this.group = group; }

    public String getVariant() { return variant; }
    public void setVariant(String variant) { this.variant = variant; }

    public String getResourceVersion() { return resourceVersion; }
    public void setResourceVersion(String resourceVersion) { this.resourceVersion = resourceVersion; }
}