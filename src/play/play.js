// import voice from './tritone.mp3';

class Sound {
  constructor(context, buffer) {
    this.context = context
    this.buffer = buffer
  }

  setup(onended) {
    this.source = this.context.createBufferSource()
    this.source.buffer = this.buffer
    this.source.connect(this.context.destination)

    // source.onended = () => {
    //   console.log('White noise finished');
    // }

    this.source.addEventListener("ended", () => {
      console.log("voice finished")
      onended()
    })
  }

  play(onended) {
    this.setup(onended)
    // 从0s开始播放
    // 默认值是0
    this.source.start()
  }

  stop() {
    this.source.stop()
  }

  sourceNode() {
    return this.source
  }
}

class Buffer {
  constructor(context) {
    this.context = context
    this.buffer = null
  }

  loadSound(url) {
    var myRequest = new Request(url)
    let thisBuffer = this
    return fetch(myRequest)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status)
        }
        return response.arrayBuffer()
      })
      .then(function(buffer) {
        thisBuffer.context.decodeAudioData(buffer, function(decodedData) {
          thisBuffer.buffer = decodedData
          console.log("Buffer loaded")
        })
      })
  }

  loadBuffer(url) {
    this.loadSound(url)
  }

  getSound() {
    return this.buffer
  }
}

let sound = null

let context = new (window.AudioContext || window.webkitAudioContext)()

let buffer = new Buffer(context)

export function play(mp3, onended) {
  stop()
  try {
    loadAudio(mp3)
    sound = new Sound(context, buffer.getSound())
    sound.play(onended)
  } catch (error) {
    console.log("Error: " + error)
  }
}

export function stop() {
  try {
    sound && sound.stop()
  } catch (error) {
    console.log("Stop Error: ", error)
  }
}

function loadAudio(mp3) {
  buffer.loadBuffer(mp3)
}
