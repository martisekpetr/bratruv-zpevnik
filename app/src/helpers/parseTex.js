import { latexParser } from 'latex-parser'

const getArgValue = (el, arg = 0) => el.arguments[arg].latex[0].text

let ignoreNext = false
let hskipWaiting = false

const parseChildren = (el, song) => {
  if (!el || !Array.isArray(el.latex)) return ''
  return el.latex.map(e => parseTexElement(e, song)).join('')
}

const formatExtension = ext => {
  switch (ext.trim()) {
    case '':
    case 'dim':
    case 'sus2':
    case 'sus4':
    case '+':
      return ext
    case '+7':
      return '+<sup>7</sup>'
    case '7sus4':
      return '<sup>7</sup>sus4'
    default:
      return `<sup>${ext}</sup>`
  }
}

const parseChordExtension = (el, song) => {
  if (el.arguments.length === 0) {
    return ''
  }
  const extensionRaw = parseChildren(el.arguments[0], song)
  const [ ext, bass ] = extensionRaw.split('/')

  return `${formatExtension(ext)}${bass ? `/%CHORD_${bass}%` : ''}`
}

export const parseTexCommand = (el, song) => {
  switch (el.name) {
    case 'capo':
      song.capo = getArgValue(el)
      break

    // manually ignored
    case 'noexport':
      return ''
    // only web
    case 'noprint':
    case 'printchords':
      return parseChildren(el.arguments[0], song)

    // song sections
    case 'verse':
      return `<span class="verse" verse="${parseChildren(el.arguments[0], song).replace(/\s+/g, '&nbsp;')}:&nbsp;"></span>`
    case 'chorus':
      return '<span class="chorus"></span>'
    case 'chorusAlt':
      return `<span class="chorus alt" label="${parseChildren(el.arguments[0], song).replace(/\s+/g, '&nbsp;')}"></span>`
    case 'rec':
      return `<span class="recitativ-head"></span><span class="recitativ-body">${parseChildren(el.arguments[0], song)}</span>`

      // chords
    case 'C':
    case 'D':
    case 'E':
    case 'F':
    case 'G':
    case 'A':
    case 'H':
    case 'Cs':
    case 'Ds':
    case 'Es':
    case 'Fs':
    case 'Gs':
    case 'As':
    case 'Hs':
    case 'Cb':
    case 'Db':
    case 'Eb':
    case 'Fb':
    case 'Gb':
    case 'Ab':
    case 'Bb':
      const chordName = `%CHORD_${el.name}%` + parseChordExtension(el, song)
      return `<span class="chord-wrapper"><span class="chord">${chordName}</span></span>`
    case 'Cm':
    case 'Dm':
    case 'Em':
    case 'Fm':
    case 'Gm':
    case 'Am':
    case 'Hm':
    case 'Csm':
    case 'Dsm':
    case 'Esm':
    case 'Fsm':
    case 'Gsm':
    case 'Asm':
    case 'Hsm':
    case 'Cbm':
    case 'Dbm':
    case 'Ebm':
    case 'Fbm':
    case 'Gbm':
    case 'Abm':
    case 'Bbm':
      const chordNameM = `%CHORD_${el.name.substr(0, el.name.length - 1)}%m` + parseChordExtension(el, song)
      return `<span class="chord-wrapper"><span class="chord">${chordNameM}</span></span>`
    case 'CHORD':
      return `<span class="chord-wrapper"><span class="chord">${parseChildren(el.arguments[0], song)}</span></span>`

    // text formatters
    case 'uv':
      return `"${parseChildren(el.arguments[0], song)}"`
    case 'textbf':
      return `<strong>${parseChildren(el.arguments[0], song)}</strong>`
    case 'emph':
      return `<i>${parseChildren(el.arguments[0], song)}</i>`

    // ignored formatting functions
    case 'textsf':
      return parseChildren(el.arguments[0], song)
    case 'textls':
      return parseChildren(el.arguments[1], song)
    case 'scalebox':
      return parseChildren(el.arguments[2], song)

    // multi-argument commands
    case 'vskip':
    case 'leftskip':
    case 'rightskip':
    case 'crdheight':
      ignoreNext = true
      return ''
    case 'hskip':
      hskipWaiting = true
      return ''

    // directly mapped symbols
    case '\\':
      return '<br />'
    case 'clearpage':
      return '</p><p>'
    case 'dots':
    case 'ldots':
      return '...'
    case 'sharp':
      // return '&#9839;'
      return 's'
    case '%':
      return '%'
    case 'times':
      return '&#215;'
    case 'rpt':
      return '<span class="rpt">&#119047;</span>'
    case 'revrpt':
      return '<span class="rev-rpt">&#119046;</span>'
    case 'Fermataup':
      return '<span class="chord-wrapper"><span class="chord fermata">&#119056;</span></span>'
    default:
      // console.log(el)
      return ''
  }
}

