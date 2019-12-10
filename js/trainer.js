var app = new Vue({
  el: "#app",
  data: {
    majorSelected: true,
    accordList: ['A', 'C', 'E', 'G'],
    accordSelected: 'A',
    accordTrainIndex: 0,
    accords: [],
    secondsToNextAccord: 1.0,
    trainTimerId: undefined,
    tick: false
  },
  async mounted() {
    const response = await fetch('../accords.json')
    this.accords = await response.json()
    this.toggleTimerTrain()
  },
  computed: {
    accordTrain() {
      return this.accords[this.accordTrainIndex]
    }
  },
  methods: {
    nextTrainAccord() {
      this.tick = !this.tick
      this.accordTrainIndex = Math.floor(Math.random() * this.accords.length)
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