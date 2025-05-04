// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { setCategory } from '../redux/slices/helpCenterSlice';

// const CategoryTabs: React.FC = () => {
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state: RootState) => state.helpCenter.selectedCategory);

//   const handleCategoryPress = (category: 'general' | 'account' | 'services') => {
//     dispatch(setCategory(category));
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={[styles.tab, selectedCategory === 'general' && styles.selectedTab]}
//         onPress={() => handleCategoryPress('general')}
//       >
//         <Text style={[styles.tabText, selectedCategory === 'general' && styles.selectedTabText]}>
//           General
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tab, selectedCategory === 'account' && styles.selectedTab]}
//         onPress={() => handleCategoryPress('account')}
//       >
//         <Text style={[styles.tabText, selectedCategory === 'account' && styles.selectedTabText]}>
//           Account
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tab, selectedCategory === 'services' && styles.selectedTab]}
//         onPress={() => handleCategoryPress('services')}
//       >
//         <Text style={[styles.tabText, selectedCategory === 'services' && styles.selectedTabText]}>
//           Services
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#F2F2F2',
//     borderRadius: 8,
//     marginVertical: 15,
//     padding: 4,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   selectedTab: {
//     // backgroundColor: '#FFF',
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#888',
//   },
//   selectedTabText: {
//     color: '#333',
//     fontWeight: '500',
//   },
// });

// export default CategoryTabs;



import React  from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryTabs: React.FC<Props> = ({ selectedCategory, onCategorySelect }) => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      {[t("help.general"),t("help.account"),t("help.services")].map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.tab, selectedCategory === cat && styles.selectedTab]}
          onPress={() => onCategorySelect(cat)}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === cat && styles.selectedTabText,
            ]}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginVertical: 15,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectedTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  selectedTabText: {
    color: '#333',
    fontWeight: '500',
  },
});

export default CategoryTabs;
