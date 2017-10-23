import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { createDeck } from '../../util/StorageAPI';
import { addDeck } from '../../actions/index';

class AddDeck extends React.Component {
  componentWillMount() {
    this.setState({
      text: ''
    });
  }

  addNewDeck = () => {
    const entry = this.state;
    const { decks } = this.props;

    if (!entry.text) {
      Alert.alert('Mandatory', 'Deck Name cannot be empty');
    } else {
      if (decks[entry.text]) {
        Alert.alert('Error!', 'Deck Already exists');
      } else {
        const newDeck = { [entry.text]: { title: entry.text, questions: [] } };
        this.props.dispatch(addDeck(newDeck));
        createDeck(newDeck);
        Alert.alert('Successful', 'Deck Added', [{
          text: 'OK', onPress: () => this.props.navigation.navigate('IndividualDeck', {
            title: entry.text,
            questions: []
          })
        }]);

        this.setState({ text: '' });
      }
    }
  };

    render() {
      return (
        <View style={ style.container }>
          <Text style={ style.label }>Enter a title for this deck ?</Text>
          <TextInput style={ style.input } value={ this.state.text } onChangeText={ text => this.setState({ text }) }/>
          <TouchableOpacity onPress={ this.addNewDeck } style={ style.submitButton }>
            <Text style={ style.submitText }>Save</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 16
  },
  label: {
    fontSize: 20
  },
  input: {
    width: 300,
    marginTop: 20,
    padding: 4
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 4,
    marginTop: 16,
    padding: 8
  },
  submitText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

export default connect(mapStateToProps)(AddDeck);
