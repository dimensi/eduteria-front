import React from 'react'
import { Form } from 'antd'

const getStatus = ({ touched, error, submitError, warning }) => {
  if (!touched) return
  if (error || submitError) return 'error'
  if (warning) return 'warning'
}

const getMessage = ({ touched, error, submitError, warning }) =>
  touched && (error || submitError || warning)

export const FieldInterop = ({ input, as: As, meta, ...props }) => (
  <Form.Item validateStatus={getStatus(meta)} help={getMessage(meta)}>
    <As {...input} {...props} />
  </Form.Item>
)
