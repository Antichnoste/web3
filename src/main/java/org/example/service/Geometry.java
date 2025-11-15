package org.example.service;

public final class Geometry {

    private Geometry() {}

    public static boolean hit(double x, double y, double r) {
        if (!(r > 0)) return false;

        boolean tri = (x >= 0.0) && (y >= 0.0)
                && (x <= r / 2.0)
                && (y <= (-2.0 * x + r));

        double rr = r / 2.0;
        boolean sec = (x <= 0.0) && (y >= 0.0)
                && (x * x + y * y <= rr * rr + 1e-12);

        boolean rect = (x >= 0.0) && (y <= 0.0)
                && (x <= r)
                && (y >= -r / 2.0);

        return tri || sec || rect;
    }
}
