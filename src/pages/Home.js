import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  FlatList } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Animated, { 
  useAnimatedScrollHandler,
  useSharedValue } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { modelos } from '../lib/Modelos';
  
import AddBtn from '../components/addBtn';
import Modules from '../components/modules';
  
export function Home() {
  const navigation = useNavigation();

  const [modulo, setModelo] = useState('1');
  const [Produto, setProduto] = useState([]);
  

  useFocusEffect(useCallback(() => {
    loadSpots();
  },[]));

  async function loadSpots(){
        
    const response = await AsyncStorage.getItem('@Produtos');
    const storage = response ? JSON.parse(response) : [];
   
    setProduto(storage);
  }
  

  function setHandleMod(modelo) {
    setModelo(modelo);
    console.log('aqui')
  };

  function plus() { 
    if (modulo == 1) {
      navigation.navigate('PMod');
    }else {
      navigation.navigate('SMod');
    }
  }



  async function removeProduto() {
    await AsyncStorage.removeItem(item.id);
  }

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
      scrollY.value = event.contentOffset.y;
  });


  return (
    
      <View style={styles.form}>
        
        <View style={styles.user}>
          <Text style={styles.txt}>Olá,</Text>
          <Text style={styles.txtuser}>User</Text>
        </View>

        <View style={styles.text}>
          <Text style={styles.one}>Em qual modelo</Text>
          <Text style={styles.two}>Você quer fazer o inventario?</Text>
        </View>

        <View style={styles.formmod}>
          <FlatList 
            data={modelos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (  
                <Modules 
                  title={item.name}
                  active={item.id === modulo}
                  onPress={() => setHandleMod(item.id)}                        
                /> 
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.modelotList}
          /> 
        </View>
       
        


        <View style={styles.listaProdutos}>
          <Text style={styles.total}>Total de Produtos</Text>
          <Text style={styles.num}>{Produto.length}</Text>
        </View>

        <View style={styles.prodlist}>
          <View>
            <Text style={styles.list}>Produtos listados</Text>
            </View>
            <AddBtn onPress={plus} />
        </View>


        <View style={styles.legenda}>
            <View>
                <Text style={styles.prodlisttitle}> Produtos</Text>
            </View>
            <View>
                <Text style={styles.prodlisttitle}> qtd</Text>
            </View>                    
        </View>
        {/*exemplo de listagem com storage apartir dai e com vc*/}
        <Animated.ScrollView
            style={{ width: '100%' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 1 }}
            onScroll={scrollHandler}
            scrollEventThrottle={16} // 1000 / 60 = 16. (1 segundo / 60 que é a quantidade de frames por segundo para ter uma animação de 60 frames)
        >
          <View style={styles.swiper}>
              <FlatList
                  data={Produto}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <Swipeable
                      overshootRight={false}
                      renderRightActions={() => (
                        <Animated.View>
                            <View>
                                <RectButton
                                    style={styles.buttonRemove}
                                    onPress={()=>{}} //funcao onde vai remover usar o nome handleRemove passando como parametro todo o item
                                >
                                    <Feather name="trash" size={24} color='#FFF'/>
                                </RectButton>
                            </View>
                        </Animated.View>
        
                      )}
                    >

                      <RectButton
                        style={styles.containerbuttomremover}
                      >
                        <Text style={styles.title}>
                          {item.produto}
                        </Text>
                        <View style={styles.details}>
                          <Text style={styles.qtd}>
                              {item.qtd}
                          </Text>
                        </View>
                      </RectButton>
                    </Swipeable>    
                  )}
            showsVerticalScrollIndicator={false} />
          </View>


        

        </Animated.ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  form: {
    width: 'auto',
    height: 'auto',
    
  },

  user: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    alignContent: 'space-around',
    width: 'auto',
    height: 'auto',
    marginTop: '20%',
    marginLeft: '5%',
  },

  txt: {
    fontSize: 30,
  },

  txtuser: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  text: {
    flexDirection: 'column',
    direction: 'ltr',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    width: 'auto',
    height: 'auto',
    marginTop: '5%',
    marginLeft: '5%',
  },

  listaProdutos: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
    alignContent: 'space-around',
    width: 'auto',
    height: 'auto',
    marginLeft: '5%',
  },

  total: {
    fontWeight: 'bold',
    fontSize: 18
  },

  num: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  
  list: {
    fontSize: 15,
    marginLeft: '24%',
    alignItems: 'center',
  },

  button: {
    height: '58%',
    width: '35%',
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginTop: '2%',
    marginLeft: '13%',
  },

  buttonText: {
    color: '#606060'
  },

  prodlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    height: '5%',
    marginRight: '90%',
  }, 
  
  buttonplustext: {
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },

  modeloList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 15,
    paddingRight: 30
},

