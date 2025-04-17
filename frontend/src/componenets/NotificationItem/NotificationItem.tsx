import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './NotificationItem.styles'

interface Props {
  icon: any
  title: string
  subtitle: string
  time: string
  highlightText?: string
}

const NotificationItem: React.FC<Props> = ({ icon, title, subtitle, time, highlightText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {subtitle}{' '}
            {highlightText && <Text style={styles.highlightText}>{highlightText}</Text>}
          </Text>
        </View>
      </View>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.separator} />
    </View>
  )
}

export default NotificationItem
