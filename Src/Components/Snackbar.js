import { colors } from '../Constants';
import Snackbar from 'react-native-snackbar';

export default function (message, error, long) {
  Snackbar.show({
    text: message,
    textColor: colors.white,
    duration: long ? Snackbar.LENGTH_LONG : Snackbar.LENGTH_SHORT,
    backgroundColor: error ? colors.dimGray : colors.royalBlue,
  });
}
