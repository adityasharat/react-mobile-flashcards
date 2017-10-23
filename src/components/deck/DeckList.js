import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getDecks}  from '../../actions/index';
import { fetchDecks } from '../../util/StorageAPI';
import SingleDeck from './SingleDeck';

class DeckList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(decks => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  renderItem = ({ item }) => (
    <View style={ styles.item }>
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('IndividualDeck', item) }>
        <SingleDeck title={ item.title } questions={ item.questions }/>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={ styles.deck }>
        <FlatList data={ Object.values(this.props.decks).sort((x, y) => x.title > y.title) }
            renderItem={ this.renderItem }
            keyExtractor={ (item, index) => index }/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    height: Dimensions.get('window').height
  },
  item: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: '#ececec'
  }
});

export default connect(mapStateToProps)(DeckList);
