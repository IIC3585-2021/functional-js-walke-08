const addPlayer = document.getElementById('add');
const startGame = document.getElementById('start');
const form = addPlayer.parentElement
let players = 1;

const createInput = n => {
  const div = document.createElement('div');
  div.classList.add('player','mb-2', 'row');
  const label = document.createElement('label');
  label.classList.add('col-sm-2', 'col-form-label')
  label.innerHTML = `Jugador ${n}: `;
  const inputDiv = document.createElement('div');
  inputDiv.classList.add('col-sm-5');
  const input = document.createElement('input');
  input.classList.add('form-control');
  input.setAttribute("name", `jugador${n}`);
  input.setAttribute("required",'');
  input.setAttribute("id", `jugador${n}`);
  div.appendChild(label);
  div.appendChild(inputDiv);
  inputDiv.appendChild(input);
  form.insertBefore(div, addPlayer);
}

addPlayer.addEventListener('click', (e) => {
  e.preventDefault();
  createInput(++players);
})

startGame.addEventListener('click', (e) => {
  e.preventDefault();
  
  if(players <= 1) {
    console.log('Se requiere de 2 jugadores como mínimo')
    return;
  }

  const inputs = Array.from(form.children).filter(x => x instanceof HTMLDivElement)
  
  if (inputs.some(el => el.querySelector('.form-control').value === '')){
    console.log('No puede haber nombres vacios');
    return
  }
  
  let playersNames = [];
  inputs.forEach(el => {
    el.querySelector('.form-control').disabled = true;
    playerName = el.querySelector('.form-control').value;
    playersNames = [...playersNames, playerName];
  });

  addPlayer.remove();
  startGame.remove();

  const dartGame = setup(...playersNames);
  initGame(dartGame);
})