export const parseTexElement = (el, song) => {
  switch (el.type) {
    case 'TeXComm':
      return parseTexCommand(el, song)
    case 'TeXEnv':
      switch (el.name) {
        case 'minipage':
          return el.latex.slice(3).map(e => parseTexElement(e, song)).join('') + '</p><p>'
      }
      return parseTexCommand(el, song)
    case 'TeXRaw':
    // console.log(el)
      if (ignoreNext) {
        ignoreNext = false
        return el.text.trim().split(/\s+/).slice(1).join(' ')
      }

      if (hskipWaiting) {
        hskipWaiting = false
        const ss = el.text.trim().split(/\s+/)
        const width = ss.shift()
        return `<span class="hskip" style="width: ${width.replace('pt', 'px')}"></span>${ss.join(' ')}`
      }
      if (el.text === '\n') {
        return ''
      }
      return el.text.split('\n\n').join('</p><p>').replace(/~/g, '').replace(/--/g, '&ndash;')
    case 'Dollar':
      return parseChildren(el, song)
    case 0:
      switch (el.symbol) {
        case '^':
          return `<sup>${parseChildren(el.arguments[0], song)}</sup>`
      }
  }
}

const parseSong = (songElement) => {
  const song = {}
  song.title = parseChildren(songElement.arguments[0], song)
  song.author = getArgValue(songElement, 1)
  const textFragments = []
  textFragments.push('<p>')
  songElement.arguments[4].latex.forEach(el => {
    textFragments.push(parseTexElement(el, song))
  })
  textFragments.push('</p>')
  song.text = textFragments.join('')
  return song
}

export const parseAllSongs = (response) => {
  const { status, value: parsed } = latexParser.parse(response.data)
  if (!status) {
    throw new Error('Parsing LaTeX failed')
  }
  const document = parsed.find(el => el.name === 'document')
  const songsAndTags = document.latex.filter(el => (
    el.name === 'toftagthis' ||
    el.name === 'song' ||
    el.name === 'songWithTranslation'
  ))
  const songs = []

  let currentTags = []
  songsAndTags.forEach(songOrTag => {
    if (songOrTag.name === 'toftagthis') {
      currentTags = getArgValue(songOrTag).split(',').map(s => s.trim())
    } else if (songOrTag.name === 'songWithTranslation') {
      const versions = [
        Object.freeze({
          language: getArgValue(songOrTag, 0),
          song: parseSong(songOrTag.arguments[1].latex.find(el => el.name === 'song')),
        }),
        Object.freeze({
          language: getArgValue(songOrTag, 2),
          song: parseSong(songOrTag.arguments[3].latex.find(el => el.name === 'originalVersion')),
        }),
      ]
      const song = {}
      song.index = songs.length
      song.tags = currentTags
      song.versions = versions
      currentTags = []
      songs.push(song)
    } else {
      const song = parseSong(songOrTag)
      song.index = songs.length
      song.tags = currentTags
      currentTags = []
      songs.push(song)
    }
  })
  return songs
}
