import * as React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import EventCard from './EventCard';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import dummyPlace from '../../components/data/dummyPlace.json';
import ChatMessage from '../chat/ChatMessage';
import TipBox from '../tip/TipBox';
import Low from '../../components/congest/Low';

export default function Home({navigation}) {
  const [modal, setModal] = useState(true);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(-1);
  const [tutorial, setTutorial] = useState(true);
  const [next, setNext] = useState(false);
  const [location, setLocation] = useState(false);
  const [place, setPlace] = useState('Woody Room');
  const [surveyed, setSurveyed] = useState(false);
  const [selected, setSelected] = useState(0);
  const categoryList = ['Restaurant', 'Cafe', 'Shopping', 'Landmark', 'Museum'];
  const windowWidth = Dimensions.get('window').width;
  const [position, setPosition] = useState();
  const [selectedPlace, setSelectedPlace] = useState(dummyPlace.places[0]);

  async function requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setPosition(pos);
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const secondBottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['80%'], []); // Here we add '0%' to make it start from the bottom
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSecondModalPress = useCallback((place: object) => {
    secondBottomSheetModalRef.current?.present();
    setSelectedPlace(place);
  }, []);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleSecondSheetChanges = useCallback((index: number) => {
    console.log('second', index);
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'close'}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  const secondRenderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'close'}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const placeMarkers =
    dummyPlace &&
    dummyPlace.places.map(place => (
      <View >
      <Marker
        key={dummyPlace && dummyPlace.places.indexOf(place)}
        coordinate={{
          latitude: place.latitude,
          longitude: place.longitude,
        }}
        onPress={() => handleSecondModalPress(place)}
        style={{flexDirection: 'column', alignItems: 'center'}}
        >
        <Image
          source={require('../../public/icons/not_congested.png')}
          style={{height: 46, width: 39.48, resizeMode: 'contain'}}
        />
        <Text style={{fontSize:11, marginTop: 5, textAlign: 'center'}}>{place.name}</Text>
      </Marker>
      </View>
    ));

  console.log(selectedPlace);

  return (
    <SafeAreaView>
      <BottomSheetModalProvider>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          <Modal
            visible={tutorial}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            transparent={true}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 283,
                  width: windowWidth * 0.557,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  If you are new...
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontWeight: '300',
                    fontSize: 12,
                    color: '#000',
                    marginTop: 18,
                  }}>
                  What color denotes
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontWeight: '300',
                    fontSize: 12,
                    color: '#000',
                  }}>
                  the congestion level?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 26,
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      height: 26,
                      width: 26,
                      borderRadius: 13,
                      backgroundColor: '#c80000',
                      marginLeft: 37,
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 12,
                      fontWeight: '300',
                      color: '#000',
                    }}>
                    Very congested
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 26,
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      height: 26,
                      width: 26,
                      borderRadius: 13,
                      backgroundColor: '#ECAA00',
                      marginLeft: 37,
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 12,
                      fontWeight: '300',
                      color: '#000',
                    }}>
                    Slightly congested
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 26,
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      height: 26,
                      width: 26,
                      borderRadius: 13,
                      backgroundColor: '#00990F',
                      marginLeft: 37,
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 12,
                      fontWeight: '300',
                      color: '#000',
                    }}>
                    Not congested
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setTutorial(false);
                    setNext(true);
                  }}
                  style={{
                    height: 32,
                    width: '50%',
                    backgroundColor: '#333',
                    marginTop: 26,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={next}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            transparent={true}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 283,
                  width: windowWidth * 0.557,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  If you are new...
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontWeight: '300',
                    fontSize: 12,
                    color: '#000',
                    marginTop: 18,
                  }}>
                  How to save place of interest?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 26,
                    alignItems: 'center',
                    marginTop: 20,
                    justifyContent: 'center',
                    marginBottom: 19,
                  }}>
                  <Image
                    source={require('../../public/icons/addPlan.png')}
                    style={{
                      height: 30,
                      width: 30,
                      marginRight: 15,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#000',
                      }}>
                      {'Add to Place-on-Plan,'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#000',
                      }}>
                      {'saving the places you'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#000',
                      }}>
                      {'will visit today'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 26,
                    alignItems: 'center',
                    marginTop: 20,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../public/icons/bookMark.png')}
                    style={{
                      height: 30,
                      width: 30,
                      marginRight: 15,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#000',
                      }}>
                      {'Add to bookmark,'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#000',
                      }}>
                      {'saving the places for'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#000',
                      }}>
                      {'future visits'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setNext(false);
                    setLocation(true);
                  }}
                  style={{
                    height: 32,
                    width: '50%',
                    backgroundColor: '#333',
                    marginTop: 26,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    Got it
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{flex: 1, backgroundColor: 'lightgreen'}}>
            <View style={{position: 'absolute', height: '100%', width: '100%'}}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{height: '100%', width: '100%'}}
                region={{
                  latitude: position && position.coords.latitude,
                  longitude: position && position.coords.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
                customMapStyle={[
                  {
                    featureType: 'poi',
                    elementType: 'labels.icon',
                    stylers: [{visibility: 'off'}],
                  },
                ]}>
                <Marker
                  coordinate={{
                    latitude: position && position.coords.latitude,
                    longitude: position && position.coords.longitude,
                  }}
                  onPress={() => Alert.alert('hello')}>
                  <Image
                    source={require('../../public/images/cat.png')}
                    style={{height: 80, width: 80, resizeMode: 'contain'}}
                  />
                </Marker>
                {placeMarkers}
              </MapView>
            </View>
            <View
              style={{
                height: 50,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 40,
                  width: windowWidth * 0.734,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'rgba(0, 0, 0, 0.29)',
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../public/icons/find.png')}
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 20,
                  }}
                />
                <TextInput
                  style={{
                    height: '100%',
                    flex: 1,
                    marginRight: 20,
                  }}
                  placeholder={'Search here'}
                  value={input}
                  onChangeText={setInput}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Mypage')}
                style={{
                  marginLeft: 7,
                }}>
                <Image
                  source={require('../../public/icons/mypage.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 26,
                width: '100%',
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{paddingHorizontal: 25}}
                showsHorizontalScrollIndicator={false}
                style={{height: 26}}>
                <TouchableOpacity
                  onPress={() => {
                    category == 0 ? setCategory(-1) : setCategory(0);
                  }}
                  style={{
                    height: '100%',
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    borderColor: category == 0 ? '#000' : 'rgba(0, 0, 0, 0.29)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: category == 0 ? 2 : 1,
                    flexDirection: 'row',
                    marginRight: 5,
                  }}>
                  <Image
                    source={require('../../public/icons/restaurant.png')}
                    style={{height: 15, width: 15, marginRight: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    Restaurant
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    category == 1 ? setCategory(-1) : setCategory(1);
                  }}
                  style={{
                    height: '100%',
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    borderColor: category == 1 ? '#000' : 'rgba(0, 0, 0, 0.29)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: category == 1 ? 2 : 1,
                    flexDirection: 'row',
                    marginRight: 5,
                  }}>
                  <Image
                    source={require('../../public/icons/cafe.png')}
                    style={{height: 15, width: 15, marginRight: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    Cafe
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    category == 2 ? setCategory(-1) : setCategory(2);
                  }}
                  style={{
                    height: '100%',
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    borderColor: category == 2 ? '#000' : 'rgba(0, 0, 0, 0.29)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: category == 2 ? 2 : 1,
                    flexDirection: 'row',
                    marginRight: 5,
                  }}>
                  <Image
                    source={require('../../public/icons/shopping.png')}
                    style={{height: 15, width: 15, marginRight: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    Shopping
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    category == 3 ? setCategory(-1) : setCategory(3);
                  }}
                  style={{
                    height: '100%',
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    borderColor: category == 3 ? '#000' : 'rgba(0, 0, 0, 0.29)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: category == 3 ? 2 : 1,
                    flexDirection: 'row',
                    marginRight: 5,
                  }}>
                  <Image
                    source={require('../../public/icons/landmark.png')}
                    style={{height: 15, width: 15, marginRight: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    Landmark
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    category == 4 ? setCategory(-1) : setCategory(4);
                  }}
                  style={{
                    height: '100%',
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    borderColor: category == 4 ? '#000' : 'rgba(0, 0, 0, 0.29)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: category == 4 ? 2 : 1,
                    flexDirection: 'row',
                    marginRight: 5,
                  }}>
                  <Image
                    source={require('../../public/icons/museum.png')}
                    style={{height: 15, width: 15, marginRight: 4}}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    Musuem
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
          <Modal
            visible={location}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            transparent={true}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 230,
                  width: windowWidth * 0.75,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                    height: 26,
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: '500',
                      fontSize: 13,
                    }}>
                    Are you current at {place}?{' '}
                  </Text>
                  <Text>How congested is it?</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: windowWidth * 0.59,
                    marginTop: 8,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(1);
                        setSurveyed(true);
                      }}>
                      <View
                        style={[
                          {
                            height: 12,
                            width: 12,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        {selected == 1 ? (
                          <View
                            style={{
                              height: 6,
                              width: 6,
                              borderRadius: 6,
                              backgroundColor: '#000',
                            }}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderStyle: 'dotted',
                        width: windowWidth * 0.2,
                        borderWidth: 1,
                        borderRadius: 1,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(2);
                        setSurveyed(true);
                      }}>
                      <View
                        style={[
                          {
                            height: 12,
                            width: 12,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        {selected == 2 ? (
                          <View
                            style={{
                              height: 6,
                              width: 6,
                              borderRadius: 6,
                              backgroundColor: '#000',
                            }}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderStyle: 'dotted',
                        width: windowWidth * 0.2,
                        borderWidth: 1,
                        borderRadius: 1,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(3);
                        setSurveyed(true);
                      }}>
                      <View
                        style={[
                          {
                            height: 12,
                            width: 12,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        {selected == 3 ? (
                          <View
                            style={{
                              height: 6,
                              width: 6,
                              borderRadius: 6,
                              backgroundColor: '#000',
                            }}
                          />
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        fontSize: 9,
                        textAlign: 'center',
                      }}>
                      not{'\n'}congested
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        fontSize: 9,
                        textAlign: 'center',
                      }}>
                      slightly{'\n'}congested
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        fontSize: 9,
                        textAlign: 'center',
                      }}>
                      very{'\n'}congested
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setLocation(false);
                    }}
                    style={{
                      height: 32,
                      width: '35%',
                      marginTop: 26,
                      marginRight: 15,
                      borderRadius: 20,
                      borderColor: '#000',
                      borderWidth: 1,
                      backgroundColor: '#FFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 14,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  {surveyed ? (
                    <TouchableOpacity
                      onPress={() => {
                        setLocation(false);
                      }}
                      style={{
                        height: 32,
                        width: '35%',
                        backgroundColor: '#000',
                        borderColor: '#000',
                        borderWidth: 1,
                        marginTop: 26,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter',
                          includeFontPadding: false,
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#fff',
                        }}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        height: 32,
                        width: '35%',
                        backgroundColor: '#fff',
                        borderColor: '#AFACAC',
                        borderWidth: 1,
                        marginTop: 26,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter',
                          includeFontPadding: false,
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#AFACAC',
                        }}>
                        Submit
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Modal>
          <View
            style={{
              height: 60,
              width: '100%',
              alignSelf: 'flex-end',
              backgroundColor: '#fff',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              style={{
                height: '100%',
                width: '100%',
                paddingHorizontal: 29,
                paddingTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#000',
                }}>
                Today's Hot Events
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheetModal
          snapPoints={snapPoints}
          style={{paddingHorizontal: 29}}
          ref={bottomSheetModalRef}
          index={0}
          enableContentPanningGesture={false}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontSize: 15,
                fontWeight: '600',
                color: '#000',
                marginBottom: 10,
              }}>
              Today's Hot Events
            </Text>
            <ScrollView
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={{height: '100%'}}
              // style={{height: '100%'}}>
            >
              <EventCard />
              <EventCard />
              <EventCard />
            </ScrollView>
          </View>
        </BottomSheetModal>
        <BottomSheetModal
          snapPoints={snapPoints}
          ref={secondBottomSheetModalRef}
          index={0}
          enableContentPanningGesture={false}
          backdropComponent={renderBackdrop}
          onChange={handleSecondSheetChanges}>
          <View style={{width: '100%', height: '100%'}}>
            <View
              style={{
                width: windowWidth,
                backgroundColor: '#fff',
                flexDirection: 'row',
                // alignItems: 'center',
                paddingHorizontal: 26,
                paddingVertical: 24,
              }}>
              <TouchableOpacity>
                <Image
                  source={require('../../public/icons/addPlan.png')}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 13,
                    fontWeight: '400',
                    color: '#bbb4b5',
                    marginBottom: 5,
                  }}>
                  {selectedPlace.category}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 17,
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  {selectedPlace.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 5,
                    marginBottom: 10,
                  }}>
                  <Image
                    source={require('../../public/icons/star_empty.png')}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 13,
                      fontWeight: '300',
                      color: '#000',
                    }}>
                    {selectedPlace.rating}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      includeFontPadding: false,
                      fontSize: 13,
                      fontWeight: '300',
                      color: '#000',
                    }}>
                    {' / 5.0'}
                  </Text>
                </View>
                {<Low />}
              </View>
              <TouchableOpacity>
                <Image
                  source={require('../../public/icons/bookMark.png')}
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
                style={{width: '100%', height: '100%'}}
                showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                paddingLeft: 42,
                paddingVertical: 18,
                backgroundColor: '#f4f4f4',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Image
                  source={require('../../public/icons/location.png')}
                  style={{
                    height: 17,
                    width: 17,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 14,
                    fontWeight: '300',
                    color: '#000',
                  }}>
                  {selectedPlace.address}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Image
                  source={require('../../public/icons/time.png')}
                  style={{
                    height: 17,
                    width: 17,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 14,
                    fontWeight: '300',
                    color: '#000',
                  }}>
                  {selectedPlace.openhour}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Image
                  source={require('../../public/icons/phone.png')}
                  style={{
                    height: 17,
                    width: 17,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 14,
                    fontWeight: '300',
                    color: '#000',
                  }}>
                  {selectedPlace['phone number']}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../public/icons/home.png')}
                  style={{
                    height: 17,
                    width: 17,
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 14,
                    fontWeight: '300',
                    color: '#000',
                  }}>
                  {selectedPlace.homepage}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                width: '100%',
                paddingHorizontal: 20,
              }}>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#d9d9d9',
                    paddingVertical: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginBottom: 11,
                    }}>
                    <Image
                      source={require('../../public/icons/chat.png')}
                      style={{
                        height: 20,
                        width: 20,
                        marginRight: 8,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        includeFontPadding: false,
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#000',
                      }}>
                      LIVE CHAT
                    </Text>
                    <View style={{flex: 1}} />
                    <TouchableOpacity>
                      <Image
                        source={require('../../public/icons/refresh.png')}
                        style={{
                          height: 20,
                          width: 20,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Chat', {place: selectedPlace})
                    }
                    style={{
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#f5f5f5',
                      padding: 13,
                    }}>
                    <ChatMessage
                      name={'Sandy'}
                      time={'2mins ago'}
                      content={'sample content'}
                      likes={2}
                    />
                    <ChatMessage
                      name={'Anika'}
                      time={'30sec ago'}
                      content={'Bla Bla Bla Bla'}
                      likes={0}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        marginBottom: 11,
                      }}>
                      <Image
                        source={require('../../public/icons/pin.png')}
                        style={{
                          height: 20,
                          width: 20,
                          marginRight: 8,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: 'Inter',
                          includeFontPadding: false,
                          fontSize: 15,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        Tips
                      </Text>
                      <View style={{flex: 1}} />
                      <TouchableOpacity>
                        <Text>Add my tip +</Text>
                      </TouchableOpacity>
                    </View>
                    <TipBox
                      name={'Sandy'}
                      content={'Sample content'}
                      date={'2023 Sept 27'}
                      likes={1306}
                      dislikes={11}
                    />

                    <TipBox
                      name={'Marcus'}
                      content={'Sample content'}
                      date={'2022 Dec 31'}
                      likes={50}
                      dislikes={1}
                    />
                  </View>
                </View>
            </View>
            </ScrollView>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
