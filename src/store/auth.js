import { createEvent, createEffect, createStore, merge, createStoreObject, forward } from 'effector'

import * as auth from 'src/api/auth'

const reset = createEvent()

export const fxLogin = createEffect().use(auth.login)
export const fxLogout = createEffect().use(auth.logout)
export const fxRegistration = createEffect().use(auth.registration)
export const fxCheckLogin = createEffect().use(auth.checkAuth)

const $user = createStore(null)
  .on(merge([fxLogin.done, fxCheckLogin.done]), (_, { result }) => result)
  .reset(reset)

const $isAuth = $user.map(Boolean)

const $inCheckingAuth = createStore(true)
  .on(merge([fxCheckLogin, fxLogin, fxRegistration]), () => true)
  .on(merge([fxCheckLogin.done, fxLogin.done]), () => false)

export const $authStore = createStoreObject({
  user: $user,
  isAuth: $isAuth,
  inCheckingAuth: $inCheckingAuth,
})

forward({ from: fxLogout.done, to: reset })
forward({ from: fxRegistration.done, to: fxCheckLogin })

fxCheckLogin()
