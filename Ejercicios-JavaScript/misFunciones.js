/**
 * Descripción
 * @method Nombre de la función
 * @param Parámetro A
 * @param Parámetro B
 * @return Valor que retorna
 */

function cambiarUnidades(id, valor) {
    if (isNaN(valor)) {
            alert("Se ingreso un valor inválido"+id);
            document.lasUnidades.unid_metro.value = "";
            document.lasUnidades.unid_pulgada.value = "";
            document.lasUnidades.unid_pie.value = "";
            document.lasUnidades.unid_yarda.value = "";
    } else if (id == "metro") {
        document.lasUnidades.unid_pulgada.value = 39.3701 * valor;
        document.lasUnidades.unid_pie.value = 3.28084 * valor;
        document.lasUnidades.unid_yarda.value = 1.09361 * valor;
    } else if (id == "pulgada") {
        document.lasUnidades.unid_metro.value = 0.0254 * valor;
        document.lasUnidades.unid_pie.value = 0.0833333 * valor;
        document.lasUnidades.unid_yarda.value = 0.0277777666667 * valor;
    } else if (id == "pie") {
        document.lasUnidades.unid_metro.value = 0.3048 * valor;
        document.lasUnidades.unid_pulgada.value = 12 * valor;
        document.lasUnidades.unid_yarda.value = 0.333333 * valor;
    } else if (id == "yarda") {
        document.lasUnidades.unid_metro.value = 0.9144 * valor;
        document.lasUnidades.unid_pulgada.value = 36 * valor;
        document.lasUnidades.unid_pie.value = 3 * valor;
    }
}