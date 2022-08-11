import React, {useCallback} from 'react';
import {Button, FlatList, Image, Text, View} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import {Layer} from '../../components/Layer/Layer';
import {
  EMPTY_STORAGE_VALUE,
  GlobantImage,
  STORAGE_IMAGES,
} from '../../consts/storage';
import {styles} from './ImagesTab.style';

export const ImagesTab = () => {
  const [images, setImages] = useMMKVString(STORAGE_IMAGES);
  const imgs = JSON.parse(images || EMPTY_STORAGE_VALUE);

  const handleClearImages = useCallback(() => {
    setImages(EMPTY_STORAGE_VALUE);
  }, [setImages]);

  return (
    <Layer>
      <Button title="Clear all images" onPress={handleClearImages} />
      <View style={styles.gallery}>
        <FlatList
          data={imgs}
          keyExtractor={(item: GlobantImage) => item.id.toString()}
          renderItem={({item}) => (
            <View key={item.id} style={styles.image}>
              <Image
                source={{uri: 'data:image/png;base64,' + item.data}}
                style={{
                  width: item.width,
                  height: item.height,
                }}
              />
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </Layer>
  );
};
