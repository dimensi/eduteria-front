import { Form, Icon, Input, Button, Alert } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import styled from '@emotion/styled'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'
import { useStore } from 'effector-react'

import { fxRegistration, $error } from 'src/store/auth'
import { FieldInterop } from 'src/components/FieldInterop'
import { useValidationSchema } from 'src/helpers/yup'

const RegistrationContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`

const schema = yup.object().shape({
  LastName: yup.string().required(),
  FirstName: yup.string().required(),
  Email: yup
    .string()
    .email()
    .required(),
  Password: yup.string().required(),
})

export function Registration() {
  const validation = useValidationSchema(schema)
  const errorFromApi = useStore($error)
  return (
    <RegistrationContainer>
      <FinalForm onSubmit={fxRegistration} validate={validation}>
        {({ handleSubmit }) => (
          <Form
            css={css`
              width: 300px;
            `}
            onSubmit={handleSubmit}
          >
            <Field
              name='FirstName'
              component={FieldInterop}
              as={Input}
              autocomplete='given-name'
              placeholder='First name'
              required
            />
            <Field
              name='LastName'
              component={FieldInterop}
              as={Input}
              autocomplete='family-name'
              placeholder='Last name'
              required
            />
            <Field
              name='Email'
              component={FieldInterop}
              as={Input}
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Email'
              type='email'
              autocomplete='email'
              required
            />
            <Field
              name='Password'
              component={FieldInterop}
              as={Input.Password}
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
              autocomplete='new-password'
              required
            />
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                css={css`
                  width: 100% !important;
                `}
              >
                Create
              </Button>
              Or <NavLink to='/login'>login.</NavLink>
            </Form.Item>
          </Form>
        )}
      </FinalForm>
      {errorFromApi && (
        <Alert
          message='Error Text'
          description='Error Description Error Description Error Description Error Description Error Description Error Description'
          type='error'
        />
      )}
    </RegistrationContainer>
  )
}
