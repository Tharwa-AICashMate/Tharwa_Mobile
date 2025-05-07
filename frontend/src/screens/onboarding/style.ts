import Theme from "@/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen');


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Theme.colors.primary,
  },
  slideContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-between'
  },
  slide: {
    height:"65%",
    alignItems:'center',    
    justifyContent:'center',
    backgroundColor :Theme.colors.background,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    overflow:'hidden'
  },
  title: {
    textAlign:'center',
    maxWidth:300,
    marginTop:60,
    color: Theme.colors.textDark,
    fontFamily:Theme.typography.fonts.poppins.semiBold,
    fontSize:20
  },
  imageContainer:{
      height:250,
      width:width,
      alignItems:'center'
  },
  imageBackground: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#f1f1f1',
    borderRadius:"50%",
    width:250,
    height:250,
    marginBottom:50
  },
  image: {
    width: 290,
    height: 290,
    resizeMode: 'contain',
  },
  
  scroll:{
    height:280
  },

  nextButtonText: {
    color: Theme.colors.textDark,
    fontFamily:Theme.typography.fonts.poppins.semiBold,
    fontSize:30,
    textAlign: "center",


  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 13,
    height: 13,
    borderRadius: "50%",
    borderWidth:2,
    borderColor:Theme.colors.textDark,
    backgroundColor: Theme.colors.background,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    borderWidth:0,
    backgroundColor: '#FFCE3A',
  },
});

export default styles;
