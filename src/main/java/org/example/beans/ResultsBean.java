package org.example.beans;

import lombok.Getter;
import lombok.Setter;
import org.example.model.HitEntity;
import org.example.service.JpaService;

import java.util.List;

@Setter
public class ResultsBean{

    private JpaService jpa;

    @Getter
    private int maxRows = 2000;

    @Getter
    private List<HitEntity> data;

    public void reload() {
        data = jpa.listLatest(maxRows);
    }

    public List<HitEntity> getData() {
        if (data == null) reload();
        return data;
    }
}
