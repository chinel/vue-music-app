import { setActivePinia, createPinia } from 'pinia'
import useUserStore from '@/stores/user'

//vitest will detect that firebase is imported
//from the useUserStore
vi.mock('@/includes/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve()
  }
}))

describe('stores', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // this tricks pinia of an active instance during testing
  })

  test('Authenticate user', async () => {
    const store = useUserStore()

    expect(store.userLoggedIn).not.toBe(true)

    await store.authenticate({})

    expect(store.userLoggedIn).toBe(true)
  })
})
