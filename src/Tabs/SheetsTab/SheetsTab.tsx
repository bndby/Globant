import React, {useCallback} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import {Layer} from '../../components/Layer/Layer';
import {
  EMPTY_STORAGE_VALUE,
  GlobantSheet,
  STORAGE_SHEETS,
} from '../../consts/storage';
import {styles} from './SheetsTab.style';

export const SheetsTab = () => {
  const [sheets, setSheets] = useMMKVString(STORAGE_SHEETS);
  const parsedSheets = JSON.parse(sheets || EMPTY_STORAGE_VALUE);

  const handleClearSheets = useCallback(() => {
    setSheets(EMPTY_STORAGE_VALUE);
  }, [setSheets]);

  return (
    <Layer>
      <Button title="Clear all sheets" onPress={handleClearSheets} />
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>CSV Name</Text>
        <Text style={styles.headingValue}>Total</Text>
      </View>
      <FlatList
        data={parsedSheets}
        keyExtractor={(item: GlobantSheet) => item.id.toString()}
        renderItem={({item}) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemValue}>{item.total}</Text>
          </View>
        )}
      />
    </Layer>
  );
};
