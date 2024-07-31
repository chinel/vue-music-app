import SongItem from '@/components/SongItem.vue'
import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils'

describe('SongItem.vue', () => {
  test('renders song.display_name', () => {
    const song = {
      display_name: 'Test',
      docID: 'ksjnskjndkjskjndkn',
      modified_name: 'Test 2'
    }
    const wrapper = mount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    const compositionAuthor = wrapper.find('.text-gray-500')
    expect(compositionAuthor.text()).toBe(song.display_name) // this returns a specific element
    // expect(wrapper.text()).toContain(song.display_name) // this can also be used
  })

  test('renders song.docID in id attribute', () => {
    const song = {
      display_name: 'Test',
      docID: 'ksjnskjndkjskjndkn',
      modified_name: 'Test 2'
    }
    const wrapper = mount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`)
  })

  test('renders dynamic song.docID in class attribute', () => {
    const song = {
      display_name: 'Test',
      docID: 'ksjnskjndkjskjndkn',
      modified_name: 'Test 2'
    }
    const wrapper = mount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.classes()).toContain(`song-id-${song.docID}`)
  })
})
