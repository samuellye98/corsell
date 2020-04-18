import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import metrics from '../../config/metrics'
import { Formik } from 'formik'
import { StyledInput } from './LoginForm'
import Button from '@ant-design/react-native/lib/button'

Animatable.initializeRegistryWithDefinitions({
  hideLogin: {
    // Combined slideInDown & slideInLeft
    from: { height: metrics.DEVICE_HEIGHT },
    to: { height: 50 }
  },
  showLogin: {
    from: { height: 50 },
    to: { height: metrics.DEVICE_HEIGHT }
  }
})

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  async handleLogin(values) {
    await this.props.updateLoginForm(values)
  }

  async hideForm() {
    if (this.containerRef && this.logoRef && this.formikRef && this.buttonRef) {
      await Promise.all([
        this.containerRef.hideLogin(600),
        this.buttonRef.fadeOut(300),
        this.formikRef.fadeOut(300),
        this.logoRef.fadeOut(300)
      ])
    }
  }

  componentWillUnmount() {
    this.props.resetLoginForm()
  }

  componentDidUpdate() {
    if (this.props.loginSuccess === true) {
      this.props.resetLoginForm()
      this.props.navigateToMain()
    }
  }

  render() {
    const { loginFailure, verifyingLogin, onSignupPress } = this.props
    return (
      <Animatable.View
        style={styles.container}
        ref={ref => (this.containerRef = ref)}
        animation={'showLogin'}
        duration={600}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Animatable.View
            style={styles.logoContainer}
            ref={ref => (this.logoRef = ref)}
            animation={'fadeIn'}
            duration={600}
          >
            <Text style={styles.mainLogoText}>CORSELL</Text>
            <Text style={styles.sideLogoText}>
              Buy, Snap and Sell, all in one place
            </Text>
          </Animatable.View>
          <Animatable.View
            ref={ref => (this.formikRef = ref)}
            animation={'fadeIn'}
            duration={300}
            delay={400}
            style={styles.inputContainer}
          >
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => {
                this.handleLogin(values)
              }}
            >
              {formikProps => (
                <Fragment>
                  <View ref={ref => (this.formRef = ref)}>
                    <StyledInput
                      label="Email"
                      formikProps={formikProps}
                      formikKey="email"
                      placeholder="ab12@cornell.edu"
                      iconName="mail"
                      loginFailure={loginFailure}
                      onChangeText={text =>
                        formikProps.setFieldValue('email', text)
                      }
                      editable={!verifyingLogin}
                    />

                    <StyledInput
                      label="Password"
                      formikProps={formikProps}
                      formikKey="password"
                      placeholder="Password"
                      iconName="lock"
                      secureTextEntry
                      loginFailure={loginFailure}
                      onChangeText={text =>
                        formikProps.setFieldValue('password', text)
                      }
                      editable={!verifyingLogin}
                    />
                  </View>
                  <View
                    ref={ref => (this.errorRef = ref)}
                    style={styles.errorContainer}
                  >
                    {loginFailure ? (
                      <Text style={styles.errorStyles}>
                        Invalid Email or Password{' '}
                      </Text>
                    ) : null}
                  </View>

                  <View>
                    <Button
                      style={styles.loginButton}
                      onPress={formikProps.handleSubmit}
                      loading={verifyingLogin}
                      disabled={verifyingLogin}
                    >
                      <Text style={styles.loginButtonText}>Login</Text>
                    </Button>
                  </View>

                  <Text style={styles.forgotLink}>
                    {'Forgot your password?'}
                  </Text>
                </Fragment>
              )}
            </Formik>
          </Animatable.View>
        </KeyboardAvoidingView>

        <Animatable.View
          style={styles.signupContainer}
          ref={ref => (this.buttonRef = ref)}
          animation={'fadeIn'}
          duration={400}
          delay={300}
        >
          <TouchableOpacity
            style={styles.signupButton}
            onPress={onSignupPress}
            disabled={verifyingLogin}
          >
            <Text style={styles.signupText}>New Account</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    )
  }
}

LoginScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    height: metrics.DEVICE_HEIGHT * 0.88,
    alignItems: 'center'
  },
  inputContainer: {
    alignItems: 'center',
    top: '25%'
  },
  logoContainer: {
    alignItems: 'center',
    top: '20%'
  },
  mainLogoText: {
    fontSize: 50,
    fontFamily: 'montserrat-black'
  },
  sideLogoText: {
    fontSize: 20,
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
    paddingHorizontal: 10
  },
  errorContainer: {
    fontSize: 15,
    width: 250,
    marginHorizontal: 30
  },
  errorStyles: {
    color: 'red'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  },
  loginButton: {
    height: 45,
    borderRadius: 30,
    backgroundColor: '#2C85DE',
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH * 0.8,
    marginVertical: 15,
    marginHorizontal: 25
  },
  loginButtonText: {
    color: 'white',
    fontFamily: 'montserrat-regular'
  },
  signupContainer: {
    height: metrics.DEVICE_HEIGHT * 0.075,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#192022',
    position: 'absolute',
    width: '100%',
    bottom: -1,
    justifyContent: 'center'
  },
  signupButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'montserrat-regular'
  },
  forgotLink: {
    color: '#2C85DE',
    fontFamily: 'montserrat-regular',
    alignSelf: 'center'
  }
})

LoginScreen.propTypes = {
  onLoginCompleted: PropTypes.func,
  updateLoginForm: PropTypes.func,
  resetLoginForm: PropTypes.func,
  loginErrorMessages: PropTypes.object,
  verifyingLogin: PropTypes.bool,
  loginSuccess: PropTypes.bool,
  loginFailure: PropTypes.bool
}
