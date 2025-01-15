// Aggiorna la descrizione in base al codice inserito
export const updateDescription = (row, data) => {
    const codeInput = row.querySelector("input[type='text']").value.trim();
    const descInput = row.querySelector("input[type='text'] + input");

    if (data[codeInput]) {
        descInput.value = data[codeInput];
    } else {
        descInput.value = "Codice non valido";
    }
};

// Funzione per creare una nuova riga
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
    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Descrizione";
    descInput.addEventListener("input", () => filterSuggestions(descInput, data, codeInput));
    descCell.appendChild(descInput);

    const suggestionBox = document.createElement("ul");
    suggestionBox.className = "suggestion-box";
    descCell.appendChild(suggestionBox);

    row.appendChild(descCell);

    tableBody.appendChild(row);
};
