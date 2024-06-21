const textoEncriptar = document.getElementById("texto");
const error = document.getElementById("error-encriptar");
const initialResultado = document.getElementById("initial");
const resultado = document.getElementById("resultado");
const textoResultado = document.getElementById("texto-encriptado");
const copiadoExitoso = document.getElementById("exitoso");

const llavesEncriptacion = [
  ["a", "ai"],
  ["e","enter"],
  ["i","imes"],
  ["o", "ober"],
  ["u", "ufat"]
]

const evaluarTexto = (texto, type = "") => {
  limpiar();
  const regex = /([A-Z]|[à-ü]|[À-Ü])/;
  if (texto === "") {
    error.innerHTML = "Por favor, ingrese un texto para encriptar.";
    return true;
  } else if (regex.test(texto) && type === "encriptar") {
    error.innerHTML = "Por favor, ingrese un texto sin mayúsculas o tildes.";
    return true;
  }
  return false;
};

const limpiar = () => {
  textoEncriptar.value = "";
  error.innerHTML = "";
  copiadoExitoso.innerHTML = "";
  initialResultado.classList.remove("desactivado");
  resultado.classList.add("desactivado");
}

const mostrarResultado = (texto) => {
  initialResultado.classList.add("desactivado");
  resultado.classList.remove("desactivado");
  textoResultado.innerHTML = texto;
  textoEncriptar.value = "";
}

const encriptar = () => {
  const texto = textoEncriptar.value;
  if (evaluarTexto(texto, "encriptar")) return;
  let textoEncriptado = texto.split('').map(letra => {
    // Buscar la llave que coincida con la letra
    let llave = llavesEncriptacion.find(llave => letra === llave[0]);
    // Si la llave no existe, retornar la letra original
    return llave ? llave[1] : letra;
  }).join('');
  mostrarResultado(textoEncriptado);
};

const desencriptar = () => {
  const texto = textoEncriptar.value;
  if (evaluarTexto(texto)) return;

  // Iterar sobre las llaves de encriptación
  let textoDesencriptado = texto;
  for (let llave of llavesEncriptacion) {
    let [letra, encriptado] = llave;
    let regex = new RegExp(encriptado, 'g'); //regex para encontrar todas las ocurrencias de la llave
    textoDesencriptado = textoDesencriptado.replace(regex, letra); // Reemplazar todas las ocurrencias de la llave por la letra
  }
  
  mostrarResultado(textoDesencriptado);
};

const copiar = () => {
  const copiadoExitoso = document.getElementById("exitoso");
  navigator.clipboard.writeText(textoResultado.innerHTML);
  copiadoExitoso.innerHTML = "Texto copiado al portapapeles!";
}