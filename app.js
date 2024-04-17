const btn_pourcent = document.querySelector(".pourcent");
const btn_divide = document.querySelector(".divide");
const btn_mult = document.querySelector(".mult");
const btn_minus = document.querySelector(".minus");
const btn_plus = document.querySelector(".plus");

const del = document.querySelector(".del");
const ac = document.querySelector(".ac");

const numbers = document.querySelectorAll(".numbers");
const input = document.getElementById("op");
const errorMessage = document.getElementById("error-message");
const btn_egal = document.querySelector(".fa-equals");
const ope = document.getElementById("op");
const res = document.getElementById("result");

let result = 0;

//Animation égal et blocage de tout sauf effacer et refaire un calcul
function equals() {
  ope.classList.add("little-op");
  ope.classList.remove("big-op");
  res.classList.add("big-res");
  res.classList.remove("little-res");
  const audio = new Audio("Assets/sounds/espace machine à écrire.mp3");
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 1000);
  input.disabled = true;
  del.disabled = true;
  numbers.forEach((number) => {
    number.disabled = true;
  });
}

//Erreur mauvaise entrée
function badEntry() {
  if (!/^[0-9\.\+\-\*\/\%]+$/.test(input.value)) {
    errorMessage.style.display = "inline";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2000);
  } else {
    errorMessage.style.display = "none";
  }
}

//Entrée à partir du clavier écran
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    input.value += number.value;
    const audio = new Audio("Assets/sounds/touche machine à écrire.mp3");
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 1000);
  });
});

//Effacer tous les caractères, avec AC
function delAll() {
  input.value = "";
  res.textContent = "";
  ope.classList.add("big-op");
  ope.classList.remove("little-op");
  res.classList.add("little-res");
  res.classList.remove("big-res");
  input.disabled = false;
  del.disabled = false;
  numbers.forEach((number) => {
    number.disabled = false;
  });
}

//Effacer le dernier caractère entré
function delLast() {
  let inputValue = input.value;
  if (inputValue.length > 0) {
    let newValue = inputValue.slice(0, -1);
    input.value = newValue;
  }
}

//Calcul
try {
  function calcul() {
    let valueInput = input.value;
    result = eval(valueInput);
    console.log(result);
    res.textContent = result;
    console.log("Succès !");
  }
} catch (error) {
  res.textContent = "Le calcul a échoué";
  console.error("Le calcul a échoué");
}

btn_egal.addEventListener("click", () => {
  equals();
  calcul();
});
input.addEventListener("input", badEntry);
ac.addEventListener("click", delAll);
del.addEventListener("click", delLast);
