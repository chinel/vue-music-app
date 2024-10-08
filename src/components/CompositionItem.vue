<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="schema" @submit="edit" :initial-values="songData">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('songForm.titleLabel') }}</label>
          <vee-field
            name="name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('songForm.titlePlaceholder')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('songForm.genreLabel') }}</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('songForm.genrePlaceholder')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          {{ $t('song.submit-btn') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          {{ $t('song.back-btn') }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase'
export default {
  name: 'AppCompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    updateUnsavedFlag: {
      type: Function
    }
  },
  data() {
    return {
      showForm: false,
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: this.$t('messages.edit_msg'),
      schema: {
        name: 'required|min:3|max:100',
        genre: 'alpha_spaces'
      },
      songData: {
        name: this.song.modified_name,
        genre: this.song.genre
      }
    }
  },
  methods: {
    async edit(values) {
      //   console.log(values)
      this.in_submission = true
      this.show_alert = true
      this.alert_variant = 'bg-blue-500'
      this.alert_message = this.$t('messages.edit_msg')

      try {
        await songsCollection.doc(this.song.docID).update({
          modified_name: values.name,
          genre: values.genre
        })
      } catch (error) {
        this.in_submission = true
        this.alert_variant = 'bg-red-500'
        this.alert_message = this.$t('Something went wrong! Try again later.')
        return
      }

      this.updateSong(this.index, {
        modified_name: values.name,
        genre: values.genre
      })
      this.updateUnsavedFlag(false)
      this.in_submission = false
      this.alert_variant = 'bg-green-500'
      this.alert_message = 'Success!'
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)

      await songRef.delete()

      await songsCollection.doc(this.song.docID).delete()

      //this.removeSong(this.index) // we won't need this since we are using a listener
    }
  }
}
</script>
