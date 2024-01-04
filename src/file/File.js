const saveTextFile = (content, [customerID, date]) => {
    const formattedDate = date.replace(/-/g, ''); // Eliminar guiones de la fecha
    const fileName = `${customerID}.${formattedDate}.txt`; // Agregar la extensión .txt

    const a = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
};

export default saveTextFile;
