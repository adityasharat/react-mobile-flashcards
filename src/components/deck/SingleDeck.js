import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class SingleDeck extends React.Component {
    render() {
      const { title, questions } = this.props;
      return (
        <View style={ styles.deck}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>{ title }</Text>
            <Text style={{ fontSize: 18, color: '#666666' }}>{ questions && questions.length } cards</Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
