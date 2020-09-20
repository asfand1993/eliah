import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import LayoutLogin from '../../../components/Layout/LayoutLogin'
import sliderData from '../../../data/slider/sliderOne.json'
import FormInput from '../../../components/control/FormInput'

import { loginUser, userRegisterFlag } from '../../../redux/actions/userActions'

const REDIRECT_PATH_SHOP = '/shop/fullwidth-4col'

export default function login () {
  const { register, errors, handleSubmit } = useForm()
  const router = useRouter() //Router
  const dispatch = useDispatch() //Dispatcher
  const userState = useSelector(state => state.userReducer)

  const onSubmit = values => {
    dispatch(loginUser(values))
  }

  useEffect(() => {
    if (userState && userState.token && userState.isSuccessful) {
      router.push({
        pathname: process.env.PUBLIC_URL + REDIRECT_PATH_SHOP
      })
    }
  }, [userState])

  return (
    <LayoutLogin title='Homepage 1' data={sliderData} className='-style-1'>
      <div id='login'>
        <div id='left'>
          <div id='sign-in'>
            <div className='logo'>
              <img src='/assets/images/logo.png' alt='plural sight' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    value.length > 3 ||
                    'Password must be 3 characters at minimum'
                })}
                type={'password'}
                autocomplete='off'
              />
              <button className='primary-btn' type='submit'>
                Sign In
              </button>
            </form>
            <div className='link'>
              <a href='#'>Forgot Your Password</a>
            </div>
            <div className='or'>
              <hr className='bar' />
              <span>OR</span>
              <hr className='bar' />
            </div>

            <Link href={process.env.PUBLIC_URL + '/shop/register'}>
              <a className='secondary-btn'>Create an account</a>
            </Link>
          </div>
          <footer id='main-footer'>
            <p>Copy Right &copy; 2020 , Asfand All rights reserved</p>
            <div>
              <a href='#'>Terms of use</a> | <a href='#'>Privacy Policy</a>
            </div>
          </footer>
        </div>
        <div id='right'>
          <div id='showcase'>
            <div className='showcase-content'>
              <h1 className='showcase-text'>
                Let's create the future <strong>together</strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </LayoutLogin>
  )
}
