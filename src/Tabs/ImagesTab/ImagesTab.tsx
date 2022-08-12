import React, {useCallback} from 'react';
import {Button, View} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import {Gallery} from '../../components/Gallery/Gallery';
import {Layer} from '../../components/Layer/Layer';
import {EMPTY_STORAGE_VALUE, STORAGE_IMAGES} from '../../consts/storage';
import {styles} from './ImagesTab.style';

export const ImagesTab = () => {
  const [images, setImages] = useMMKVString(STORAGE_IMAGES);
  const parsedImages = JSON.parse(images || EMPTY_STORAGE_VALUE);

  const handleClearImages = useCallback(() => {
    setImages(EMPTY_STORAGE_VALUE);
  }, [setImages]);

  return (
    <Layer>
      <Button title="Clear all images" onPress={handleClearImages} />
      <View style={styles.gallery}>
        <Gallery images={parsedImages} />
      </View>
    </Layer>
  );
};
