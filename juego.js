let galletas=0
let galletasBonus=0
let galletasXSeg=0;
let galletasXClick=1;
let nombresProductos=['Cursor','Hucha','Puesto de limonada','puestito','Panaderia','',"","","","","","","","",""]
let invetario=[0,0,0,0,0,0]
let galletasProduce=[1,2,4,10,15,50]
let precioProducto=[100,200,400,1000,1500,5000]
function convertirGalletas(galletas){
    if(galletas<1000){
        return galletas
    }
    if(galletas>=1000&& galletas<1000000){
        return galletas/1000+ " K"
    }
    if(galletas>=1000000&&galletas<1000000000){
        return trunc((galletas/1000000), 3)+ " M"
    }
    if(galletas>=1000000000&&galletas<1000000000000){
        return trunc((galletas/1000000000), 3)+ " B"
    }
    if(galletas>=1000000000000&&galletas<1000000000000000){
        return trunc((galletas/1000000000000), 3)+ " T"
    }
    if(galletas>=1000000000000000&&galletas<1000000000000000000){
        return trunc((galletas/1000000000000000), 3)+ " C"
    }
    if(galletas>=1000000000000000000&&galletas<1000000000000000000000){
        return trunc((galletas/1000000000000000000), 3)+ " aa"
    }
    if(galletas>=1000000000000000000000&&galletas<10000000000000000000000000){
        return trunc((galletas/1000000000000000000000), 3)+ " ab"
    }
    if(galletas>=10000000000000000000000&&galletas<=1000000000000000000000000){
        return trunc((galletas/1000000000000000000000000), 3)+ " ac"
    }
    if(galletas>=1000000000000000000000000000&&galletas<1000000000000000000000000000000){
        return trunc((galletas/1000000000000000000000000000), 3)+ " ad"
    }
    if(galletas>=1000000000000000000000000000000&&galletas<1000000000000000000000000000000000){
        return trunc((galletas/1000000000000000000000000000000), 3)+ " ae"
    }
}
function trunc (x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return numStr
}
function truncINT (x, posiciones = 0) {
    var s = x.toString()
    var numStr = s.substr(0, posiciones)
    return numStr
}
function render(objeto){
    document.getElementById("galletas").innerHTML=`$ ${convertirGalletas(galletas)}`
    document.getElementById("galletasXSeg").innerHTML=`${galletasXSeg} $/Seg`
    document.getElementById("galletasXClick").innerHTML=`${galletasXClick} $/Click`
    
}
function renderObjetos(objeto){
    if(objeto===0){
        document.getElementById(`button${nombresProductos[objeto]}`).innerHTML=`$/Click `
        document.getElementById(`button${nombresProductos[objeto]}Produce`).innerHTML=`${galletasProduce[objeto]} $/Click`
    }
    else{
        document.getElementById(`button${nombresProductos[objeto]}`).innerHTML=nombresProductos[objeto]
        document.getElementById(`button${nombresProductos[objeto]}Produce`).innerHTML=`${galletasProduce[objeto]} $/Seg`

    }
    document.getElementById(`button${nombresProductos[objeto]}Price`).innerHTML=`$${convertirGalletas(precioProducto[objeto])}`
    document.getElementById(`button${nombresProductos[objeto]}Cantidad`).innerHTML=invetario[objeto]
    if(galletas<precioProducto[objeto]){
        const button = document.getElementById(`button${nombresProductos[objeto]}`).parentNode
        button.style.background="#ff000090"
    }
    else{
        const button = document.getElementById(`button${nombresProductos[objeto]}`).parentNode
        button.style.background="transparent"
    }
}

