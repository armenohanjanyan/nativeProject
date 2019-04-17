import React from 'react';
import firebase from 'firebase';
import { createStyles, maxHeight, minHeight } from 'react-native-media-queries';
import { Icon } from 'react-native-elements'
import Swiper from "react-native-web-swiper";


import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  WebView,
  ListView,
  Keyboard,
  Alert,
  TouchableOpacity
} from 'react-native';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.scroll = React.createRef();
    this.scrollToEnd = false;
  }
  

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDjQ7blBmHP7xRpoxMhwPcZni1W5UP8nOk",
      authDomain: "native-ad1f1.firebaseapp.com",
      databaseURL: "https://native-ad1f1.firebaseio.com",
      projectId: "native-ad1f1",
      storageBucket: "native-ad1f1.appspot.com",
      messagingSenderId: "470821651171"
    };
    firebase.initializeApp(config);

    firebase.database().ref('comments').on('value', (data) => {
      let arr = Object.values(data.toJSON());
      this.setState({ comments: arr });
    });
    
  }

  componentDidMount() {
  }

  state = {
    comments: [],
    comment: {
      text: '',
      nickName: ''
    },
    user: false,
    userName: '',
    modalVisible: false
  }

  addCommentText = (e) => {
    this.setState({
      comment: {
        text: e,
        nickName: this.state.userName
      }
    })
  }

  addComment = () => {
    const { comments } = this.state;
    const { comment } = this.state;

    if (comment.text !== '') {
      this.setState({
        comments: comments.concat(comment),

      })
      firebase.database().ref('comments/').set({
        ...comments,
        comment
      });

      Keyboard.dismiss()
      this.scrollToEnd = false;
      this.setState({ comment: { text: '', nickName: this.state.userName } })
    }
  }

  setUserName = (event) => {
    this.setState({ userName: event })
  }

  goToComments = () => {
    if (this.state.userName) {
      this.setState({ user: true, comment: { nickName: this.state.userName }});
    }
  }

  render() {
    const { comments } = this.state;
    const { comment } = this.state;
    const { userName } = this.state;
    const { user } = this.state;
    if(user && !this.scrollToEnd) {
      this.scrollToEnd = true;
      setTimeout(() => {
        this.scroll.current.scrollToEnd();
      }, 0)
    }
    return (
      <View style={styles.container}>
        <View style={style.logoContainer}>
          <Image resizeMode="contain" style={style.logo} source={require('./assets/xt.png')} />
        </View>
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
          <ScrollView>
            <View style={style.webWiewContainer}>
              <WebView
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                source={{ uri: "https://player.twitch.tv/?channel=tvxarm" }}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View style={style.bannerContainer}>
              <View style={style.banner}>
                {/* <Image style={style.bannerImage} source={require('./assets/cola.jpg')} /> */}
                <Swiper
                  prevButtonText=""
                  nextButtonText=""
                  activeDotStyle={{ backgroundColor: 'black' }}
                  loop
                  autoplayTimeout={2.5}
                  overRangeButtonsOpacity={0.3}>
                  <View style={[styles.slideContainer, styles.slide1]}>
                    <Image style={style.bannerImage} source={require('./assets/Hovo.jpg')} />
                  </View>
                  <View style={[styles.slideContainer, styles.slide2]}>
                    <Image resizeMode="stretch" style={style.bannerImage} source={require('./assets/pc.jpg')} />
                  </View>
                  <View style={[styles.slideContainer, styles.slide3]}>
                    <Image resizeMode="stretch" style={style.bannerImage} source={require('./assets/silGroup.jpg')} />
                  </View>
                  <View style={[styles.slideContainer, styles.slide3]}>
                    <Image resizeMode="stretch" style={style.bannerImage} source={require('./assets/aeb.png')} />
                  </View>
                  <View style={[styles.slideContainer, styles.slide3]}>
                    <Image resizeMode="stretch" style={style.bannerImage} source={require('./assets/maza.png')} />
                  </View>
                  <View style={[styles.slideContainer, styles.slide3]}>
                    <Image resizeMode="stretch" style={style.bannerImage} source={require('./assets/mall.jpg')} />
                  </View>
                </Swiper>
              </View>
            </View>
            {user ? <View
              snapToEnd
              style={style.commentsContainer}>
              <ScrollView
                      ref={this.scroll}
                      style={{ width: '100%', height: '100%' }}>
                {comments.map((el, i) => i % 2 === 0 ? (
                  <View key={i} style={{ marginBottom: 5, backgroundColor: '#F5F5DC', padding: 10, width: '100%', marginTop: 10, width: '60%', marginStart: '5%', borderRadius: 15 }} key={i}>
                    <Text style={{ fontSize: 11, marginBottom: 4 }}>{el.nickName}</Text>
                    <Text style={{ fontSize: 9 }}>{el.text}</Text>
                  </View>
                ) : (
                    <View key={i} style={{marginBottom: 5, backgroundColor: '#D3D3D3', padding: 10, width: '100%', marginTop: 10, width: '60%', marginStart: '30%', borderRadius: 15, }}>
                      <Text style={{ fontSize: 11, marginBottom: 4 }}>{el.nickName}</Text>
                      <Text style={{ fontSize: 9 }}>{el.text}</Text>
                    </View>
                  ))}
              </ScrollView >
            </View> : <View style={style.logIn}>
                <View style={{
                  width: '100%',
                }}>
                  <View style={{ paddingHorizontal: 30, paddingVertical: 5 }}>
                    <Text style={{ color: 'white', fontSize: 15, width: '100%', paddingTop: 10, textAlign: 'center' }}>
                      Enter Your nickname to join conversation
               </Text>
                    <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
                      <TextInput
                        style={{
                          height: 30,
                          paddingStart: 20,
                          borderRadius: 20,
                          backgroundColor: 'white',
                          width: '100%'
                        }}
                        onChangeText={e => this.setUserName(e)}
                        value={userName}
                      />
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                      height: 50,
                      padding: 5
                    }}>
                      <View style={{ backgroundColor: '#980B0B', borderRadius: 30, height: 60, width: 60, paddingVertical: 10 }}>
                        <Button
                          style={{ fontSize: 7 }}
                          title="Start"
                          color="white"
                          onPress={() => this.goToComments()}
                        />
                      </View>
                    </View>
                  </View>
                </View >
              </View>}
            {user ? <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(e) => this.addCommentText(e)}
                style={styles.input}
                value={comment.text}
              />
              <View style={{ width: '20%', backgroundColor: 'white', height: 40, padding: 2, borderTopColor: '#B4A8A8', borderTopWidth: 1 }}>
                <Icon
                  name='sc-telegram'
                  type='evilicon'
                  color='black'
                  size={40}
                  onPress={() => this.addComment()}
                />
              </View>
            </View> : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

    );
  }
}
const base = {
  logoContainer: {
    height: 60,
    width: '100%',
    backgroundColor: 'rgb(27,28,32)',
    zIndex: 100,
  },
  logo: {
    height: 60,
    zIndex: 102
  },
  logIn: {
    height: 170,
    backgroundColor: 'black',
    marginHorizontal: 20,
  },
  webWiewContainer: {
    height: 310,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  commentsContainer: {
    height: 140,
    backgroundColor: '#DCDCDC',
    marginHorizontal: 20,
  },
  bannerContainer: {
    height: 110,
    width: '100%',
    margin: 'auto',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  banner: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  bannerImage: {
    height: 110,
    width: "70%",
  }
};

const style = createStyles(
  base,

  minHeight(700, {
    logo: {
      height: 70,
      zIndex: 100,
    },
    logoContainer: {
      height: 70,
    },
    logIn: {
      padding: 10,
      paddingVertical: 30,
      height: 220,
    },
    webWiewContainer: {
      height: 380
    },
    commentsContainer: {
      height: 185
    },
    bannerContainer: {
      height: 110,
      width: '100%',
      paddingHorizontal: 20,
      marginBottom: 10
    },
    bannerImage: {
      height: 110,
    }
  }),
  maxHeight(650, {
    webWiewContainer: {
      height: 250
    },
    logoContainer: {
      height: 50,
      zIndex: 100
    },
    logo: {
      height: 50,
    },
  })
)





const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(49, 50, 54)',
    height: '100%'
  },
  inputContainer: {
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    paddingHorizontal: 20,
  },
  input: {
    width: '80%',
    borderTopWidth: 1,
    height: 40,
    backgroundColor: '#ffffff',
    borderTopColor: '#B4A8A8',
    paddingLeft: 15,
    paddingRight: 15,
  },
  contentContainer: {
    paddingVertical: 20
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  slide1: {
    backgroundColor: 'white',
  },
  slide2: {
    backgroundColor: 'white',
  },
  slide3: {
    backgroundColor: 'white',
  },
});