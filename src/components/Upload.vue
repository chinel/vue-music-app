<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t('upload.title') }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="uploadMusic($event)"
      >
        <h5>{{ $t('upload.upload-label') }}</h5>
      </div>
      <input type="file" multiple @change="uploadMusic($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i>{{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase'
export default {
  name: 'AppUpload',
  data() {
    return {
      is_dragover: false,
      uploads: []
    }
  },
  methods: {
    uploadMusic($event) {
      // console.log($event)
      this.is_dragover = false
      //const { files } = $event.dataTransfer

      //   console.log(files)
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]
      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return
        }

        if (!navigator.onLine) {
          this.uploads.push({
            task: {},
            current_progress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            text_class: 'text-red-400'
          })
          return
        }

        const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2)}`
        const storageRef = storage.ref() // bucket url vue-music-app-65268.appspot.com
        const songsRef = storageRef.child(`songs/${uniqueFileName}_${file.name}`) //  vue-music-app-65268.appspot.com/songs/example.mp3
        const task = songsRef.put(file) // returns a task snapshot

        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            text_class: ''
          }) - 1

        task.on(
          'state_changed',
          (snapshot) => {
            //console.log(snapshot)
            // it is important to use arrow function here to be able to access the this keyword because it is not bound to the component's instance
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.uploads[uploadIndex].current_progress = progress
          },
          (error) => {
            //this third argument is called when there is an error
            this.uploads[uploadIndex].variant = 'bg-red-400'
            this.uploads[uploadIndex].icon = 'fas fa-times'
            this.uploads[uploadIndex].text_class = 'text-red-400'
            console.log(error)
          },
          async () => {
            //this fourth argument is called when the upload is a success
            // console.log(auth)
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name, // The modified name is used to change the name, so that we do not have to change the file name in storage, thereby making 2 requests
              genre: '',
              comments_count: 0
            }
            song.url = await task.snapshot.ref.getDownloadURL()
            const result = await songsCollection.add(song)
            console.log(result)
            this.uploads[uploadIndex].variant = 'bg-green-400'
            this.uploads[uploadIndex].icon = 'fas fa-check'
            this.uploads[uploadIndex].text_class = 'text-green-400'
          }
        ) // this will let us know the progress of the upload, if it succeeded or failed
      })
    },
    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel()
      })
    }
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel()
    })
  }
}
</script>
