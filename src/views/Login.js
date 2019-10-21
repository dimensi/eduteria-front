import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import styled from '@emotion/styled'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { NavLink } from 'react-router-dom'
import { useCallback } from 'react'

import { fxLogin } from 'src/store/auth'
import { FieldInterop } from 'src/components/FieldInterop'

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`
export function Login() {
  return (
    <LoginContainer>
      <FinalForm onSubmit={fxLogin}>
        {({ handleSubmit }) => (
          <Form
            css={css`
              width: 300px;
            `}
            onSubmit={handleSubmit}
          >
            <Form.Item>
              <Field
                name='email'
                component={FieldInterop}
                as={Input}
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Email'
              />
            </Form.Item>
            <Form.Item>
              <Field
                name='password'
                component={FieldInterop}
                as={Input.Password}
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <a className='login-form-forgot' href=''>
                Forgot password
              </a>
              <Button
                type='primary'
                htmlType='submit'
                css={css`
                  width: 100% !important;
                `}
              >
                Log in
              </Button>
              Or <NavLink to='/register'>register now!</NavLink>
            </Form.Item>
          </Form>
        )}
      </FinalForm>
    </LoginContainer>
  )
}
