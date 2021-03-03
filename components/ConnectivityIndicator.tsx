import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import NetInfo from '@react-native-community/netinfo';

export const ConnectivityIndicator = () => {
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected || false);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ marginBottom: 20, alignItems: 'center', backgroundColor: isConnected ? 'green' : 'red' }}>
      {isConnected ? (
          <Text>Connected</Text>
      ) : (
          <Text>Disconnected</Text>
      )}
    </View>
  )
}