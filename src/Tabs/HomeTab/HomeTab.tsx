import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, Text, View} from 'react-native';
import {Layer} from '../../components/Layer/Layer';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {getImageSize} from '../../utils/imageSize';
import {useMMKVString} from 'react-native-mmkv';
import {
  EMPTY_STORAGE_VALUE,
  FILE_PREFIX,
  FILE_WRONG_PREFIX,
  IMAGE_ENCODING,
  IMAGE_MIMETYPES,
  SHEET_ENCODING,
  SHEET_HEADER,
  SHEET_MIMETYPES,
  STORAGE_IMAGES,
  STORAGE_SHEETS,
  PickedType,
  IMAGE_PREFIX,
} from '../../consts/storage';
import {getCSVDelimiter} from '../../utils/csvDelimiter';
import {ValueOf} from '../../utils/valueof';
import {styles} from './HomeTab.style';

export const HomeTab = () => {
  const [pickedDoc, setPickedDoc] = useState<
    DocumentPickerResponse | undefined | null
  >();
  const [pickedType, setPickedType] = useState<ValueOf<typeof PickedType>>(
    PickedType.None,
  );
  const [fileData, setFileData] = useState('');

  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [sheetTotal, setSheetTotal] = useState(0);

  const [stateMessage, setStateMessage] = useState(
    'Press button to pick document.',
  );

  // Storages
  const [images, setImages] = useMMKVString(STORAGE_IMAGES);
  const [sheets, setSheets] = useMMKVString(STORAGE_SHEETS);

  /**
   * Read and store image
   * @param {string} path path to image
   */
  const readImageFile = useCallback(
    async (path: string) => {
      try {
        setStateMessage('Start reading image...');
        const response = await RNFS.readFile(path, IMAGE_ENCODING);
        setFileData(response); //set the value of response to the fileData Hook.
        const {width, height} = await getImageSize(path);
        setImageSize({width, height});
        setImages(
          JSON.stringify([
            ...JSON.parse(images || EMPTY_STORAGE_VALUE),
            {
              id: Date.now(),
              data: response,
              name: path.split('/').pop() || '',
              width,
              height,
            },
          ]),
        );
        setStateMessage('Image added to store.');
      } catch (err) {
        setStateMessage('Error when try add image to store.');
      }
    },
    [images, setImages],
  );

  /**
   * Read, parse and store CSV file
   * @param {string} path path to CSV file
   */
  const readSheetFile = useCallback(
    async (path: string) => {
      try {
        setStateMessage('Start reading sheet...');
        const response = await RNFS.readFile(path, SHEET_ENCODING);
        const lines = response.split(getCSVDelimiter(response));
        if (lines[0] !== SHEET_HEADER) {
          setPickedType(PickedType.None);
          setStateMessage('Invalid format of CSV file.');
          return;
        }

        const total = lines
          .splice(1) // Ignore first line with header
          .filter(s => Number.isFinite(Number(s)))
          .reduce((acc, cur) => acc + Number(cur), 0);

        setSheetTotal(total);

        const newSheet = {
          id: Date.now(),
          data: response,
          name: path.split('/').pop() || '',
          total,
        };

        setSheets(
          JSON.stringify([
            ...JSON.parse(sheets || EMPTY_STORAGE_VALUE),
            newSheet,
          ]),
        );
        setStateMessage('Sheet added to store.');
      } catch (err) {
        setStateMessage('Error when try add sheet to store.');
      }
    },
    [sheets, setSheets],
  );

  /**
   * Processing picked file
   */
  useEffect(() => {
    if (!pickedDoc || !pickedDoc.fileCopyUri) {
      return;
    }

    setStateMessage('Start processing...');

    if (IMAGE_MIMETYPES.includes(String(pickedDoc.type))) {
      readImageFile(
        FILE_PREFIX + pickedDoc.fileCopyUri.replace(FILE_WRONG_PREFIX, ''),
      );
      setPickedType(PickedType.Image);
    }

    if (SHEET_MIMETYPES.includes(String(pickedDoc.type))) {
      readSheetFile(
        FILE_PREFIX + pickedDoc.fileCopyUri.replace(FILE_WRONG_PREFIX, ''),
      );
      setPickedType(PickedType.Sheet);
    }

    setPickedDoc(null);
  }, [pickedDoc, readImageFile, readSheetFile]);

  /**
   * Pick image from device
   */
  const handlePick = useCallback(async () => {
    try {
      setStateMessage('Picking document...');
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [...IMAGE_MIMETYPES, ...SHEET_MIMETYPES],
      });
      setPickedDoc(pickerResult);
      setStateMessage('Document picked.');
    } catch (err) {
      setStateMessage('Document not picked.');
    }
  }, []);

  /**
   * Render
   */
  return (
    <Layer>
      <Button title="Pick image or sheet" onPress={handlePick} />
      <View style={styles.preview}>
        {pickedType !== PickedType.None && (
          <>
            {pickedType === PickedType.Image && (
              <Image
                source={{uri: IMAGE_PREFIX + fileData}}
                style={{
                  width: imageSize.width,
                  height: imageSize.height,
                }}
              />
            )}
            {pickedType === PickedType.Sheet && (
              <View style={styles.sheetPreview}>
                <Text style={styles.sheetHeading}>Total</Text>
                <Text style={styles.sheetValue}>{sheetTotal}</Text>
              </View>
            )}
          </>
        )}
      </View>
      <View>
        <Text>{stateMessage}</Text>
      </View>
    </Layer>
  );
};
