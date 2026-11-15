
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

type TabButtonProps = TabTriggerSlotProps & {
  icon: keyof typeof Ionicons.glyphMap;
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
            <TabButton icon="people" label="Community" />
          </TabTrigger>

          <TabTrigger name="search" href="/(tabs)/search" asChild>
            <TabButton
              icon="search"
              label="Search"
              featured
            />
          </TabTrigger>

          <TabTrigger name="media" href="/(tabs)/media" asChild>
            <TabButton icon="play-circle" label="Media" />
          </TabTrigger>

          <TabTrigger name="account" href="/(tabs)/account" asChild>
            <TabButton icon="person" label="Account" />
          </TabTrigger>

        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

// Individual Tab Button
function TabButton({
  isFocused,
  icon,
  label,
  featured,
  ...props
}: TabButtonProps) {
  const activeColor = '#087BC1';
  const inactiveColor = '#536176';

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
          <Ionicons
            name="search"
            size={27}
            color="#FFFFFF"
          />
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
              name={
                isFocused
                  ? icon === 'home'
                    ? 'home'
                    : `${icon}-sharp` as keyof typeof Ionicons.glyphMap
                  : `${icon}-outline` as keyof typeof Ionicons.glyphMap
              }
              size={23}
              color={isFocused ? activeColor : inactiveColor}
            />
          </View>

          <Text
            style={[
              styles.tabLabel,
              {
                color: isFocused ? activeColor : inactiveColor,
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

// Custom Tab Bar
function CustomTabList(props: TabListProps) {
  return (
    <View
      {...props}
      style={[styles.tabBar, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 82,
    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingHorizontal: 5,
    paddingBottom: 5,

    borderTopWidth: 1,
    borderTopColor: '#E7EDF5',

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    shadowColor: '#123D83',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 12,
  },

  tabButton: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },

  iconContainer: {
    width: 38,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },

  activeIconContainer: {
    backgroundColor: '#EAF5FC',
  },

  tabLabel: {
    fontSize: 11,
    letterSpacing: 0.2,
  },

  featuredTab: {
    marginTop: -29,
  },

  searchButton: {
    width: 56,
    height: 64,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#245DE5',

    borderWidth: 3,
    borderColor: '#FFFFFF',

    shadowColor: '#123D83',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.30,
    shadowRadius: 7,
    elevation: 10,
  },

  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }],
  },
});
