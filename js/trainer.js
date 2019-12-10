var app = new Vue({
  el: "#app",
  data: {
    majorSelected: true,
    accordList: ['A', 'C', 'E', 'G'],
    accordSelected: 'A',
    accordTrainIndex: 0,
    accords: [],
    secondsToNextAccord: 2.0,
    trainTimerId: undefined,
    tick: false,
    musicKeys: ["A", "B", "C", "D", "E", "F", "G",],
    musicKeysSelected: ["A", "C", "E", "G"],
    showAccord: true,
    showNotes: true,
    showNotesRus: true,

  },
  async mounted() {
    const response = await fetch('./accords.json')
    this.accords = await response.json()
    this.toggleTimerTrain()
  },
  computed: {
    accordTrain() {
      return this.accordsFiltred[this.accordTrainIndex]
    },
    accordsFiltred() {
      return this.accords.filter(accord => this.musicKeysSelected.includes(accord.accord))
    }
  },
  methods: {
    nextTrainAccord() {
      this.tick = !this.tick
      let preAccordIndex = this.accordTrainIndex
      let newAccordIndex = Math.floor(Math.random() * this.accordsFiltred.length)
      if (this.accordsFiltred.length > 1 && preAccordIndex === newAccordIndex) {
        newAccordIndex === 0 ? newAccordIndex++ : newAccordIndex--
      }
      this.accordTrainIndex = newAccordIndex
    },
    toggleTimerTrain() {
      console.log(this.trainTimerId)
      if (this.trainTimerId) {
        clearInterval(this.trainTimerId)
        this.trainTimerId = undefined
      }
      else this.trainTimerId = setInterval(() => { this.nextTrainAccord() }, this.secondsToNextAccord * 1000, 0)
    },
    changeTrainSpeed(speed) {
      if (this.secondsToNextAccord < 0.3 && speed < 0) return
      this.secondsToNextAccord = this.secondsToNextAccord + speed
      this.secondsToNextAccord = Number(this.secondsToNextAccord.toFixed(2))
      this.toggleTimerTrain()
      this.toggleTimerTrain()
    }

  },
})