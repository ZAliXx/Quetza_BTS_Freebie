export type Direction = 'across' | 'down'

export interface WordDef {
  answer: string // en mayúsculas, sin acentos ni símbolos
  clue: string
  row: number // fila donde empieza (desde 0)
  col: number // columna donde empieza (desde 0)
  dir: Direction // 'across' = horizontal, 'down' = vertical
}

// Ordenadas por número de pista para que las listas se vean en orden
export const words: WordDef[] = [
  { answer: 'WEON', clue: 'Pista 3, escrita sin espacio: «We ...»', row: 0, col: 2, dir: 'across' },
  { answer: 'WORLD', clue: 'Pista 5: «If I Ruled the ...»', row: 0, col: 2, dir: 'down' },
  { answer: 'CYPHER', clue: 'Pista 7: «BTS ... Pt. 1»', row: 1, col: 0, dir: 'down' },
  { answer: 'COFFEE', clue: 'Pista 6: bebida que te despierta por la mañana', row: 2, col: 4, dir: 'down' },
  { answer: 'INTRO', clue: 'Pista 1: «... : O!RUL8,2?»', row: 2, col: 11, dir: 'down' },
  { answer: 'PALDOGANGSAN', clue: 'Pista 9, también conocida como «Satoori Rap»', row: 3, col: 0, dir: 'across' },
  { answer: 'ATTACK', clue: 'Pista 8: «... on Bangtan»', row: 3, col: 6, dir: 'down' },
  { answer: 'SKOOL', clue: 'Pista 10: «Outro: Luv in ...»', row: 3, col: 9, dir: 'down' },
  { answer: 'NO', clue: 'EVERYBODY SAY __!', row: 5, col: 8, dir: 'across' },
  { answer: 'SKIT', clue: 'Pista 4: «... : R U Happy Now?»', row: 8, col: 5, dir: 'across' },
]