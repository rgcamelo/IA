class Neurona{

  constructor(entradas,pesos,umbral){
    this.entradas=entradas;
    this.pesos=pesos;
    this.umbral=umbral;
  }

  funcionSoma(){

    var pesos=this.pesos
    var umbral=this.umbral
    var entradas=this.entradas
    var salida=0

    for(var i=0;i<pesos.length;i++){

      salida=salida+(entradas[i]*pesos[i])

    }

    return salida-1

  }

  funcionActivacion(x){
    if (x>0){
      return 1
    }
    else if (x<=0){
      return 0
    }
  }

}

document.getElementById("simular").disable;
//evento para leer el archivo
document.getElementById('file-input')
  .addEventListener('change', Archivo, false);

  document.getElementById('file-input')
  .addEventListener('change', Archivo, false);
  
function Archivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    lector= new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      console.log("va a mostrar contenido");
      mostrarContenido(contenido);
    };
    console.log("se cierra");
    lector.readAsText(archivo);
}

var patrones=[]
var salidaDes=[]
//Obtencion de entradas,pesos y patrones
function mostrarContenido(contenido) {

  $('#exampleModalCenter').modal('show')
  remplazar=/\n/g,
  r=contenido.replace(remplazar," ")
  console.log(r);
  vector=r.split(" ")
  console.log(vector)
  numPatrones=vector.length-2
  eys=vector[0]
  var entradas=0
  var salidas=0
  listaCadena=[]
  cadenaSalidas=[]

  for(var i = 1;i <= numPatrones;i++){
    ent=vector[i].split(";;")
    listaCadena.push(ent[0])
    cadenaSalidas.push(ent[1])
  }
  //patrones
  newcadena=[]
  for(var i = 0;i<listaCadena.length;i++){
    cadena=listaCadena[i]
    newcadena=cadena.split(";")
    patrones.push(newcadena)
  }

  for(var i = 0;i<patrones.length;i++){
    for(var j=0;j<patrones[i].length;j++){
      patrones[i][j]=parseInt(patrones[i][j],10)
    }
  }
  //salidas deseadas
  newcadenaS=[]
  for(var i = 0;i<cadenaSalidas.length;i++){
    cadenaS=cadenaSalidas[i]
    newcadenaS=cadenaS.split(";")
    salidaDes.push(newcadenaS)
  }

  for(var i = 0;i<salidaDes.length;i++){
    for(var j=0;j<salidaDes[i].length;j++){
      salidaDes[i][j]=parseInt(salidaDes[i][j],10)
    }
  }
  
  console.log(patrones)

  for(var i=0;i<eys.length;i++){
    if(eys.charAt(i)=="x"){
      entradas=entradas+1
    }else if(eys.charAt(i)=="y"){
      salidas=salidas+1
    }
  }

  document.getElementById("entradas").innerHTML="El numero de entradas es: " + entradas 
  document.getElementById("numEntradas").innerHTML=entradas
  document.getElementById("salidas").innerHTML="El numero de salidas es: " + salidas
  document.getElementById("numSalidas").innerHTML=salidas
  document.getElementById("patrones").innerHTML="El numero de patrones es: " + numPatrones
  document.getElementById("numPatrones").innerHTML=numPatrones

}


var pesosN;
function numeroAleatorioDecimales(min, max) {
  var num = Math.random() * (max - min);
  return num + min;
}


