import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
// import spacing from 'material-ui/styles/spacing';
// import zIndex from 'material-ui/styles/zIndex';

// const customSpacing = {
//   iconSize: 24,
//   desktopGutter: 10,
//   desktopGutterMore: 28,
//   desktopGutterLess: 12,
//   desktopGutterMini: 4,
//   desktopKeylineIncrement: 40,
//   desktopDropDownMenuItemHeight: 24,
//   desktopDropDownMenuFontSize: 10,
//   desktopDrawerMenuItemHeight: 24,
//   desktopSubheaderHeight: 24,
//   desktopToolbarHeight: 28,
// };

export default {
  // spacing: customSpacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.indigo700,
    primary2Color: Colors.indigo700,
    primary3Color: Colors.grey600,
    accent1Color: Colors.blueA200,
    accent2Color: Colors.blueA400,
    accent3Color: Colors.blueA100,
    textColor: Colors.darkBlack,
    secondaryTextColor: ColorManipulator.fade(Colors.darkBlack, 0.54),
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.indigo700,
    clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack,
  },
};
