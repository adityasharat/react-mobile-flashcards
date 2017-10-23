import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { addQuestion } from '../../actions';
import { addQuestionForDeck } from '../../util/StorageAPI';

class NewQuestion extends React.Component {

  state = {
    question: '', answer: ''
  };

  submitQuestion = () => {
    let alert = {};
    const { question, answer } = this.state;
    const { title, questions } = this.props.navigation.state.params;

    if (question === '') {
      Alert.alert('Mandatory', 'Question cannot be empty');
      return;
    }
    if (answer === '') {
      Alert.alert('Mandatory', 'Answer cannot be empty');
      return;
    }

    const params = { title, questions, question, answer };

    this.props.dispatch(addQuestion(params));

    addQuestionForDeck({
      card: { question, answer },
      deckName: title
    });

    Alert.alert('Successful', 'Question Added Successfully',
      [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]
    );
  };

  render() {
    const {question, answer} = this.state;

    return (
        <View style={style.container}>
          <Text>Enter the question</Text>
          <TextInput defaultValue="Question" value={ question } style={ style.input }
            onChangeText={ question => this.setState({ question }) }/>
          <Text style={{ marginTop: 20 }}>Enter the answer</Text>
          <TextInput defaultValue="Answer" value={ answer } style={ style.input }
            onChangeText={ answer => this.setState({ answer }) }/>
          <TouchableOpacity onPress={ this.submitQuestion } style={ style.submitButton }>
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
    paddingTop: 20,
  },
  input: {
    width: 300,
    marginTop: 8,
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

export default connect(mapStateToProps)(NewQuestion);
