const idOfChord = {
  'Hs': 0,
  'C': 0,
  'Cs': 1,
  'Db': 1,
  'D': 2,
  'Ds': 3,
  'Eb': 3,
  'E': 4,
  'Fb': 4,
  'Es': 5,
  'F': 5,
  'Fs': 6,
  'Gb': 6,
  'G': 7,
  'Gs': 8,
  'Ab': 8,
  'A': 9,
  'As': 10,
  'Bb': 10,
  'H': 11,
  'Cb': 11,
}

const chordById = ['C', 'Cs', 'D', 'Eb', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'Bb', 'H']

const formatChord = (raw) => {
  return raw.replace('s', '&#9839;').replace('b', '&#9837;')
}

export const transposeChord = transposition => (match, chord) => {
  if (transposition === 0) {
    return formatChord(chord)
  }
  const id = idOfChord[chord]
  if (id === undefined) {
    return chord
  }
  return formatChord(chordById[(id + transposition + 12) % 12])
}