//Iniciar entrenamiento
document.getElementById("btnIniciar")
  .addEventListener("click",function(){
    numIteracion = document.getElementById('num').value
      var t=1;
      var inter;
      console.log("Inicia el entrenamiento")
      var numNeuronas = document.getElementById('numNeuronas').value
      console.log("Pesos")
     
      var pesos = []
           
      console.log(pesos)

      console.log(umbrales)

      console.log("patrones")

      console.log(patrones)

      console.log("salidas deseadas")
      console.log(salidaDes);
      var pesosA=pesos;
      var umbralesA=umbrales;
      var error = 999
      var dataError=[]
      inter = setInterval(function(){
        if(t <= numIteracion && errorDes<error){
          var errorPatron=[]
          for(var i=0;i<patrones.length;i++){
            console.log("patron: " ,i)
            var salidaRed=[]
            
            for(var j = 0;j<salidas;j++){
              if(i>0 ||t>1){
                console.log("entrenamiento nuevos pesos")
                console.log(pesosN)
                console.log("esto es lo que se manda")
                console.log(patrones[i],pesosN[j],0.5)
                neurona=new Neurona(patrones[i],pesosN[j],0.5)
              }else{
                console.log("primeros pesos")
                console.log(pesosA)
                neurona=new Neurona(patrones[i],pesos[j],0.5)
                console.log("esto es lo que se manda 1")
                console.log(patrones[i],pesos[j],0.5)
              }
              salida=neurona.funcionSoma()
              salidaRed.push(neurona.funcionActivacion(salida))
            }


            console.log("salida de la red")
            console.log(salidaRed)
            var erroresLineal=[]
            console.log("salida deseada")
            console.log(salidaDes)
            var sumaLineal=0
            for (var k = 0; k < salidaRed.length; k++) {
              eLineal = salidaDes[i][k]-salidaRed[k]
              erroresLineal.push(eLineal)
              sumaLineal=sumaLineal+Math.abs(eLineal)
            }
            console.log("errores lineales")
            console.log(erroresLineal)
            console.log("error patron")
            var ePatron = sumaLineal/salidas
            if(ePatron<0){
              ePatron=ePatron*-1
            }
            console.log(ePatron)
            errorPatron.push(ePatron)
            console.log("actualizo pesos")
            console.log("pesos antiguos")
            console.log(pesosA)
            pesosN=[]
            entradasX=patrones[i]
            for(var l=0;l<pesos.length;l++){
              var lista=[]
              for(var p=0;p<2;p++){
              
                lista[p] = pesosA[l][p]+(rata*erroresLineal[l]*entradasX[p])
                //console.log(pesos[l][p]+"+"+rata+"*"+erroresLineal[l]+"*"+entradasX[p])
                //console.log(lista[p])
              }
              pesosN[l]=lista
            }
            console.log("pesos nuevos")
            console.log(pesosN)
            pesosA=pesosN
           
            umbralesN=[]
            for(var s=0;s<salidas;s++){
              umbralesN[s]=umbralesA[s]+(rata*erroresLineal[s])
            }
            umbralesA=umbralesN
          }
          console.log("Error patrones")
          console.log(errorPatron)
          console.log("Error iteracion")
          var sumaError=0
          for(var y=0;y<errorPatron.length;y++){
            sumaError=sumaError+errorPatron[y]
          }
          error=sumaError/patrones.length
          console.log(error)
          document.getElementById("iteracion").innerHTML=t++;
          document.getElementById("errorIteracion").innerHTML=error
          dataError.push(error)
          data={}
          num=t-1
          console.log(num)
          data = {year:num.toString(),value:error}
          dataError[0]={year:'0',value:1}
          dataError[num]=data
          console.log(dataError)
          graficaError.setData(dataError)
        }else if(errorDes>=error){
          clearInterval(inter);
          $('#modalEntrenamiento').modal('show')
          $('#simular').enable
          document.getElementById("simular").className = "btn btn-success";
         
          
        }else{
          clearInterval(inter);
          alert("El entrenamiento finalizo pero no logro completarse")

        }


      },800,"JavaScript");

    
    var elem = document.getElementById('descargar')
    elem.addEventListener("click",function(){
    
    var contenidoDeArchivo=pesosN[0][0].toString()+";"+
    pesosN[0][1].toString()+";"+"\n"+
    pesosN[1][0].toString()+";"+
    pesosN[1][1].toString()+";"

    console.log("Archivo")
    console.log(contenidoDeArchivo)
    elem.download = "pesos.csv";
    elem.href = "data:application/octet-stream," 
                   + encodeURIComponent(contenidoDeArchivo);



    })



  document.getElementById("simular").addEventListener("click",function(){
   
    var simulacion=[]
    for(var i=0;i<entradas;i++){
      c=i+1
      ide="e"+c.toString()
      entrada=document.getElementById(ide).value
      simulacion.push(entrada)

    }
    console.log("SIMULACION")
    console.log(simulacion)
    salidaRed=[]
    for(var j = 0;j<salidas;j++){
        console.log("entrenamiento simulacion")
        console.log(pesosN)
        console.log("esto es lo que se manda")
        console.log(simulacion,pesosN[j],0.5)
        neurona=new Neurona(simulacion,pesosN[j],0.5)
        salida=neurona.funcionSoma()
        salidaRed.push(neurona.funcionActivacion(salida))
      }

      console.log("salida de la red")
      console.log(salidaRed)
      console.log("salida deseada")
      console.log(salidaDes)
      document.getElementById("s1").innerHTML=salidaRed[0]
      document.getElementById("s2").innerHTML=salidaRed[1]
      document.getElementById("s3").innerHTML=salidaRed[2]
      document.getElementById("s4").innerHTML=salidaRed[3]



  })

    
    

    
})


