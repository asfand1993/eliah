import { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Form, Button } from 'react-bootstrap'
import LayoutLogin from '../../../components/Layout/LayoutLogin'
import sliderData from '../../../data/slider/sliderOne.json'
import FormInput from '../../../components/control/FormInput'
import { loadData, userRegisterFlag } from '../../../redux/actions/userActions'

const REDIRECT_PATH_SHOP = '/shop/login'

export default () => {
  const { register, errors, handleSubmit } = useForm()
  const router = useRouter()
  const dispatch = useDispatch()
  const onSubmit = values => {
    // form is valid
    dispatch(loadData(values))
  }
  const userState = useSelector(state => state.userReducer)

  useEffect(() => {
    if (userState && userState.customerId && userState.userRegister) {
      dispatch(userRegisterFlag(false))
      router.push({
        pathname: process.env.PUBLIC_URL + REDIRECT_PATH_SHOP
      })
    }
  }, [userState])

  return (
    <>
      <LayoutLogin title='Register' data={sliderData} className='-style-1' />
      <div className='container register-container'>
        <div className='row mb-5'>
          <div className='col-lg-12 text-center'>
            <h1 className='mt-5'>Register</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name='firstName'
            placeholder={'First Name'}
            errors={errors.firstName}
            forwardRef={register}
            type={'text'}
          />
          <FormInput
            name='lastName'
            placeholder={'Last Name'}
            errors={errors.lastName}
            forwardRef={register({
              required: 'Password is required',
              validate: value =>
                value.length > 3 || 'Last Name must be 3 characters at minimum'
            })}
            type={'text'}
          />
          <FormInput
            name='emailAddress'
            placeholder={'Enter email'}
            errors={errors.lastName}
            forwardRef={register({
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address format'
              }
            })}
            type={'email'}
            autocomplete='off'
          />
          <FormInput
            name='password'
            placeholder={'Enter password'}
            errors={errors.lastName}
            forwardRef={register({
              required: 'Password is required',
              validate: value =>
                value.length > 3 || 'Password must be 3 characters at minimum'
            })}
            type={'password'}
            autocomplete='off'
          />

          <button className='btn btn-primary btn-block' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
