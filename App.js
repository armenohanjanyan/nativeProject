import React from 'react';
import firebase from 'firebase';
import { createStyles, maxHeight, minHeight } from 'react-native-media-queries';


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
  Keyboard,
  Alert,
  TouchableOpacity
} from 'react-native';


export default class App extends React.Component {

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

    firebase.database().ref('comments').once('value', (data) => {
      let arr = Object.values(data.toJSON());
      this.setState({ comments: arr })
    });
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
      this.setState({comment: {text: '', nickName: this.state.userName}})
    }
  }

  setUserName = (event) => {
    this.setState({ userName: event })
  }

  goToComments = () => {
    if (this.state.userName) {
      this.setState({ user: true, comment: {nickName: this.state.userName } });
    }
  }

  render() {
    const { comments } = this.state;
    const { comment } = this.state;
    const { userName } = this.state;
    const { user } = this.state;
    {console.log('hello')}

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={style.logoContainer}>
          <Image style={style.logo} source={require('./assets/log1.png')} />
        </View>
        <View style={style.webWiewContainer}>
          <WebView
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            source={{ uri: "https://player.twitch.tv/?channel=tvxarm"}}
            style={{ width: '100%', height: '100%'  }}
          />
        </View>
        {user ? <ScrollView style={{
          height: '100%',
          backgroundColor: '#DCDCDC',
          marginHorizontal: 20
        }}>
          <View style={{ width: '100%', height: '100%' }}>
            {comments.map((el, i) => i % 2 === 0 ? (
              <View style={{ backgroundColor: '#DCDCDC', padding: 10, width: '100%', marginTop: 10 }} key={i}>
                <Text style={{ fontSize: 10, textAlign: 'center' }}>{el.nickName}</Text>
                <Text style={{ fontSize: 15 }}>{el.text}</Text>
              </View>
            ) : (
                <View style={{ backgroundColor: '#D3D3D3', padding: 10, width: '100%', marginTop: 10 }}>
                  <Text style={{ fontSize: 10, textAlign: 'center' }}>{el.nickName}</Text>
                  <Text style={{ fontSize: 15 }}>{el.text}</Text>
                </View>
              ))}
          </View >
        </ScrollView> : <ScrollView style={style.logIn}>
            <View style={{
              width: '100%',
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
              }}>
                <Text style={{ color: 'white', fontSize: 20, width: '100%', paddingTop: 20, textAlign: 'center' }}>
                  Enter Your nickname to join conversation
               </Text>
                <View style={{ padding: 30 }}>
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
                  {/* <View style={{ backgroundColor: '#808080' }}>
                    <Button
                      title="Accept"
                      color="white"
                      onPress={() => this.goToComments()}
                    />
                  </View> */}
                     <View style={{ backgroundColor: '#980B0B', borderRadius: 30, height: 60, width: 60, paddingVertical: 10 }}>
                    <Button
                      style={{fontSize: 7}}
                      title="Start"
                      color="white"
                      onPress={() => this.goToComments()}
                    />
                  </View>
                </View>
              </View>
            </View >
          </ScrollView>}
        { user ? <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(e) => this.addCommentText(e)}
            style={styles.input}
            value={comment.text}
          />
          <View style={{ width: '20%', backgroundColor: '#A9A9A9', height: 50, padding: 5 }}>
            <Button
              title="Send"
              color="black"
              onPress={() => this.addComment()}
            />
          </View>
        </View> : null}
      </KeyboardAvoidingView>
    );
  }
}
const base = {
  logo: {
    height: 70,
    width: '100%',
  },
    logIn: {
      height: '100%',
      backgroundColor: 'black',
      marginHorizontal: 20,
  },
  webWiewContainer: {
    height: 350, 
    width: '100%', 
    padding: 20 
  },
  logoContainer: {
    height: 70, 
    width: '100%', 
    backgroundColor: 'white' 
  },
};

const base1 = {
  
}
 
const style = createStyles(
  base,
 
  minHeight(700, {
    logo: {
      height: 35,
      marginTop: 30,
      },
      logIn: {
        padding: 50
      },
      webWiewContainer: {
        height: 400
      }
    }),
    maxHeight(650, {
      webWiewContainer: {
        height: 250
      },
      logoContainer: {
        height: 40,
        paddingTop: 10
      },
      logo: {
        height: 40,
      }
    })
  )

  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(49, 50, 54)',
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
    borderWidth: 1,
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: '#B4A8A8',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nickName: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    paddingHorizontal: 20
  },
});