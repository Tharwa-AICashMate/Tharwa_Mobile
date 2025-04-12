import React from 'react'
import { View, Text, StyleSheet, Alert, Image, StatusBar } from 'react-native'
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle'
import UpdateButton from '@/componenets/Button/Button'
import Theme from '@/theme'

type Fingerprint = {
  id: string
  name: string
}

type FingerprintDetailsProps = {
  route: {
    params: {
      fingerprint: Fingerprint
      deleteFingerprint: (id: string) => void
    }
  }
  navigation: {
    navigate: (screen: string) => void
    goBack: () => void
  }
}

const FingerprintDetails: React.FC<FingerprintDetailsProps> = ({ route, navigation }) => {
  const { fingerprint } = route.params

  const handleDelete = () => {
    Alert.alert(
      'Delete Fingerprint',
      `Are you sure you want to delete "${fingerprint.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            route.params.deleteFingerprint(fingerprint.id)
            navigation.navigate('GreenScreenFP')
          },
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.highlight} translucent={false} />

      <Header title={fingerprint.name} />

      <View style={styles.contentBox}>
        <View style={styles.fingerprintContainer}>
          <Image
            source={require('../../assets/Component.png')}
            style={{ width: 120, height: 120, marginTop: 80 }}
            resizeMode="contain"
          />
          <Text style={styles.fingerprintName}>{fingerprint.name}</Text>
        </View>

        <UpdateButton title="Delete" onPress={handleDelete} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  contentBox: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  fingerprintContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  fingerprintName: {
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 20,
    marginTop: 40,
    color: '#000',
    backgroundColor: '#DFF7E2',
    paddingVertical: 4,
    paddingHorizontal: 50,
  },
})

export default FingerprintDetails
