function initDownload(){
    const downloadPara = document.createElement("p");
    const downloadParaText = document.createTextNode("Download initiated");
    downloadPara.appendChild(downloadParaText);

    const displayField = document.getElementById('displayField');
    displayField.appendChild(downloadPara);
}

function initVisualization(){
    // document.getElementById("displayField").style.display = "none"
    document.getElementById("3D canvas").style.display = "block"

    const visPara = document.createElement("p");
    const visParaText = document.createTextNode("Visualization initiated");
    visPara.appendChild(visParaText);

    const displayField = document.getElementById('displayField');
    displayField.appendChild(visPara);
}

function awaitPacket(){
    
}