/*css do bottom modulos */
containermodutos: {
  backgroundColor: "#F0F0F0",
  width: 140,
  height: 40,   
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  marginHorizontal: 5
},
containerActive: {        
  backgroundColor: "#BDDEFD"
},
textmodulo: {
  color: "#DDE3F0",
},
textActive: {
  color: "#2F80ED",
},
  
  /*css do bottom modulos */


  modeloList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 15,
    paddingRight: 30
},

  /*css do bottom modulos */
  containermodutos: {
    backgroundColor: "#F0F0F0",
    width: 140,
    height: 40,   
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {        
    backgroundColor: "#BDDEFD"
  },
  textmodulo: {
    color: "#DDE3F0",
  },
  textActive: {
    color: "#2F80ED",
  },
    
    /*css do bottom modulos */

  Produtos: {
    //backgroundColor: '#606060',
    width: '85%',
    height: '70%',
    alignSelf: 'center',
  },
legenda: {
  width:'100%',
  flexDirection:'row',
  justifyContent:"space-between",
  alignItems:'center',
  paddingVertical:5,
  paddingHorizontal: 32,
},

  textSwipe: {
    alignSelf: 'center',
  }, 

  legenda: {
    width:'100%',
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    paddingVertical:5,
    paddingHorizontal: 32,
    marginTop: '5%'
  },

  prod: {
  fontSize: 18
  },

  qtd: {
    fontSize: 18,
    marginLeft: '45%'
  },

  legendaProdutos: {
    backgroundColor: '#BDDEFD',
    flexDirection: 'row',
    borderRadius: 10,
    fontSize: 10,
    margin: '5%',
    width: '85%',
    height: '70%',
    marginTop: '2%'
  },

  textSwipe: {
    fontSize: 18,
    marginLeft: '4%',
  },

  textSwipeB: {
    fontSize: 18,
    marginLeft: '77%',
  },

  //swipe 
  swiper: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 8,
  },
  swiperTitle: {
    fontSize: 24,
    color: '#DDE3F0',
    marginVertical: 20
  },

  //buttom remover swipe
  containerbuttomremover: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 2,
    marginLeft: 2,
    marginRight: 2
  },
  title: {
    flex: 1,
    marginLeft: 32,
    fontSize: 17,
    color: '#738078'
  },
  details: {
    alignItems: 'flex-end',
    right:20 
  },
  qtd: {
    marginTop: 5,
    fontSize: 16,
    color: '#738078',
    right: 5
  },
  buttonRemove: {
    width: 100,
    height: 30,
    backgroundColor: '#E83F5B',
    marginTop: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15
  },


textSwipeB: {
  fontSize: 18,
  marginLeft: '77%',
},


//swipe 
swiper: {
  flex: 1,
  width: '100%'
},
swiperTitle: {
  fontSize: 24,
  color: '#DDE3F0',
  marginVertical: 20
},

//buttom remover swipe
containerbuttomremover: {
  width: '100%',
  height: 40,
  paddingHorizontal: 10,
  paddingVertical: 15,
  borderRadius: 5,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  marginVertical: 2,
  marginLeft: 2,
  marginRight: 2
},
title: {
  flex: 1,
  marginLeft: 32,
  fontSize: 17,
  color: '#738078'
},
details: {
  alignItems: 'flex-end',
  right:20 
},
qtd: {
  marginTop: 5,
  fontSize: 16,
  color: '#738078',
  right: 5
},
buttonRemove: {
  width: 100,
  height: 30,
  backgroundColor: '#E83F5B',
  marginTop: 8,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  right: 20,
  paddingLeft: 15
} 

});

export default Home;
