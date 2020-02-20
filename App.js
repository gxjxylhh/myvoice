//Example to play music in React Native
import React, {Component} from 'react';
//Import React
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    SafeAreaView,
} from 'react-native';
//Import basic elements we need from React Native
import Sound from 'react-native-sound';
//Import library for Sound Component

import {GiftedChat} from 'react-native-gifted-chat'


const audioList = [
    {
        title: 'Play my song from Local',
        isRequire: true,
        url: require('./music.mp3'),
    },
];

var sound1, sound2, sound3, sound4, sound5, sound6;

function playSound(item, index) {
    if (index == 0) {
        sound1 = new Sound(item.url, (error, sound) => {
            if (error) {
                alert('error' + error.message);
                return;
            }
            //make sure that only 1 sound will be playing at a time
            //below should be copied to other sound files when they will be played
            if (global.sound) global.sound.stop();
            global.sound = sound1;
            sound1.play(success => {
                console.log('Playing')
            });
        });
    }
// else if (index == 1) {
//    sound2 = new Sound(item.url, '', (error, sound) => {
//      if (error) {
//        alert('error' + error.message);
//        return;
//      }
//      sound2.play(() => {
//        sound2.release();
//      });
//    });
//  }
}

function stopSound(item, index) {
    if (index == 0 && sound1) {
        sound1.stop(() => {
            console.log('Stop');
        });
    }
// else if (index == 1 && sound2) {
//    sound2.stop(() => {
//      console.log('Stop');
//    });
//  }
}


class App extends Component {




    constructor(props) {
        super(props);
        Sound.setCategory('Playback', true); // true = mixWithOthers
        this.state = {
            tests: {},
            messages:[],
        };
        this.handleMessage = this.handleMessage.bind(this);
        this.sendBotResponse = this.sendBotResponse.bind(this);

    }

//    used to be componentWillMmount
//Move code with side effects to componentDidMount, and set initial state in the constructor.

     componentDidMount() {
        this.setState({
            messages: [
                    {
                      _id: 1,
                      text: `Hi! I am 🤖 from Ricky\'s mind.\n\nHow may I help you with today?`,
                      createdAt: new Date(),
                      user: {
                              _id: 2,
                              name: 'FAQ Bot',
                              avatar: 'https://placeimg.com/140/140/any'
                            },
                    },
            ],
        });
        //console.log("im doing another time");
    }

     componentWillUnmount() {
     //   sound1.release();
    //  sound2.release();

    }

     onSend(messages = []) {
     //realize that it's another client inputting, so what to do next?
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        let message = messages[0].text;
        //do something about message in another func
        this.handleMessage(message);

    }

    handleMessage(message){
        //if this then doing that
        //do sth about message then respond to user
        message = "Hi, reply feature is still under development, plz wait patiently~"
        this.sendBotResponse(message)
    }

    sendBotResponse(message){
        let msg = {
            _id : Math.round(Math.random() * 1000000),
            text: message,
            createdAt: new Date(),
            user: {
                    _id: 2,
                    name: 'FAQ Bot',
                    avatar: 'https://placeimg.com/140/140/any'
                  },

        };
        this.setState(previousState => ({
             messages: GiftedChat.append(previousState.messages, [msg]),
         }));
    }


    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>
                        Gift for you
                    </Text>
                    <ScrollView style={styles.container}>
                        {audioList.map((item, index) => {
                            return (
                                <View style={styles.feature} key={item.title}>
                                    <Text style={{flex: 1, fontSize: 14}}>{item.title}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            return playSound(item, index);
                                        }}>
                                        <Text style={styles.buttonPlay}>Play</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            return stopSound(item, index);
                                        }}>
                                        <Text style={styles.buttonStop}>Stop</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>

                    <GiftedChat
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1
                        }}
                    />


                </View>


            </SafeAreaView>


        );
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(00,00,80,1)',
    },
    buttonPlay: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'rgba(00,80,00,1)',
        borderWidth: 1,
        borderColor: 'rgba(80,80,80,0.5)',
        overflow: 'hidden',
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    buttonStop: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'rgba(80,00,00,1)',
        borderWidth: 1,
        borderColor: 'rgba(80,80,80,0.5)',
        overflow: 'hidden',
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    feature: {
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgb(180,180,180)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)',
    },
});
