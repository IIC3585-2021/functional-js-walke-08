// Este archivo es para probar cosas que no sé si funcionan

// Función identidad (Combinator)
const identity = x => x;

// K Combinator
const k = x => y => x;

const init_score = k(501);

// Pipeline que toma funciones con parámetro el retorno de la función anterior 
const pipe = functions => data => {
  return functions.reduce( (value, func) => func(value), data);
}

const map = f => x => x.map(f) 

const aleatorio = () => ([
  Math.floor(Math.random()*3) + 1, 
  Math.floor(Math.random()*21)
]);

const generateThrow = () => {
  const sThrow = Math.random();
  return sThrow <= 0.3 ? sThrow <= 0.1 ? 'DB' : 'SB' : aleatorio();
}

const scoreThrow = x => Array.isArray(x) ? x[0]*x[1] : x === 'DB' ? 50 : 25;

const restarPuntaje = (x, y) => x - scoreThrow(y);

const calc = move => move ? score => move.reduce(restarPuntaje, score) : identity;

const compose = (f, g) => x => f(g(x))

const logs = msg => x => {
  console.log(msg, x)
  return x
}

const player = name => {
  let score = init_score(name);
  return function(move) {
    const operation = compose(Math.abs, calc(move));
    score = operation(score);
    return score;
  }
}

const newTurn = k([...new Array(3)]);

const dartThrow = fScore => pipe([
  logs('Turno de'), 
  newTurn, 
  map(generateThrow), 
  logs('Lanzamiento:'), 
  fScore, 
  logs('Puntos:'), 
  hasWin
])

const game = (players, turn=0) => {
  return dartThrow(players[turn].score)(players[turn].name) ? 
    console.log(`ganó ${players[turn].name}`): game(players, (turn + 1) % players.length)
}

const init_state = name => Object.freeze({ name, score: player(name) });

const init_game = (...players) => {
  /*let state = []
  players.forEach((name) => state = [
    ...state, 
    { name, score: init_score(name) }
  ])
  return state;*/
  return Object.freeze(players.map(init_state));
}

const hasWin = score => score === 0;

/* const setup = n => {
  let players = [];
  let turn = 0;
  [...(new Array(n))].forEach(sb => {
    const name = window.prompt("Ingresa tu nombre: ")
    players = [...players, name]
  })
  return players;
}


const playerThrow = player => points => {
  points
    .map(x => Array.isArray(x) ? x : (x==='DP') ? [1, 25] : [1, 50])
    .reduce((x, y) => x + y[0]*y[1],0)
}
 */

const juego = init_game('pipe', 'juanpa', 'vicho');