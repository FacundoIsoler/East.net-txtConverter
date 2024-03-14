const fs = require('fs');
const path = require('path');

/* Convertimos un fichero CSV al formato JSON. Los pasos son:
1) Leer el contenido del fichero.
2) Partir el texto en líneas (split por los "\n").
3) Separar la primera línea (la cabecera, con nombres de columna), del resto.
4) Obtener los nombres de los campos (split por la coma).
5) Crear una lista de objetos vacía.
6) Hacer un bucle por las líneas donde:
   a) Creamos un objeto vacío;
   b) Partimos los datos (split por ",");
   c) Asignamos el valor de cada campo accediendo con [] al objeto;
   d) Añadimos el objeto a la lista resultado.
7) Convertimos la lista a JSON (con JSON.stringify).
8) Producimos el nombre del fichero de salida (reemplazamos ".csv" por ".json").
9) Grabamos el fichero de salida. */

if (process.argv[2] === undefined) {
    console.log(`Usage: node Tango_facturas.js <file.csv>`);
    process.exit(1);
}

const fileName = path.join(__dirname, process.argv[2]);

try {
    const fileText = fs.readFileSync(fileName, 'utf8');
    const allLines = fileText.split('\n');

    const header = allLines[0];
    const dataLines = allLines.slice(1);

    const fieldNames = header.split('|');

    let objList = [];
    for (let i = 0; i < dataLines.length; i++) {
        const data = dataLines[i].split('|');
        if (data.length !== fieldNames.length) {
            console.log(`Error: La línea ${i + 2} no tiene el número correcto de campos.`);
            continue;
        }
        let obj = {};
        for (let j = 0; j < fieldNames.length; j++) {
            let fieldValue = data[j].trim(); // Eliminar espacios en blanco alrededor del valor
            const fieldName = fieldNames[j].trim().toLowerCase();

            // Solo guardar los campos específicos
            if (fieldName === 'id_gva46' || fieldName === 'fecha_vto' || fieldName === 'importe_vt' ||
                fieldName === 'n_comp' || fieldName === 't_comp' || fieldName === 'alternativa_1' ||
                fieldName === 'importe_total_1' || fieldName === 'alternativa_2' || fieldName === 'importe_total_2') {
                // Convertir a número si es 'id_gva46' o 'importe_vt'
                if (fieldName === 'id_gva46' || fieldName === 'importe_vt') {
                    // Dividir el número en el segundo carácter después de la coma
                    fieldValue = fieldValue.split(',')[0]; // Obtener la parte antes de la coma
                    fieldValue = parseFloat(fieldValue); // Convertir a número
                }
                obj[fieldName] = fieldValue;
            }
        }
        objList.push(obj);
    }

    const json = JSON.stringify(objList, null, 4);
    const outputFileName = path.join(__dirname, 'Tango_facturas.json'); // Nombre fijo del archivo JSON
    fs.writeFileSync(outputFileName, json);
    console.log(`JSON generado correctamente: ${outputFileName}`);
} catch (error) {
    console.error('Error durante el procesamiento del archivo:', error);
}
