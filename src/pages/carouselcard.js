import React, { useRef } from 'react'
import { View, StyleSheet, Text } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useNavigation } from "@react-navigation/native";

import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/carousel'
import data from '../lib/data'

const CarouselCards = () => {
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const carouselRef = useRef(null);

  function dots() {
    if(index < 2) {
      setIndex(index + 1)
    } 
    else {
      navigation.navigate("Home")
    }
  }

  return (
    <View>
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: '#4B7DFE'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    height: 'auto',
    width: 'auto',
  },
  next: {
    backgroundColor: '#000',
    width: '25%',
    height: 'auto',
    marginLeft: '60%',
    borderRadius: 5
  },
  txt: {
    fontSize: 25,
    color: "#fff",
    alignSelf: 'center',
  }
})

export default CarouselCards
