<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url('/img/header.png')"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Feeling stressed? Let the power of melody wash over you. It's time to Listen to Great
            Music!
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <!-- Icon -->
          <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import AppSongItem from '@/components/SongItem.vue'
import { songsCollection } from '@/includes/firebase'
export default {
  name: 'AppHome',
  components: {
    AppSongItem
  },
  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pendingRequest: false
    }
  },
  async created() {
    this.getSongs()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    async handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window

      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight // the value of the scroll top is always a decimal, so we need it in a whole number
      if (bottomOfWindow) {
        await this.getSongs()
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return
      }

      this.pendingRequest = true

      let songsQuery = songsCollection.orderBy('modified_name').limit(this.maxPerPage)

      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get()

        songsQuery = songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
      }
      await songsQuery.onSnapshot((snapshot) => {
        // this.songs = []
        snapshot.forEach((document) => {
          const song = {
            docID: document.id,
            ...document.data()
          }

          this.songs.push(song)
        })

        this.pendingRequest = false
      })
    }
  }
}
</script>
