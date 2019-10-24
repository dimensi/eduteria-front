import { useCallback } from 'react'

export function useValidationSchema(schema, deps = []) {
  return useCallback(validateBySchema(schema), deps)
}

export function validateBySchema(schema) {
  return async values => {
    try {
      await schema.validate(values, { abortEarly: false })
    } catch (err) {
      return err.inner.reduce(
        (formError, innerError) => ({
          ...formError,
          [innerError.path]: innerError.message,
        }),
        {}
      )
    }
  }
}
