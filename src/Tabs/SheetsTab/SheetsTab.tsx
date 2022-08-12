import React, {useCallback} from 'react';
import {Button} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import {Layer} from '../../components/Layer/Layer';
import {SheetGrid} from '../../components/SheetGrid/SheetGrid';
import {EMPTY_STORAGE_VALUE, STORAGE_SHEETS} from '../../consts/storage';

export const SheetsTab = () => {
  const [sheets, setSheets] = useMMKVString(STORAGE_SHEETS);
  const parsedSheets = JSON.parse(sheets || EMPTY_STORAGE_VALUE);

  const handleClearSheets = useCallback(() => {
    setSheets(EMPTY_STORAGE_VALUE);
  }, [setSheets]);

  return (
    <Layer>
      <Button title="Clear all sheets" onPress={handleClearSheets} />
      <SheetGrid sheets={parsedSheets} />
    </Layer>
  );
};
