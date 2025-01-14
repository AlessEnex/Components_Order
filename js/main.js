import { createRow } from "./table.js";
import { exportToCSV } from "./csv.js";
import { openOutlookWithEmail } from "./email.js";

const JSON_URL = "../data.json";
const SUPPLIERS_URL = "../suppliers.json";

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Errore nel caricamento del file: ${url}`);
    }
    return await response.json();
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await fetchData(JSON_URL);
        const suppliers = await fetchData(SUPPLIERS_URL);

        // Crea la prima riga vuota
        createRow(data, suppliers);

        // Eventi per i pulsanti
        document.getElementById("generaCSV").addEventListener("click", exportToCSV);
        document.getElementById("generaEmail").addEventListener("click", openOutlookWithEmail);
    } catch (error) {
        console.error(error);
        alert("Errore nel caricamento dei dati.");
    }
});
