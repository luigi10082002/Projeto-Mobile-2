import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage, Pagination } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import data from '../lib/data';

const {width: screenWidth} = Dimensions.get('window');

function MyCarousel({ props }) {
  const [entries, setEntries] = useState([]);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);
  const carousel = useRef(true);

  const navigation = useNavigation();

  function goForward() {
    
    if(index < entries.length - 1){
      carouselRef.current.snapToNext();
    }else{

      navigation.navigate("Home", {
        screen: "OnBoarding"
    });
     
       
    }
  };


  useEffect(() => {
    setEntries(data);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.imgUrl}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={7} size={20}>
          {item.body}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={(index) => setIndex(index)}
      />

      <View style={styles.footer}>
        

        <Pagination
          dotsLength={entries.length}
          activeDotIndex={index}
          carouselRef={carouselRef}
          dotStyle={{
            width: 10,
            height: 10,
            marginTop: '50%',
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: '#4B7DFE'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
          <TouchableOpacity style={styles.btn} onPress={goForward}>
            <Entypo name="arrow-long-right" size={40} color="#FFF" style={styles.arrow}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '15%'
  },
  item: {
    width: screenWidth - 50,
    height: screenWidth - 0,
  },
  titel: {
    fontSize: 50
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  footer: {
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: '#4B7DFE',
    width: '20%',
    height: '23%',
    borderRadius: 5,
    marginLeft: '40%'
  },
  txt: {
    fontSize: 25,
    color: "#fff",
    alignSelf: 'center',
  },
  arrow: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: '5%',
  },
  pagination: {
    marginTop: '10%',
    height: '15%',
    width: '20%',
    backgroundColor: '#000'
  },
});
