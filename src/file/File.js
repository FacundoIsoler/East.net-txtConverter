const saveTextFile = (content, name) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
}



export default saveTextFile;