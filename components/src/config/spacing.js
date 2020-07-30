/**
* @providesModule Spacing
*/
import { StyleSheet, Platform } from 'react-native';
import constants from 'Constants';
import colors from 'Colors';
let defaultSpacer = constants.defaultSpacer;
let positions = ['Top', 'Right', 'Left', 'Bottom'];
const spacing = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: constants.viewPadding,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    height: constants.viewHeight
  },
  scrollContainer: {
    backgroundColor: colors.white,
    flex: 0,
    minHeight: constants.viewHeight
  },
  viewPadding: {
    padding: constants.viewPadding
  },
  viewPaddingHorizontal: {
    paddingLeft: constants.viewPadding,
    paddingRight: constants.viewPadding
  },
  viewPaddingVertical: {
    paddingTop: constants.viewPadding,
    paddingBottom: constants.viewPadding
  }
});
positions.forEach((position) => {
  var paddingString = ('padding' + position)
  var marginString = ('margin' + position)
spacing['addPadding' + position] = {
    [paddingString]: defaultSpacer
  }
  spacing['addMargin' + position] = {
    [marginString]: defaultSpacer
  }
});
export default spacing;