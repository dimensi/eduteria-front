import React from 'react'

export const FieldInterop = ({ input, as: As, ...props }) => <As {...input} {...props} />
