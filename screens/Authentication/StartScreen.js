import React, { Component } from 'react';
import {
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import metrics from '../../config/metrics';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import { connect } from 'react-redux';
import {
  handleSignup,
  resetForm,
  getVerifying,
  getSuccess,
  getFailure,
  getError,
} from '../../reducers/signupReducer';
import {
  updateLoginForm,
  resetLoginForm,
  getLoginVerifying,
  getLoginSuccess,
  getLoginFailure,
} from '../../reducers/loginReducer';
import { Feather } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleForm: null,
      swiper: [
        { page: 1, img: require('../../assets/images/cornell1.jpg') },
        { page: 2, img: require('../../assets/images/cornell2.jpg') },
        { page: 3, img: require('../../assets/images/cornell3.jpg') },
        { page: 4, img: require('../../assets/images/cornell4.jpg') },
        { page: 5, img: require('../../assets/images/cornell5.jpg') },
      ],
    };
  }

  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)

    if (!visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm();
      await this.headerRef.fadeOut(300);
    }

    if (visibleForm && !this.state.visibleForm) {
      await this.headerRef.fadeIn(300);
    }

    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    // 3. Set the new visible form
    this.setState({ visibleForm });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Animatable.View
          style={styles.header}
          ref={(ref) => (this.headerRef = ref)}
        >
          {this.state.visibleForm == 'SIGNUP' && (
            <Animatable.Text
              style={styles.headerName}
              animation={'fadeIn'}
              duration={300}
            >
              New Account
            </Animatable.Text>
          )}
          {this.state.visibleForm && (
            <Feather
              name="x"
              size={25}
              style={styles.closeIcon}
              onPress={() => this._setVisibleForm(null)}
            />
          )}
        </Animatable.View>

        {!this.state.visibleForm && (
          <Swiper
            style={{ width: 300, overflow: 'visible' }}
            showsButtons={true}
            autoplay={true}
          >
            {this.state.swiper.map((o) => (
              <View style={styles.swiperContainer} key={o.page}>
                <Image style={styles.swiperImage} source={o.img} />
                <View style={styles.overlay} />
                <View style={styles.textContainer}>
                  <Text style={styles.firstText}>Hello</Text>
                  <Text style={styles.secondText}>Welcome to Corsell.</Text>
                  <Text style={styles.thirdText}>
                    We created Corsell - an application for students, by
                    students
                  </Text>
                  <Text style={styles.fourText}>{o.page} of 5</Text>
                </View>
              </View>
            ))}
          </Swiper>
        )}

        {!this.state.visibleForm && (
          <Animatable.View
            style={styles.buttonContainer}
            animation={'fadeIn'}
            duration={200}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => this._setVisibleForm('LOGIN')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
        {this.state.visibleForm == 'LOGIN' && (
          <LoginScreen
            ref={(ref) => (this.formRef = ref)}
            onSignupPress={() => this._setVisibleForm('SIGNUP')}
            verifyingLogin={this.props.verifyingLogin}
            loginSuccess={this.props.loginSuccess}
            loginFailure={this.props.loginFailure}
            updateLoginForm={this.props.updateLoginForm}
            resetLoginForm={this.props.resetLoginForm}
            navigateToMain={() => navigate('MainTabNavigator')}
          />
        )}

        {this.state.visibleForm == 'SIGNUP' && (
          <SignupScreen
            ref={(ref) => (this.formRef = ref)}
            onLoginPress={() => this._setVisibleForm('LOGIN')}
            verifying={this.props.verifying}
            signupSuccess={this.props.signupSuccess}
            signupFailure={this.props.signupFailure}
            signupError={this.props.signupError}
            resetForm={this.props.resetForm}
            handleSignup={this.props.handleSignup}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  verifying: getVerifying(store.signupReducer),
  signupSuccess: getSuccess(store.signupReducer),
  signupFailure: getFailure(store.signupReducer),
  signupError: getError(store.signupReducer),
  verifyingLogin: getLoginVerifying(store.loginReducer),
  loginSuccess: getLoginSuccess(store.loginReducer),
  loginFailure: getLoginFailure(store.loginReducer),
});

const mapDispatchToProps = (dispatch) => ({
  resetForm: () => dispatch(resetForm()),
  handleSignup: (payload) => dispatch(handleSignup(payload)),
  updateLoginForm: (payload) => dispatch(updateLoginForm(payload)),
  resetLoginForm: () => dispatch(resetLoginForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);

StartScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  swiperImage: {
    height: '80%',
    borderRadius: 20,
    width: metrics.DEVICE_WIDTH - 80,
    marginBottom: 40,
  },
  overlay: {
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '80%',
    width: metrics.DEVICE_WIDTH - 80,
    top: 40,
    position: 'absolute',
    zIndex: 2,
  },
  textContainer: {
    position: 'absolute',
    height: '80%',
    width: metrics.DEVICE_WIDTH - 80,
    top: 40,
    position: 'absolute',
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  firstText: {
    color: 'black',
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    fontSize: 12,
    marginTop: 45,
  },
  secondText: {
    color: '#fff',
    fontFamily: 'montserrat-black',
    fontSize: 35,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  thirdText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 165,
  },
  fourText: {
    color: 'black',
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    fontSize: 12,
    marginTop: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: '#2C85DE',
    bottom: 10,
    height: 50,
    alignItems: 'center',
    width: '60%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'montserrat-black',
    fontSize: 20,
  },
  header: {
    height: metrics.DEVICE_HEIGHT * 0.12,
    width: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 5,
  },
  headerName: {
    position: 'absolute',
    bottom: 10,
    fontFamily: 'montserrat-black',
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
});
