import sha1 from 'crypto-js/sha1'

import { recordApi } from 'src/api/helpers/recordApi'

const userColumns = [
  { name: 'UserID' },
  { name: 'LoginName' },
  { name: 'UserName' },
  { name: 'Environment' },
  { name: 'InterfaceSections', type: 'json' },
]

export async function registration(user) {
  const hash = sha1(user.Email.toLowerCase() + ':' + user.Password).toString()

  const parameters = Object.entries(user).reduce(
    (acc, [key, value]) => {
      if (key === 'Password') return acc

      const column = { name: key, value }
      if (key === 'Sex') column.type = 'bit'
      if (key === 'DateOfBirth') column.type = 'datetime2'
      acc.push(column)
      return acc
    },
    [
      {
        name: 'SecretHash',
        value: hash,
      },
    ]
  )

  return recordApi({
    procedure: 'Auth.Registration',
    parameters,
  })
}

export async function login({ email, password }) {
  const hash = sha1(email.toLowerCase() + ':' + password).toString()

  const {
    recordset: [user],
  } = await recordApi({
    procedure: 'Auth.LogIn',
    parameters: [
      {
        name: 'Email',
        value: email,
      },
      {
        name: 'SecretHash',
        value: hash,
      },
    ],
    columns: userColumns,
  })

  return user
}

export async function logout() {
  return recordApi({ procedure: 'Auth.LogOut' })
}

export async function checkAuth() {
  const {
    recordset: [user],
  } = await recordApi({
    procedure: 'Auth.LogState',
    columns: userColumns,
  })
  return user
}
