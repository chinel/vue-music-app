import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '@/includes/helper'

export default defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '00:00', // the current position is called seek in Howler
    duration: '00:00',
    playerProgress: '0%'
  }),
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      } else {
        return false
      }
    }
  },
  actions: {
    async newSong(song) {
      //this version is to ensure there is no memory leaks and that previous
      //playing song is unloaded before the new one is added
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }
      //This is my own manual way of reseting the song
      //   if (this.sound.playing) {
      //     this.sound.stop()
      //     this.sound = {}
      //     this.currentSong = {}
      //   }
      this.currentSong = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()
      this.sound.on('play', () => {
        //this function is similar to the setInterval function, except that the function gets called before the next frame gets painted unto the screen.
        //it is perfect for updating the seek and duration properties
        requestAnimationFrame(this.progress) //
      })
    },
    async toggleAudio() {
      //this checks if the function exists
      if (!this.sound.playing) {
        return
      }

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound.duration())

      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`

      if (this.sound.playing && this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    }
  }
})
