import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class IndividualDeck extends React.Component {
  render() {
    let { title } = this.props.navigation.state.params;
    const questions = this.props.decks[title] && this.props.decks[title].questions;

    return (
      <View style={ styles.container }>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 36 }}>{title}</Text>
          <Text style={{ fontSize: 22, marginTop: 12 }}>{questions.length} cards</Text>
        </View>
        <TouchableOpacity style={ styles.addCard } onPress={ () => {
            this.props.navigation.navigate('NewQuestion', {
              title,
              questions,
            });
          }}>
          <Text style={ styles.addCardTitle }>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.startQuiz } onPress={ () => {
            this.props.navigation.navigate('Quiz', {
              title,
              questions,
            });
          }}>
          <Text style={ styles.startQuizTitle }>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  addCard: {
    backgroundColor: '#007bff',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 4,
    marginTop: 16,
    padding: 8
  },
  startQuiz: {
    backgroundColor: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 4,
    marginTop: 16,
    padding: 8
  },
  addCardTitle: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  startQuizTitle: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  }
});

function mapStateToProps(state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps)(IndividualDeck);
