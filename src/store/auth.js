import { createEvent, createEffect, sample, createStore, merge, createStoreObject } from 'effector'

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
  .on(merge([fxCheckLogin, fxLogin]), () => true)
  .on(merge([fxCheckLogin.done, fxLogin.done]), () => false)

export const $authStore = createStoreObject({
  user: $user,
  isAuth: $isAuth,
  inCheckingAuth: $inCheckingAuth,
})

sample(fxLogout.done, reset)
sample(fxRegistration.done, fxCheckLogin)

fxCheckLogin()
