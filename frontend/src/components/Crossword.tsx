import { useMemo, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { words } from '../data/crosswordData'
import type { Direction } from '../data/crosswordData'
import './Crossword.css'

type Cell = { row: number; col: number; letter: string; across?: number; down?: number }

const cid = (r: number, c: number) => `${r}-${c}`
const other = (d: Direction): Direction => (d === 'across' ? 'down' : 'across')

function buildGrid() {
  const cells = new Map<string, Cell>()
  let rows = 0
  let cols = 0

  words.forEach((w, i) => {
    ;[...w.answer].forEach((letter, k) => {
      const r = w.row + (w.dir === 'down' ? k : 0)
      const c = w.col + (w.dir === 'across' ? k : 0)
      const cell: Cell = cells.get(cid(r, c)) ?? { row: r, col: c, letter }
      cell[w.dir] = i
      cells.set(cid(r, c), cell)
      rows = Math.max(rows, r + 1)
      cols = Math.max(cols, c + 1)
    })
  })

  // Numeración: de arriba a abajo, de izquierda a derecha
  const starts = new Set(words.map((w) => cid(w.row, w.col)))
  const numbers = new Map<string, number>()
  let n = 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (starts.has(cid(r, c))) numbers.set(cid(r, c), n++)
    }
  }

  return { cells, rows, cols, numbers }
}

export default function Crossword() {
  const { cells, rows, cols, numbers } = useMemo(buildGrid, [])
  const [values, setValues] = useState<Record<string, string>>({})
  const [active, setActive] = useState({ row: words[0].row, col: words[0].col })
  const [dir, setDir] = useState<Direction>(words[0].dir)
  const [checked, setChecked] = useState(false)
  const inputs = useRef<Record<string, HTMLInputElement | null>>({})

  // Palabra activa según la casilla y la dirección actual
  const activeCell = cells.get(cid(active.row, active.col))
  const effDir: Direction = activeCell?.[dir] !== undefined ? dir : other(dir)
  const activeIdx = activeCell?.[effDir]
  const activeWord = activeIdx !== undefined ? words[activeIdx] : undefined

  const inActiveWord = (r: number, c: number) =>
    activeIdx !== undefined && cells.get(cid(r, c))?.[effDir] === activeIdx

  const focusCell = (r: number, c: number) => {
    setActive({ row: r, col: c })
    inputs.current[cid(r, c)]?.focus()
  }

  // Tocar una casilla; si tocas la misma otra vez, cambia horizontal/vertical
  const selectCell = (r: number, c: number) => {
    const cell = cells.get(cid(r, c))
    if (!cell) return
    const same = active.row === r && active.col === c
    let next = dir
    if (cell[dir] === undefined || (same && cell[other(dir)] !== undefined)) {
      next = other(dir)
    }
    setDir(next)
    setActive({ row: r, col: c })
  }

  const step = (r: number, c: number, delta: number) => {
    const nr = r + (effDir === 'down' ? delta : 0)
    const nc = c + (effDir === 'across' ? delta : 0)
    if (cells.has(cid(nr, nc))) focusCell(nr, nc)
  }

  const handleChange = (r: number, c: number, e: ChangeEvent<HTMLInputElement>) => {
    const letter = e.target.value.slice(-1).toUpperCase()
    setChecked(false)
    if (!letter) {
      setValues((v) => ({ ...v, [cid(r, c)]: '' }))
      return
    }
    if (!/^[A-ZÑ]$/.test(letter)) return
    setValues((v) => ({ ...v, [cid(r, c)]: letter }))
    step(r, c, 1)
  }

  const handleKeyDown = (r: number, c: number, e: KeyboardEvent<HTMLInputElement>) => {
    const arrows: Record<string, [number, number, Direction]> = {
      ArrowRight: [0, 1, 'across'],
      ArrowLeft: [0, -1, 'across'],
      ArrowDown: [1, 0, 'down'],
      ArrowUp: [-1, 0, 'down'],
    }
    const m = arrows[e.key]
    if (m) {
      e.preventDefault()
      if (cells.has(cid(r + m[0], c + m[1]))) {
        setDir(m[2])
        focusCell(r + m[0], c + m[1])
      }
      return
    }
    // Borrar en una casilla vacía regresa a la anterior
    if (e.key === 'Backspace' && !values[cid(r, c)]) {
      e.preventDefault()
      const pr = r - (effDir === 'down' ? 1 : 0)
      const pc = c - (effDir === 'across' ? 1 : 0)
      if (cells.has(cid(pr, pc))) {
        setValues((v) => ({ ...v, [cid(pr, pc)]: '' }))
        focusCell(pr, pc)
      }
    }
  }

  const selectWord = (i: number) => {
    const w = words[i]
    setDir(w.dir)
    focusCell(w.row, w.col)
  }

  const allCorrect = [...cells.values()].every(
    (cell) => values[cid(cell.row, cell.col)] === cell.letter,
  )

  return (
    <div className="cw">
      <div className="cw-top">
        <Link to="/" className="cw-back">
          ← Menú
        </Link>
        <h2>Crucigrama</h2>
      </div>

      <div className="cw-clue">
        {activeWord ? (
          <>
            <strong>
              {numbers.get(cid(activeWord.row, activeWord.col))}
              {effDir === 'across' ? ' →' : ' ↓'}
            </strong>{' '}
            {activeWord.clue}
          </>
        ) : (
          'Toca una casilla para empezar'
        )}
      </div>

      <div className="cw-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows * cols }, (_, i) => {
          const r = Math.floor(i / cols)
          const c = i % cols
          const cell = cells.get(cid(r, c))
          if (!cell) return <div key={i} />

          const id = cid(r, c)
          const isActive = active.row === r && active.col === c
          const wrong = checked && !!values[id] && values[id] !== cell.letter
          const cls = ['cw-cell', inActiveWord(r, c) && 'in-word', isActive && 'active', wrong && 'wrong']
            .filter(Boolean)
            .join(' ')

          return (
            <div key={i} className={cls}>
              {numbers.get(id) && <span className="cw-num">{numbers.get(id)}</span>}
              <input
                ref={(el) => {
                  inputs.current[id] = el
                }}
                value={values[id] ?? ''}
                maxLength={2}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                aria-label={`Fila ${r + 1}, columna ${c + 1}`}
                onClick={() => selectCell(r, c)}
                onChange={(e) => handleChange(r, c, e)}
                onKeyDown={(e) => handleKeyDown(r, c, e)}
              />
            </div>
          )
        })}
      </div>

      <div className="cw-actions">
        <button onClick={() => setChecked(true)}>Revisar</button>
        <button
          onClick={() => {
            setValues({})
            setChecked(false)
          }}
        >
          Limpiar
        </button>
      </div>

      {allCorrect && <p className="cw-win">¡Completaste el crucigrama!</p>}

      <div className="cw-clues">
        {(['across', 'down'] as Direction[]).map((d) => (
          <div key={d}>
            <h3>{d === 'across' ? 'Horizontales' : 'Verticales'}</h3>
            <ul>
              {words.map(
                (w, i) =>
                  w.dir === d && (
                    <li key={i}>
                      <button
                        className={i === activeIdx ? 'on' : ''}
                        onClick={() => selectWord(i)}
                      >
                        {numbers.get(cid(w.row, w.col))}. {w.clue}
                      </button>
                    </li>
                  ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}