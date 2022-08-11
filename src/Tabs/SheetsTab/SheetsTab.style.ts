import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  heading: {marginBottom: 10, flexDirection: 'row'},
  headingTitle: {flex: 2, fontWeight: 'bold'},
  headingValue: {flex: 1, fontWeight: 'bold'},
  item: {
    marginTop: 10,
    paddingTop: 10,
    flexDirection: 'row',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  itemTitle: {flex: 2},
  itemValue: {flex: 1},
});
