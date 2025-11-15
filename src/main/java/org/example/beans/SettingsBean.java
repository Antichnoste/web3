package org.example.beans;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SettingsBean {

    private List<Double> xOptions;
    private List<Integer> rOptions;
    private double yMin;
    private double yMax;
    private int clockPeriodSec;

    private String studentFio;
    private String group;
    private String variant;

    private String resourceVersion;
}