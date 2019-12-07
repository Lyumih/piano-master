console.log("work")
const createAccord = (name, index) => ({ name, index })
const accords = ['A', 'A#', 'H', 'C', 'C#', 'D', "D#", "E", "F", "F#", 'G', 'G#']

console.log(accords)

let findAccord = (inputNote = 'C', major = true) => {
  let index = accords.findIndex(note => note === inputNote)
  let second = (index + (major ? 4 : 3)) % 12
  let third = (index + 7) % 12
  return [accords[index], accords[second], accords[third]]
}

console.log(findAccord('G', true))