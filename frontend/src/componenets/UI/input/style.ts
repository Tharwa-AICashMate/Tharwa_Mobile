import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
      },
      label: {
        fontSize: 15,
        fontFamily:Theme.typography.fonts.poppins.medium,
        color:Theme.colors.textLight,
        paddingHorizontal:20,
        paddingVertical:5

      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%'
      },
      input: {
        height: 41,
        backgroundColor:Theme.colors.secondery,
        borderRadius: 18,
        paddingVertical: 10,
        paddingLeft: 30,
        fontSize: 16,
        width:'100%',
        color:Theme.colors.textLight
      },
      iconContainer: {
        position:'absolute',
        right:0,
        paddingHorizontal: 10,
      },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
      },
  });
  
  export default styles