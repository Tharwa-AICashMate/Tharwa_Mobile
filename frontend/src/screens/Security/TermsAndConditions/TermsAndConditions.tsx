import React, { useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  GestureResponderEvent,
} from 'react-native';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import styles from './TermsAndConditions.styles';


const TermsAndConditions: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleAccept = () => {
    console.log('Terms accepted:', isChecked);
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  };

  const paragraphs: Record<string, string[]> = {
    p1: [
      'Lorem  ipsum  dolor  sit  amet.  Et  odio  officia  aut',
      'voluptate internos est omnis vitae ut architecto sunt',
      'non tenetur fuga ut provident vero. Quo asperiores',
      'facere et consectetur ipsum et facere corrupti est',
      'asperiores   facere.   Est   fugiat   assumenda   aut',
      'reprehenderit voluptatem sed.',
    ],
    p2: [
      'Aut quidam possimus cum alias autem cum officiis',
      'placeat et omnis autem id officia perspiciatis qui',
      'corrupti officia eum aliquam provident. Eum voluptas',
      'error et optio dolorum cum molestiae nobis et odit',
      'molestiae quas magnam impedit sed fugiat nihil non',
      'nihil vitae.',
    ],
    p3: [
      'Vel exercitationem quam vel eligendi rerum. At harum',
      'accusantium et nostrum beatae to accusantium dolores',
      'qui rerum aliquam est perferendis mollitia est ipsum',
      'ipsci qui anim autem. At corporis sunt. Aut odit',
      'quisquam est reprehenderit itaque aut accusantium',
      'dolor qui neque repellat.',
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title="Terms And Conditions" />
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Est Fugiat Assumenda Aut Reprehenderit</Text>

          <View style={styles.paragraphContainer}>
            {paragraphs.p1.map((line, index) => (
              <Text key={`p1-${index}`} style={styles.fixedWidthText}>
                {line}
              </Text>
            ))}
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.listItem}>1. Ea voluptates omnis aut sequi sequi.</Text>
            <Text style={styles.listItem}>
              2. Est dolore quae in aliquid ducimus et autem repellendus.
            </Text>
            <Text style={styles.listItem}>
              3. Aut ipsum. Quis qui porro quasi aut minus placeat!
            </Text>
            <Text style={styles.listItem}>4. Sit consequatur neque ab vitae facere.</Text>
          </View>

          <View style={styles.paragraphContainer}>
            {paragraphs.p2.map((line, index) => (
              <Text key={`p2-${index}`} style={styles.fixedWidthText}>
                {line}
              </Text>
            ))}
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              • Aut fuga sequi eum voluptatibus provident.
            </Text>
            <Text style={styles.listItem}>
              • Eos consequatur voluptas vel amet expedita aut dignissimos velit.
            </Text>
          </View>

          <View style={styles.paragraphContainer}>
            {paragraphs.p3.map((line, index) => (
              <Text key={`p3-${index}`} style={styles.fixedWidthText}>
                {line}
              </Text>
            ))}
          </View>

          <Text style={styles.readMoreText}>
            Read the terms and conditions in more detail at{' '}
            <Text style={styles.link} onPress={() => openUrl('https://www.finwiseapp.de')}>
              www.finwiseapp.de
            </Text>
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>I accept all the terms and conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.acceptButton, !isChecked && styles.acceptButtonDisabled]}
            onPress={handleAccept}
            disabled={!isChecked}
          >
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TermsAndConditions;
