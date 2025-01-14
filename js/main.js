import { createRow } from "./table.js";
import { exportToCSV } from "./csv.js";
import { openOutlookWithEmail } from "./email.js";

const JSON_URL = "../data.json";
const SUPPLIERS_URL = "../suppliers.json";

const fetchData = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(JSON_URL);
    const suppliers = await fetchData(SUPPLIERS_URL);

    createRow(data, suppliers);

    document.getElementById("generaCSV").addEventListener("click", exportToCSV);
    document.getElementById("generaEmail").addEventListener("click", openOutlookWithEmail);
});
