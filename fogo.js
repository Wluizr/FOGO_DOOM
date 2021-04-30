const fogoPixelsArray =[];
const fogoLargura = 40;
const fogoAltura = 40;
const paletaDeCores = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function start(){
    criaEstruturaDoFogo()
    //console.log(fogoPixelsArray);
    criaFonteDeFogo();
    renderizaFogo();

    setInterval(calculaPropagacaoFogo, 50);
}


function criaEstruturaDoFogo(){
    const numPixels = fogoLargura * fogoAltura;

    for(let i = 0; i < numPixels; i++){
        fogoPixelsArray[i] = 0
    }
}


function calculaPropagacaoFogo(){
    
    for(let col =0 ; col < fogoLargura; col++ ){
        for(let row = 0; row < fogoAltura; row++){
            const pixelIndice = col + (fogoLargura * row)
            //console.log(`formula: ${col}+ (${fogoLargura} * ${row})`);
            //console.log(pixelIndice);
            atualizaIntensidadeFogoPorPixel(pixelIndice);
        }

    }

    renderizaFogo();
}


function atualizaIntensidadeFogoPorPixel(indicePixelAtual){
    const indicePixelDeBaixo = indicePixelAtual + fogoLargura;
        
    //console.log(indicePixelDeBaixo+` = indicePixel autal: ${indicePixelAtual} + fogoLargura: ${fogoLargura}`);

    //Não permite que atualize a ultima linha.
    if(indicePixelDeBaixo >= (fogoLargura * fogoAltura) ){
        return; 
    }

    // Desconta a intensidade do Fogo
    const descontoIntensidade = Math.floor(Math.random() * 3);
    const fogoIntensidadeAbaixo = fogoPixelsArray[indicePixelDeBaixo];
    const novaIntensidadeFogo = 
    fogoIntensidadeAbaixo - descontoIntensidade >= 0 ? (fogoIntensidadeAbaixo - descontoIntensidade) : 0;

    //Atribui o novo valor da intensidade
    // Quando se subtrai, o valor da aquele aspecto de Vento ao Fogo.
    fogoPixelsArray[indicePixelAtual - descontoIntensidade] = novaIntensidadeFogo;
    
}


function renderizaFogo(){
    debug = false;

    let html = ` <table>`;
    for(let row = 0; row < fogoAltura; row++){
        html += `<tr>`;
        for(let col =0; col < fogoLargura; col++){
            const pixelIndice = col + (fogoLargura * row);
            const fogoIntensidade = fogoPixelsArray[pixelIndice];

            if(debug === true){
            html += `<td>
                        <div class='pixel-index'>
                        ${pixelIndice}
                        </div>
                        ${fogoIntensidade}
                    </td>`;
            }else{
                const cor = paletaDeCores[fogoIntensidade];
                const corString = `${cor.r}, ${cor.g}, ${cor.b}`;

                html += `
                        <td class="pixel" style="background-color: rgb(${corString}"></td>
                        `;
            }
        }

        html += `</tr>`;

    }

    html += `</table>`;

    document.querySelector("#canvasFogo").innerHTML = html;
}

function criaFonteDeFogo(){
    for(let col = 0; col <= fogoLargura; col++){
        const indiceTransbordaPixel = fogoLargura * fogoAltura;
        const pixelIndice = (indiceTransbordaPixel - fogoLargura) + col;

        fogoPixelsArray[pixelIndice] = 36;
    }
}

function apagaFogo() {
    for (let column = 0; column <= fogoLargura; column++) {
      const sobrescreveIndicePixel = fogoLargura * fogoAltura
      const indicePixel = (sobrescreveIndicePixel - fogoLargura) + column
  
      fogoPixelsArray[indicePixel] = 0
    }
}

start();