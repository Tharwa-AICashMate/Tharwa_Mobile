import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden', 
    backgroundColor: '#424242', 
    marginHorizontal: 16, 
  },
  fill: {
    backgroundColor: '#424242',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  empty: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },   


  percentageText: {
    color: Theme.colors.background,
    fontWeight: 'bold',
  },
  amountText: {
    color: Theme.colors.text,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
export default styles