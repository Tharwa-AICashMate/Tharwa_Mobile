import React from 'react'
import { StatusBar, View, Text } from 'react-native'
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle'
import styles from './Notification.styles'
import Theme from '@/theme'
import NotificationItem from '@/componenets/NotificationItem/NotificationItem'
import { ScrollView } from 'react-native-gesture-handler'

const notifications = [
  {
    icon: require('../../../assets/reminder-icon.png'),
    title: 'Reminder!',
    subtitle: 'Set up your automatic savings to meet your savings goal…',
    time: '2025-04-17T17:00:00', 
  },
  {
    icon: require('../../../assets/update-icon.png'),
    title: 'New Update',
    subtitle: 'Set up your automatic savings to meet your savings goal…',
    time: '2025-04-17T20:30:00', 
  },
  {
    icon: require('../../../assets/transaction-icon.png'),
    title: 'Transactions',
    subtitle: 'A new transaction has been registered',
    highlightText: 'Groceries | Pantry | -$100,00',
    time: '2025-04-16T15:20:00', 
  },
  {
    icon: require('../../../assets/reminder-icon.png'),
    title: 'Reminder!',
    subtitle: 'Set up your automatic savings to meet your savings goal…',
    time: '2025-04-16T09:10:00', 
  },
  {
    icon: require('../../../assets/expense-icon.png'),
    title: 'Expense Record',
    subtitle: 'We recommend that you be more attentive to your finances.',
    time: '2025-04-15T13:45:00', 
  },
  {
    icon: require('../../../assets/transaction-icon.png'),
    title: 'Transactions',
    subtitle: 'A new transaction has been registered',
    highlightText: 'Food | Dinner | -$70,40',
    time: '2025-04-10T17:00:00', 
  },
]


const categorizeNotification = (date: Date) => {
  const now = new Date()
  const today = new Date(now)
  const yesterday = new Date(now)
  today.setHours(0, 0, 0, 0)
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  if (date >= today) return 'Today'
  if (date >= yesterday) return 'Yesterday'

  const thisWeekStart = new Date(now)
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay())
  thisWeekStart.setHours(0, 0, 0, 0)

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  if (date >= thisWeekStart) return 'This Week'
  if (date >= thisMonthStart) return 'This Month'
  return 'Earlier'
}

export default function Notification() {
  const grouped = notifications.reduce((acc, item) => {
    const category = categorizeNotification(new Date(item.time))
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, typeof notifications>)

  const sectionOrder = ['Today', 'Yesterday', 'This Week', 'This Month', 'Earlier']

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title="Notifications" />
      <ScrollView>
        <View style={styles.contentBox}>
          <View style={styles.contentcontainer}>
            {sectionOrder.map((section) =>
              grouped[section]?.length ? (
                <View key={section}>
                  <Text style={{ fontSize: 14, marginBottom: 10, color: Theme.colors.text,marginLeft:5 }}>
                    {section}
                  </Text>
                  {grouped[section].map((item, index) => (
                    <NotificationItem
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      subtitle={item.subtitle}
                      time={
                        new Date(item.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) +
                        ' – ' +
                        new Date(item.time).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
                      }
                       highlightText={item.highlightText}
                    />
                  ))}
                </View>
              ) : null
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
