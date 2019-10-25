import { Form, Icon, Input, Button } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { fxLogin } from 'src/store/auth'
import { FieldInterop } from 'src/components/FieldInterop'
import { useValidationSchema } from 'src/helpers/yup'

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
})

export function Login() {
  const validation = useValidationSchema(schema)
  return (
    <LoginContainer>
      <FinalForm onSubmit={fxLogin} validate={validation}>
        {({ handleSubmit }) => (
          <Form
            css={css`
              width: 300px;
            `}
            onSubmit={handleSubmit}
          >
            <Field
              name='email'
              component={FieldInterop}
              as={Input}
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Email'
              type='email'
            />
            <Field
              name='password'
              component={FieldInterop}
              as={Input.Password}
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                css={css`
                  width: 100% !important;
                `}
              >
                Log in
              </Button>
              Or <NavLink to='/registration'>register.</NavLink>
            </Form.Item>
          </Form>
        )}
      </FinalForm>
    </LoginContainer>
  )
}
