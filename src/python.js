export const numpy = {
  add: (a1, a2) => a1.map((e, i) => e + a2[i]),
  subtract: (a1, a2) => a1.map((e, i) => e - a2[i])
}

// export default numpy