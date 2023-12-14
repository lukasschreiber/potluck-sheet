import {Table} from "../api/types.ts";

const DELIMITER = ","

export function downloadCSVExport(table: Table) {
    const header: string = "Name,Value";
    const body: string = table.entries.map(entry => {
        return [escapeValue(entry.user.name), escapeValue(entry.value)].join(DELIMITER)
    }).join("\n");

    const content = [header, body].join("\n")

    downloadFile(`${table.name}.csv`, content, "data:text/csv")
}

function escapeValue(string: string) {
    const escapeSequences = ["\n", DELIMITER, "\""]
    if(escapeSequences.some(s => string.includes(s))) {
        string = `"${string.replace("\"", "\"\"")}"`
    }

    return string
}

function downloadFile(name: string, text: string, type: string) {
    const elem = document.createElement("a");
    elem.setAttribute("href", `${type};charset=utf-8,${encodeURIComponent(text)}`);
    elem.setAttribute("download", name);
    elem.style.display = "none";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
