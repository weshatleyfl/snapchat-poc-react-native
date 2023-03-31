import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Text,
  View,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import { IC_BACK } from '@utils/Icons';

import HeaderBack from '@shared/HeaderBack';
import { ratio, colors, statusBarHeight } from '@utils/Styles';
import { getString } from '@STRINGS';

import Button from '@shared/Button';
import ChatListItem from '@shared/ChatListItem';
import EmptyListItem from '@shared/EmptyListItem';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: statusBarHeight, // false to get height of android too.

    flexDirection: 'column',
    alignItems: 'center',

  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',

    flexDirection: 'column',
    alignItems: 'center',
  },
  viewChat: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: colors.paleGray,
    height: 52 * ratio,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputChat: {
    width: '80%',
    fontSize: 14 * ratio,
    marginRight: 20 * ratio,
    paddingLeft: 20 * ratio,
  },
  btnSend: {
    right: 8 * ratio,
    backgroundColor: colors.dodgerBlue,
    borderRadius: 4 * ratio,
    width: 60 * ratio,
    height: 36 * ratio,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSend: {
    fontSize: 14 * ratio,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 5 * ratio,
    paddingVertical: 10 * ratio,
  },
});

class Screen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      chats: [
        {
          id: '0',
          sender: '0',
          img: null,
          message: 'hello',
          date: new Date(),
          isPeer: true,
        },
        {
          id: '1',
          sender: '1',
          img: null,
          message: 'hello',
          date: new Date(),
          isPeer: false,
        },
      ],
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <HeaderBack
          imgSrc={IC_BACK}
          onBackPressed={this.goBack}
        >{getString('HELLO')}</HeaderBack>
        <KeyboardAvoidingView
          behavior='padding'
          style={ styles.content }
        >
          <FlatList
            contentContainerStyle={[
              {
                flex: 1,
                alignItems: this.state.chats.length === 0 ? 'center' : 'flex-start',
                justifyContent: this.state.chats.length === 0 ? 'center' : 'flex-start',
              },
            ]}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.chats}
            renderItem={this.renderItem}
            ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
          />
          <View
            style={styles.viewChat}
          >
            <TextInput
              style={styles.inputChat}
              placeholder={ getString('WRITE_MESSAGE') }
              placeholderTextColor={ colors.cloudyBlue }
            />
            <Button
              isLoading={this.state.isLoading}
              onPress={this.sendChat}
              style={styles.btnSend}
              textStyle={styles.txtSend}
            >{getString('SEND')}</Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  private renderItem = ({ item }) => {
    return (
      <ChatListItem
        item={item}
      />
    );
  }

  private sendChat = () => {
    console.log('sendChat');
  }
}

export default Screen;
