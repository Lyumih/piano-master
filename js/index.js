var app = new Vue({
  el: "#app",
  data: {
    notesEng: ['A', 'A#', 'H', 'C', 'C#', 'D', "D#", "E", "F", "F#", 'G', 'G#'],
    notesRus: ['Ля', 'Ля#', 'Си', 'До', 'До#', 'Ре', "Ре#", "Ми", "Фа", "Фа#", 'Соль', 'Соль#'],
    noteList: ['A', 'C', 'E', 'G']
  },
  computed: {
    accords() {
      return this.noteList.map(note => {
        let index = this.notesEng.findIndex(noteEng => noteEng.toLowerCase() === note.toLowerCase())
        if (index === -1) return []
        let major = note.includes('m')
        let second = (index + (major ? 4 : 3)) % 12
        let third = (index + 7) % 12
        return {
          accord: note,
          accordRus: this.notesRus[index],
          notes: [this.notesEng[index], this.notesEng[second], this.notesEng[third]],
          notesRus: [this.notesRus[index], this.notesRus[second], this.notesRus[third]]
        }
      })
    }
  },
})