function crearObjeto(objeto){
        return `<a onclick="comprar(${objeto})" >
                <div class="nombreYPrecioObjetos">
                <p id="button${nombresProductos[objeto]}">
                </p>
                <p id="button${nombresProductos[objeto]}Price">
                <p id="button${nombresProductos[objeto]}Produce">
                </p>
                </div>
                <div class="cantidadObjetos">
                <p id="button${nombresProductos[objeto]}Cantidad"></p>
                </div>
                </a>`
}
function click(){
    galletas+=galletasXClick
    galletasBonus++
    actualizarBarraBonus()
    if(galletasBonus===200){
        galletasBonus=0
        entregarBonus()
    }
}
function actualizarBarraBonus(){
    document.getElementById("barraBonus").style.width=`${galletasBonus/2}%`
}
function entregarBonus(){
    let bonus = Math.trunc(Math.random()*4)
    switch (bonus) {
        case 0:
            mostrarModal("Bonus!","Suerte! 10% de su billetera")
            galletas+=Math.trunc((galletas*10)/100)
            break;
        case 1:
            mostrarModal("Bonus!","Gano la loteria! 20% de su billetera")
            galletas+=Math.trunc((galletas*20)/100)
            break;
        case 2:
            mostrarModal("Bonus!","Produccion equivalente a 1 minuto!")
            galletas+=Math.trunc(galletasXSeg*60)
            break;
        case 3:
            mostrarModal("Bonus!","Produccion equivalente a 5 minutos!")
            galletas+=Math.trunc((galletasXSeg*60)*5)
            break;
        default:
            break;
    }
}
function aumentarPrecio(objeto){
    if(objeto===0){
        precioProducto[objeto]=Math.round(precioProducto[objeto]*1.395)
    }
    else{
        precioProducto[objeto]=Math.round(precioProducto[objeto]*1.05)
    }
}
function comprar(objeto){
    if(precioProducto[objeto]<=galletas){
        galletas-=precioProducto[objeto]
        invetario[objeto]++
        if(objeto===0){
            galletasXClick++
        }
        else{
            galletasXSeg+=galletasProduce[objeto]
        }
        aumentarPrecio(objeto)
    }
    else{
        mostrarModal("alerta!","No tienes suficiente dinero")
    }
}
function producirGalletas(){
    for(var productos =1;productos<invetario.length;productos++){
        galletas+=galletasProduce[productos] *invetario[productos]
    }
}
function mostrarMenu(){
document.getElementById("menuIcon").style.display="none"
document.getElementById("menuIconSalir").style.display="flex"
document.getElementById('menuIconSalir').style.animationName="animacionMenuBoton"
document.getElementById('menuIconSalir').style.animationDuration="1s"
document.getElementById('buttons').style.display="block"
document.getElementById('buttons').style.animationName="animacionMenu"
document.getElementById('buttons').style.animationDuration="1s"

}
function ocultarMenu(){
    document.getElementById('menuIconSalir').style.animationName="animacionMenuBotonReverse"
    document.getElementById('menuIconSalir').style.animationFillMode="both"
    document.getElementById('menuIconSalir').style.animationDuration="1s"
    document.getElementById('buttons').style.animationName="animacionMenuReverse"
    document.getElementById('buttons').style.animationFillMode="both"
    document.getElementById('buttons').style.animationDuration="1s"
    setTimeout(() => {
        document.getElementById("menuIcon").style.display="flex"
        document.getElementById("menuIconSalir").style.display="none"
        document.getElementById('buttons').style.display="none"
    }, 1000);
}
function mostrarModal(titulo,mensaje){
    document.getElementById("tituloModal").innerHTML=titulo
    document.getElementById("mensaje Modal").innerHTML=mensaje
    document.getElementById("fondoModal").style.display="flex"
    document.getElementById("modal").style.animationName="modalIn"
    document.getElementById("modal").style.animationDuration=".5s"
    document.getElementById("modal").style.animationFillMode="both"

}
function ocultarModal(){
    document.getElementById("modal").style.animationName="modalOut"
    document.getElementById("modal").style.animationDuration=".5s"
    document.getElementById("modal").style.animationFillMode="both"
    setTimeout(() => {
    document.getElementById("fondoModal").style.display="none"        
    }, 400);
}
for(let objeto = 0;objeto < nombresProductos.length;objeto++){
    let htmlString =crearObjeto(objeto)
    let html = document.implementation.createHTMLDocument()
    html.body.innerHTML=htmlString
    console.log(html)
    document.getElementById('buttons').append(html.body.children[0])
}
document.getElementById("coockieImg").addEventListener("click",click)
document.getElementById("botonMenu").addEventListener("click",mostrarMenu)
document.getElementById("botonMenuSalir").addEventListener("click",ocultarMenu)

let FPS=30
setInterval(() => {
    for (let index = 0; index < nombresProductos.length; index++) {
    renderObjetos(index)
    }
    render()
    actualizarBarraBonus()
}, 1000/FPS);
let FPSProduce =1
setInterval(() => {
    producirGalletas()
}, 1000/FPSProduce);