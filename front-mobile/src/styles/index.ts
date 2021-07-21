import { Dimensions, StyleSheet } from "react-native"
import { color } from "react-native-reanimated";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const colors = {
  white: "#FFFFFF",
  lightGray: "#F2F2F2",
  mediumGray: "#9E9E9E",
  borderGray: "#E1E1E1",
  darkGray: "#263238",
  black: "#000000",
  primary: "#407BEE",
  secondary: "#33569B",
  bluePill: "#407BFF61",
  red: "#DF5753"
};

const text = StyleSheet.create({
  regular: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: colors.mediumGray,
  },
  bold: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: colors.darkGray,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.white,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.mediumGray,
  },
  productPrice: {
    fontSize: 30,
    paddingLeft: 5,
    color: colors.primary,
    fontWeight: "bold",
  },
  goBackText: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.darkGray,
    marginHorizontal: 16
  },
  productDetailsName: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.darkGray,
  },
  currencyDetail: {
    fontSize: 24,
    fontWeight: "400",
    color: colors.mediumGray,
  },
  productDetailPrice: {
    fontSize: 42,
    paddingLeft: 5,
    color: colors.primary,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.mediumGray,
  },
  loginTitle: {
    fontSize: 30,
    color: colors.darkGray,
    textTransform: "uppercase",
    marginVertical: 75
  },
  logoutText: {
    color: colors.white,
    fontSize: 16,
  },
  addButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
  },
  deleteText: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    color: colors.red,
  },
  editText: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    color: colors.mediumGray,
  },
  uploadText: {
    textTransform: "uppercase",
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  fileSize: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "300",
    marginVertical: 5
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    color: colors.white,
  },
});

const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "space-around",
  },
  draw: {
    width: 313,
    height: 225,
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  primaryButton: {
    width: 290,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.secondary,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    padding: 20,
  },
  productCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  productDescription: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
  },
  priceContainer: {
    flexDirection: "row",
    margin: 10,
  },
  inputContainer: {
    width: '100%',
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  searchInput: {
    width: "90%",
    height: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderGray,
  },
  productImg: {
    width: 140,
    height: 140,
    margin: 15,
  },

  // Product Details
  detailContainer: {
    padding: 20,
  },
  detailCard: {
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "space-around",
  },
  goBackContainer: {
    width: 290,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  productImageContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.lightGray,
    alignItems: "center",
    borderRadius: 10,
  },
  productImage: {
    width: 220,
    height: 220,
  },
  scrollTextContainer: {
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
  },
  // Login Page
  loginCard: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  form : {
    marginVertical: 10,
  },
  passwordGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 60,
  },
  textInput: {
    width: 290,
    height: 50,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10,
  },
  toggle: {
    margin: -35
  },
});

const nav = StyleSheet.create({
  leftText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
    marginLeft: 20,
  },
  drawer: {
    marginRight: 20,
  },
  options: {
    width: deviceWidth,
    height: 125,
    backgroundColor: colors.primary,
    marginTop: 130,
    marginRight: -20,
    padding: 20,
    justifyContent: "space-between",
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  textOption: {
    fontSize: 18,
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.5)",
  },
  textActive: {
    fontWeight: 'bold',
    color: colors.white,
  },
  logoutBtn: {
    width: 60,
    height: 30,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
});

const tabbar = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 80,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  pill: {
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 30,
  },
  pillActive: {
    backgroundColor: colors.bluePill,
  },
  pillText: {
    fontWeight: 'bold',
    color: colors.mediumGray,
  },
  pillTextActive: {
    color: colors.primary,
  },
})

const admin = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",

  },
  addButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16
  },
  deleteBtn: {
    width: "48%",
    height: 40,
    borderWidth: 1,
    borderColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  editBtn: {
    width: "48%",
    height: 40,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  // Admin Products form
  formContainer: {
    width: deviceWidth,
    padding: 20,
  },
  formCard: {
    width: '100%',
    height: '90%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: "space-around",
  },
  modalContainer: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#00000033",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "93%",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalItem: {
    width: '100%',
    backgroundColor: colors.lightGray,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  formInput: {
    width: '96%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,

  },
  textArea: {
    width: '96%',
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },
  selectInput: {
    width: '96%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  uploadBtn: {
    width: '96%',
    height: 40,
    backgroundColor: colors.mediumGray,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    width: "48%",
    height: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
})

export { colors, theme, text, nav, tabbar, admin }