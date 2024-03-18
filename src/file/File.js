const saveTextFile = (content, [customerID, date]) => {
    console.log(content)
    console.log(customerID)
    console.log(date)
    const fileName = `${customerID}.${date}.txt`; // Agregar la extensión .txt

    const a = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
};

export default saveTextFile;
