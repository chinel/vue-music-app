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
    console.log('song-->', wrapper.text())

    expect(wrapper.text()).toContain(song.display_name)
  })
})
