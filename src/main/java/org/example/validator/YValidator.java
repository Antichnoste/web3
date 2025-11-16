package org.example.validator;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

public class YValidator implements Validator {

    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        if (value == null) return;
        double y;
        try {
            y = Double.parseDouble(value.toString().replace(',', '.'));
        } catch (Exception e) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "Неверный формат числа", null));
        }
        if (y < -5.0 || y > 5.0) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR, "Y должен быть в диапазоне [-5; 5]", null));
        }
    }
}
