export const createRow = (data, suppliers) => {
    const tableBody = document.getElementById("table-body");

    const row = document.createElement("tr");

    // Fornitore
    const supplierCell = document.createElement("td");
    const supplierSelect = document.createElement("select");
    suppliers.forEach((supplier) => {
        const option = document.createElement("option");
        option.value = supplier;
        option.textContent = supplier;
        supplierSelect.appendChild(option);
    });
    supplierCell.appendChild(supplierSelect);
    row.appendChild(supplierCell);

    // Quantità
    const qtyCell = document.createElement("td");
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.placeholder = "Quantità";
    qtyInput.addEventListener("input", () => handleQuantityInput(row, data, suppliers));
    qtyCell.appendChild(qtyInput);
    row.appendChild(qtyCell);

    // Codice
    const codeCell = document.createElement("td");
    const codeInput = document.createElement("input");
    codeInput.type = "text";
    codeInput.placeholder = "Codice";
    codeInput.addEventListener("input", () => updateDescription(row, data));
    codeCell.appendChild(codeInput);
    row.appendChild(codeCell);

    // Descrizione
    const descCell = document.createElement("td");
    const descSpan = document.createElement("span");
    descSpan.textContent = "Inserisci un codice";
    descCell.appendChild(descSpan);
    row.appendChild(descCell);

    tableBody.appendChild(row);
};

export const updateDescription = (row, data) => {
    const codeInput = row.querySelector("input[type='text']").value.trim();
    const descSpan = row.querySelector("span");

    if (data[codeInput]) {
        descSpan.textContent = data[codeInput];
    } else {
        descSpan.textContent = "Codice non valido";
    }
};

const handleQuantityInput = (row, data, suppliers) => {
    const qtyInput = row.querySelector("input[type='number']").value;
    const tableBody = document.getElementById("table-body");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    if (qtyInput > 0 && rows.indexOf(row) === rows.length - 1) {
        createRow(data, suppliers);
    }
};
