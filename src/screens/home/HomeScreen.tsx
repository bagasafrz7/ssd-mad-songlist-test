import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Container from '../../components/Global/Container';
import TopSongs from '../../components/Home/TopSongs';
import ListSongs from '../../components/Home/ListSongs';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function HomeScreen() {
  const avatarUrl =
    'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp';

  return (
    <ScrollView>
      <Container>
        <View style={styles.headerContainer}>
          <Image source={{uri: avatarUrl}} style={styles.avatar} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText}>Hi, Jhonn Dee</Text>
            <Text style={styles.desc}>Enjoy your music</Text>
          </View>
        </View>
        <TopSongs />
        <ListSongs />
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 11,
    fontWeight: 'normal',
  },
});
