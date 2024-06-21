const textoEncriptar = document.getElementById("texto");
const error = document.getElementById("error-encriptar");
const initialResultado = document.getElementById("initial");
const resultado = document.getElementById("resultado");
const textoResultado = document.getElementById("texto-encriptado");
const copiadoExitoso = document.getElementById("exitoso");

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

  // encriptar con api de window de base64
  const textoEncriptado = window.btoa(texto);
  mostrarResultado(textoEncriptado);
};

const desencriptar = () => {
  const texto = textoEncriptar.value;
  if (evaluarTexto(texto)) return;

  // desencriptar con api de window de base64
  const textoDesencriptado = window.atob(texto);
  mostrarResultado(textoDesencriptado);
};

const copiar = () => {
  const copiadoExitoso = document.getElementById("exitoso");
  navigator.clipboard.writeText(textoResultado.innerHTML);
  copiadoExitoso.innerHTML = "Texto copiado al portapapeles!";
}