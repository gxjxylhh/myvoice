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
        title: 'Play mp3 sound from Local',
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
    }


     componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "Hello developer",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                        avatar: "https://placeimg.com/140/140/any",
                    },
                },
            ],
        });
    }

     componentWillUnmount() {
     //   sound1.release();
    //  sound2.release();

    }

     onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
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
                            _id: 1,
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
