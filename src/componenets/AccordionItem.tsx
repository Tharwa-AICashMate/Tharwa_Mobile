import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FAQItem } from '../types';
import AntDesign from '@expo/vector-icons/AntDesign';

interface AccordionItemProps {
  item: FAQItem;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const bodyHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], 
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand}>
        <Text style={styles.headerText}>{item.question}</Text>
        {expanded ? (
          <AntDesign name="caretup" size={20} color="black" />
        ) : (
          <AntDesign name="caretdown" size={20} color="black" />
        )}
      </TouchableOpacity>

      <Animated.View style={[styles.body, { height: bodyHeight }]}>
        <Text style={styles.bodyText}>{item.answer}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  body: {
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bodyText: {
    padding: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default AccordionItem;
