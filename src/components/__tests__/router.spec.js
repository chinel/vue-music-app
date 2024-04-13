const { shallowMount, RouterLinkStub } = require('@vue/test-utils')
import SongItem from '@/components/SongItem.vue'

describe('Router', () => {
  test('renders router link', () => {
    const song = {
      display_name: 'Test',
      docID: 'ksjnskjndkjskjndkn',
      modified_name: 'Test 2'
    }
    const wrapper = shallowMount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docID }
    })
  })
})
