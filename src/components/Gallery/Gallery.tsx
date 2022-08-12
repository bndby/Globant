import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {GlobantImage} from '../../consts/storage';
import {styles} from './Gallery.style';

export type GalleryProps = {
  images: GlobantImage[];
};

export const Gallery = ({images}: GalleryProps) => {
  return (
    <FlatList
      data={images}
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
  );
};
