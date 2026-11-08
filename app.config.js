try {
  require('@expo/env').load(__dirname);
} catch (e) {}

module.exports = ({ config }) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      bundleIdentifier: config.ios?.bundleIdentifier || 'com.tharushi.rideshare',
      infoPlist: {
        ...config.ios?.infoPlist,
        NSLocationWhenInUseUsageDescription:
          'RideShare uses your location to show pickup and drop-off points on the map.',
      },
    },
    android: {
      ...config.android,
      package: config.android?.package || 'com.tharushi.rideshare',
      permissions: [
        ...(config.android?.permissions || []),
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
      ],
    },
    plugins: [
      ...(config.plugins || []).filter(
        (p) =>
          (typeof p === 'string' ? p : p[0]) !== 'react-native-maps' &&
          (typeof p === 'string' ? p : p[0]) !== 'expo-location'
      ),
      [
        'expo-location',
        {
          locationWhenInUsePermission:
            'RideShare uses your location to show pickup and drop-off points on the map.',
        },
      ],
    ],
  };
};
