// An em() shortcut function referred from https://medium.com/@elieslama/responsive-design-in-react-native-876ea9cd72a8
// The Ultimate Guide To iPhone Resolutions from https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
export const em = (value: number): number => {
  // Base font size value
  const baseUnit = 16

  return baseUnit * value
}
export default {
  // FONT SIZE
  FONT_SIZE_7: em(0.5),
  FONT_SIZE_8: em(0.525),
  FONT_SIZE_9: em(0.6),
  FONT_SIZE_10: em(0.625),
  FONT_SIZE_12: em(0.75),
  FONT_SIZE_13: em(0.8125),
  FONT_SIZE_14: em(0.875),
  FONT_SIZE_16: em(1),
  FONT_SIZE_18: em(1.125),
  FONT_SIZE_20: em(1.25),
  FONT_SIZE_22: em(1.375),
  FONT_SIZE_24: em(1.5),
  FONT_SIZE_25: em(1.5625),
  FONT_SIZE_26: em(1.625),
  FONT_SIZE_28: em(1.75),
  FONT_SIZE_30: em(1.9),
  FONT_SIZE_32: em(2.0),
  FONT_SIZE_34: em(2.25),
  FONT_SIZE_36: em(2.5),
  FONT_SIZE_38: em(2.75),
  FONT_SIZE_40: em(3)
}
