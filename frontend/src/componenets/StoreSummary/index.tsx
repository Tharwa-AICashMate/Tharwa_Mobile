import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '@/theme';
import { StoreSummary as StoreSummaryType }  from '@/types/store';
import { AntDesign, Ionicons } from '@expo/vector-icons';
type FilterType = 'findBestStore' | 'analysis' ;

interface StoreSummaryProps {
  summary: StoreSummaryType;
  onSelectTab: (tab:  'findBestStore' | 'analysis') => void;
  activeTab: 'findBestStore' | 'analysis';
}

const StoreSummary: React.FC<StoreSummaryProps> = ({ 
  summary, 
  onSelectTab,
  activeTab
}) => {
  const { findBestStore , analysis} = summary;
  
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <View 
          style={[
            styles.tab, 
            activeTab === 'findBestStore' && styles.activeTab,
            { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
          ]}
          onTouchEnd={() => onSelectTab('findBestStore')}
        >
<AntDesign name="find" size={24} color={Theme.colors.primary} />
          <Text style={[styles.tabLabel,activeTab === 'findBestStore' && styles.activeTabText]}>Find by Map</Text>
         </View>
        
        <View 
          style={[
            styles.tab, 
            activeTab === 'analysis' && styles.activeTab,
            { borderTopRightRadius: 16, borderBottomRightRadius: 16 }
          ]}
          onTouchEnd={() => onSelectTab('analysis')}
        >
<Ionicons name="analytics" size={24} color={'202063'}/>
          <Text style={[styles.tabLabel,activeTab === 'analysis' && styles.activeTabText]}>Analsis</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  balanceContainer: {
    width:250,
    height:80,
    backgroundColor:'white',
    borderRadius:15,
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 24,
    marginLeft:10,
    padding:10
  },
  balanceLabel: {
    fontSize: 14,
    color: Theme.colors.textLight,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: Theme.colors.textLight,
  },
  tabsContainer: {
    flexDirection: 'row',
   
    justifyContent:'space-between',
    alignItems:'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft:10,
    backgroundColor:Theme.colors.background,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#32325D',
  },
  tabLabel: {
    fontSize: 14,
    color: '#32325D',
    marginBottom: 4,
  },
  tabAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#32325D',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});

export default StoreSummary;