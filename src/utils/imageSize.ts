import {Dimensions, Image} from 'react-native';

const PADDINGS = 30;

export const getImageSize = (path: string) => {
  return new Promise<{width: number; height: number}>((resolve, reject) => {
    Image.getSize(
      path,
      (w, h) => {
        const s = w / (Dimensions.get('window').width - PADDINGS);
        const scale = s > 1 ? s : 1;
        resolve({
          width: Math.trunc(w / scale),
          height: Math.trunc(h / scale),
        });
      },
      err => {
        console.log(err);
        reject({width: 0, height: 0});
      },
    );
  });
};
