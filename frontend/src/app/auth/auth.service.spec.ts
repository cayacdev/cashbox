import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import * as AuthActions from './store/auth.actions'

describe('AuthService', () => {
  let systemUnderTest: AuthService
  let store: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideMockStore({ initialState: {} })],
    })

    systemUnderTest = TestBed.inject(AuthService)
    store = TestBed.inject(MockStore)
  })

  it('should be created', () => {
    expect(systemUnderTest).toBeTruthy()
  })

  describe('setLogoutTimer', () => {
    it('should dispatch Logout action after the expiration duration', fakeAsync(() => {
      const expirationDuration = 5000
      spyOn(store, 'dispatch').and.callThrough()

      systemUnderTest.setLogoutTimer(expirationDuration)

      expect(systemUnderTest['tokenExpirationTimer']).toBeDefined()
      expect(store.dispatch).not.toHaveBeenCalledWith(new AuthActions.Logout())

      tick(5000)

      expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.Logout())
    }))
  })

  describe('clearLogoutTimer', () => {
    it('should clear the timer', fakeAsync(() => {
      const expirationDuration = 5000
      spyOn(window, 'clearTimeout').and.callThrough()

      systemUnderTest.setLogoutTimer(expirationDuration)

      systemUnderTest.clearLogoutTimer()

      expect(window.clearTimeout).toHaveBeenCalled()
      expect(systemUnderTest['tokenExpirationTimer']).toBeNull()
    }))

    it('should not clear the timer if it has already expired', fakeAsync(() => {
      const expirationDuration = 0
      spyOn(window, 'clearTimeout').and.callThrough()

      systemUnderTest.clearLogoutTimer()

      expect(window.clearTimeout).not.toHaveBeenCalled()
      expect(systemUnderTest['tokenExpirationTimer']).toBeUndefined()
    }))
  })
})
