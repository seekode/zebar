const clock = document.getElementById("clock");
const days_fr = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const months_fr = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export default () => {
  const date = new Date();
  const day = days_fr[date.getDay()];
  const month = months_fr[date.getMonth()];

  clock.innerText = `${day} ${date.getDate()} ${month} ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};
