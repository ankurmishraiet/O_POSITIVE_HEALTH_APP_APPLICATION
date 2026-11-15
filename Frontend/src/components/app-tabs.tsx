
import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';

import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconName = keyof typeof Ionicons.glyphMap;

type TabButtonProps = TabTriggerSlotProps & {
  icon: IconName;
  label: string;
  featured?: boolean;
};

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />

      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/(tabs)/home" asChild>
            <TabButton icon="home" label="Home" />
          </TabTrigger>

          <TabTrigger name="community" href="/(tabs)/community" asChild>
            <TabButton icon="people-outline" label="Community" />
          </TabTrigger>

          <TabTrigger name="search" href="/(tabs)/search" asChild>
            <TabButton icon="search" label="Search" featured />
          </TabTrigger>

          <TabTrigger name="media" href="/(tabs)/media" asChild>
            <TabButton icon="play-circle-outline" label="Media" />
          </TabTrigger>

          <TabTrigger name="account" href="/(tabs)/account" asChild>
            <TabButton icon="person-outline" label="Account" />
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  isFocused,
  icon,
  label,
  featured,
  ...props
}: TabButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.tabButton,
        featured && styles.featuredTab,
        pressed && styles.pressed,
      ]}
    >
      {featured ? (
        <View style={styles.searchButton}>
          <Ionicons name="search" size={27} color="#FFFFFF" />
        </View>
      ) : (
        <>
          <View
            style={[
              styles.iconContainer,
              isFocused && styles.activeIconContainer,
            ]}
          >
            <Ionicons
              name={icon}
              size={23}
              color={isFocused ? '#087BC1' : '#536176'}
            />
          </View>

          <Text
            style={[
              styles.tabLabel,
              {
                color: isFocused ? '#087BC1' : '#536176',
                fontWeight: isFocused ? '700' : '500',
              },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        styles.tabBar,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          height: 75 + insets.bottom,
        },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#E7EDF5',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    elevation: 12,
    shadowColor: '#123D83',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  tabButton: {
    flex: 1,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },

  iconContainer: {
    width: 38,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },

  activeIconContainer: {
    backgroundColor: '#EAF5FC',
  },

  tabLabel: {
    fontSize: 11,
  },

  featuredTab: {
    marginTop: -25,
  },

  searchButton: {
    width: 56,
    height: 62,
    borderRadius: 30,
    backgroundColor: '#245DE5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 9,
    shadowColor: '#123D83',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  pressed: {
    opacity: 0.7,
  },
});
