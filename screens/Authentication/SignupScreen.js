import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Image,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import {
  StyledInput,
  validationSchema0,
  validationSchema1,
  validationSchema2,
} from './SignupForm';
import SignupResultMessage from './SignupResultMessage';
import metrics from '../../config/metrics';
import { Entypo } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Button from '@ant-design/react-native/lib/button';

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      step: 0,
      showMessage: false,
      values: {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        username: '',
        phone: '',
        year: '',
        major: '',
        address: '',
      },
      validationSchema: [
        validationSchema0,
        validationSchema1,
        validationSchema2,
      ],
      height: 150,
    };
    this.state = this.initialState;
  }

  handleChange(event, key) {
    const value = event.nativeEvent.text;
    this.setState({
      values: {
        ...this.state.values,
        [key]: value,
      },
    });
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners('keyboardDidShow', this.keyboardDidShow);
    Keyboard.removeAllListeners('keyboardDidHide', this.keyboardDidHide);
  }

  keyboardDidShow = () => {
    this.setState({ height: 50 });
  };
  keyboardDidHide = () => {
    this.setState({ height: 150 });
  };

  next() {
    this.setState({ step: this.state.step + 1 });
  }

  back() {
    this.setState({ step: this.state.step - 1 });
  }

  async hideForm() {
    await Promise.all([this.containerRef.fadeOut(400)]);
    if (this.signupRef) {
      await this.signupRef.fadeOut(300);
    }
  }

  onSubmit() {
    console.log(this.state.values);
    this.props.handleSignup(this.state.values);
  }

  componentDidUpdate() {
    if (this.props.signupFailure) {
      this.props.resetForm();
    }
    if (this.props.signupSuccess) {
      this.props.onLoginPress();
      this.props.resetForm();
      this.state = this.initialState;
    }
  }

  render() {
    const { validationSchema, step, values } = this.state;
    const {
      signupSuccess,
      signupFailure,
      signupError,
      verifying,
      onLoginPress,
    } = this.props;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <Animatable.View
          style={styles.container}
          ref={(ref) => (this.containerRef = ref)}
        >
          <Formik
            initialValues={values}
            onSubmit={() => {
              this.onSubmit();
            }}
            validationSchema={validationSchema[step]}
          >
            {(formikProps) => (
              <>
                <Animatable.Image
                  source={require('../../assets/images/signup.png')}
                  animation={'fadeIn'}
                  duration={300}
                  tintColor={'#2C85DE'}
                  resizeMode="contain"
                  style={{
                    height: this.state.height,
                    width: this.state.height,
                    alignSelf: 'center',
                    marginTop: metrics.DEVICE_HEIGHT * 0.12,
                  }}
                />
                <Animatable.View
                  animation={'fadeIn'}
                  duration={300}
                  delay={400}
                  style={styles.inputContainer}
                >
                  {step == 0 && (
                    <>
                      <StyledInput
                        label="Email"
                        formikProps={formikProps}
                        formikKey="email"
                        placeholder="ab12@cornell.edu"
                        iconName="mail"
                        onChange={(e) => this.handleChange(e, 'email')}
                        value={this.state.values.email}
                        editable={!verifying}
                      />

                      <StyledInput
                        label="Password"
                        formikProps={formikProps}
                        formikKey="password"
                        placeholder="Password"
                        iconName="lock"
                        onChange={(e) => this.handleChange(e, 'password')}
                        value={this.state.values.password}
                        secureTextEntry
                        editable={!verifying}
                      />

                      <StyledInput
                        label="ConfirmPassword"
                        formikProps={formikProps}
                        formikKey="confirmPassword"
                        placeholder="Confirm Password"
                        iconName="lock"
                        onChange={(e) =>
                          this.handleChange(e, 'confirmPassword')
                        }
                        value={this.state.values.confirmPassword}
                        secureTextEntry
                        editable={!verifying}
                      />
                    </>
                  )}
                  {step == 1 && (
                    <>
                      <StyledInput
                        label="Username"
                        formikProps={formikProps}
                        formikKey="username"
                        placeholder="Username"
                        iconName="user"
                        onChange={(e) => this.handleChange(e, 'username')}
                        value={this.state.values.username}
                        editable={!verifying}
                      />

                      <StyledInput
                        label="Full Name"
                        formikProps={formikProps}
                        formikKey="name"
                        placeholder="Full Name"
                        iconName="idcard"
                        onChange={(e) => this.handleChange(e, 'name')}
                        value={this.state.values.name}
                        editable={!verifying}
                      />

                      <StyledInput
                        label="Phone Number"
                        formikProps={formikProps}
                        formikKey="phone"
                        placeholder="Phone Number"
                        iconName="phone"
                        onChange={(e) => this.handleChange(e, 'phone')}
                        value={this.state.values.phone}
                        editable={!verifying}
                      />
                    </>
                  )}
                  {step == 2 && (
                    <>
                      <StyledInput
                        label="Year"
                        formikProps={formikProps}
                        formikKey="year"
                        placeholder="Graduation Year"
                        iconName="calendar"
                        onChange={(e) => this.handleChange(e, 'year')}
                        value={this.state.values.year}
                        editable={!verifying}
                      />

                      <StyledInput
                        label="Major"
                        formikProps={formikProps}
                        formikKey="major"
                        placeholder="Major"
                        iconName="book"
                        onChange={(e) => this.handleChange(e, 'major')}
                        value={this.state.values.major}
                        editable={!verifying}
                      />

                      {/* <StyledInput
                        label="Address"
                        formikProps={formikProps}
                        formikKey="address"
                        placeholder="Address"
                        iconName="home"
                        onChange={e => this.handleChange(e, "address")}
                        value={this.state.values.address}
                        editable={!verifying}
                      /> */}
                    </>
                  )}
                </Animatable.View>

                <Animatable.View
                  style={styles.arrowContainer}
                  animation={'fadeIn'}
                  duration={300}
                  delay={400}
                >
                  {step > 0 && (
                    <TouchableOpacity
                      style={styles.leftArrow}
                      onPress={() => this.back()}
                    >
                      <Entypo
                        name="arrow-bold-left"
                        size={35}
                        color="#192022"
                      />
                    </TouchableOpacity>
                  )}
                  {step != 2 && (
                    <TouchableOpacity
                      style={styles.rightArrow}
                      onPress={() => this.next()}
                    >
                      <Entypo
                        name="arrow-bold-right"
                        size={35}
                        color="#192022"
                      />
                    </TouchableOpacity>
                  )}
                </Animatable.View>
                {step == 2 && (
                  <Animatable.View
                    style={styles.signupButtonContainer}
                    ref={(ref) => (this.signupRef = ref)}
                  >
                    <Button
                      style={styles.signupButton}
                      onPress={formikProps.handleSubmit}
                      loading={verifying}
                      disabled={verifying}
                    >
                      <Text style={styles.signupButtonText}>Sign Up</Text>
                    </Button>
                    <Text style={styles.termsLink}>
                      By signing up, you agree to our
                      <Text style={{ color: '#2C85DE' }}> Terms </Text>and{' '}
                      <Text style={{ color: '#2C85DE' }}>
                        Conditions of Use
                      </Text>
                    </Text>
                  </Animatable.View>
                )}
                <TouchableOpacity onPress={onLoginPress} disabled={verifying}>
                  <Text style={styles.loginText}>Already have an account?</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <SignupResultMessage
            showMessage={signupSuccess || signupFailure}
            success={signupSuccess}
            error={signupError}
          />
        </Animatable.View>
      </KeyboardAvoidingView>
    );
  }
}

SignupScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    // backgroundColor: "#fff",
    alignItems: 'center',
    marginTop: 30,
  },
  arrowContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    width: '80%',
  },
  leftArrow: { marginRight: 'auto' },
  rightArrow: { marginLeft: 'auto' },
  signupButtonText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
  },
  signupButton: {
    height: 45,
    borderRadius: 30,
    backgroundColor: '#2C85DE',
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH * 0.8,
  },
  signupButtonContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  termsLink: {
    fontFamily: 'montserrat-regular',
    color: '#A9A9A9',
    textAlign: 'center',
  },
  loginText: {
    color: '#2C85DE',
    fontFamily: 'montserrat-regular',
    alignSelf: 'center',
    marginTop: 30,
  },
});
