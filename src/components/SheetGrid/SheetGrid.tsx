import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {GlobantSheet} from '../../consts/storage';
import {styles} from './SheetGrid.style';

export type SheetGridProps = {
  sheets: GlobantSheet[];
};

export const SheetGrid = ({sheets}: SheetGridProps) => {
  return (
    <>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>CSV Name</Text>
        <Text style={styles.headingValue}>Total</Text>
      </View>
      <FlatList
        data={sheets}
        keyExtractor={(item: GlobantSheet) => item.id.toString()}
        renderItem={({item}) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemValue}>{item.total}</Text>
          </View>
        )}
      />
    </>
  );
};
