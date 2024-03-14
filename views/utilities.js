
function initClone(){
    document.getElementById('downloadBtn').disabled = false;
    document.getElementById('visualizationBtn').disabled = false;
}

function initDownload(){
    const downloadPara = document.createElement("p");
    const downloadParaText = document.createTextNode("Download initiated");
    downloadPara.appendChild(downloadParaText);

    const displayField = document.getElementById('displayField');
    displayField.appendChild(downloadPara);
}

function initVisualization(){
    const visPara = document.createElement("p");
    const visParaText = document.createTextNode("Visualization initiated");
    visPara.appendChild(visParaText);

    const displayField = document.getElementById('displayField');
    displayField.appendChild(visPara);
}

function awaitPacket(){
    
}
