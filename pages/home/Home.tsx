import * as React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import Middle from '../../components/congest/Middle';
import High from '../../components/congest/High';
import axios from 'axios';

export default function Home({navigation}) {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(-1);
  const [tutorial, setTutorial] = useState(true);
  const [next, setNext] = useState(false);
  const [location, setLocation] = useState(false);
  // This place will be used to identify where the user is at right now.
  // Therefore, it is essential to update this property with currently-closest place
  const [place, setPlace] = useState('Woody Room');
  const [surveyed, setSurveyed] = useState(false);
  const [submit_alert, setPointalert] = useState(false);
  const [submitted, setLocationSumbit] = useState(false);
  const [selected, setSelected] = useState(0);
  const [position, setPosition] = useState({
    coords: {latitude: 36, longitude: 127},
  });
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(dummyPlace.places[0]);
  const [bookmark, setBookmark] = useState(false);
  const [congestion, setCongestion] = useState(false);
  const [locationinfo, setLocationInfo] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    axios
      .get('http://121.184.96.94:8070/api/v1/location')
      .then(response => setPlaces(response.data.locationList))
      .catch(error => console.error(error));
  }, []);

  async function requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        return await Geolocation.requestAuthorization('always');
      }
      if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
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
  const secondSnapPoints = useMemo(() => ['80%'], []);
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

  function getPlaceMarker(category: string) {
    if (category === 'restaurant-cat-id') {
      return require('../../public/icons/marker_restaurant.png');
    } else if (category === 'cafe-cat-id') {
      return require('../../public/icons/marker_cafe.png');
    } else if (category === 'shopping-cat-id') {
      return require('../../public/icons/marker_shopping.png');
    } else {
      return require('../../public/icons/marker_landmark.png');
    }
  }

  function getPlaceCongestionMarker(congestion: number) {
    if (congestion == 0) {
      return require('../../public/icons/not_congested.png');
    } else if (congestion == 1) {
      return require('../../public/icons/slight_congested.png');
    } else {
      return require('../../public/icons/very_congested.png');
    }
  }

  const placeCategoryMarkers =
    places &&
    filterPlaces(category).map((place, index) => (
      <Marker
        tracksViewChanges={Platform.OS === 'ios'}
        key={`categoryMarker_${index}_${congestion ? 'congestion' : 'normal'}`}
        coordinate={{
          latitude: parseFloat(place.locationLatitude),
          longitude: parseFloat(place.locationLongitude),
        }}
        onPress={() => handleSecondModalPress(place)}
        style={{flexDirection: 'column', alignItems: 'center'}}>
        <Image
          source={getPlaceMarker(place.locationLocationCategoryId)}
          style={{
            height: 46,
            width: 39.48,
            resizeMode: 'contain',
          }}
        />
        <Text style={{fontSize: 11, marginTop: 5, textAlign: 'center'}}>
          {place.locationName}
        </Text>
      </Marker>
    ));

  const placeCongestionMarkers =
    places &&
    filterPlaces(category).map((place, index) => (
      <Marker
        tracksViewChanges={Platform.OS === 'ios'}
        key={`congestionMarker_${index}_${
          congestion ? 'congestion' : 'normal'
        }`}
        coordinate={{
          latitude: parseFloat(place.locationLatitude),
          longitude: parseFloat(place.locationLongitude),
        }}
        onPress={() => handleSecondModalPress(place)}
        style={{flexDirection: 'column', alignItems: 'center'}}>
        <Image
          source={getPlaceCongestionMarker(place.locationCongestionLevel)}
          style={{height: 46, width: 39.48, resizeMode: 'contain'}}
        />
        <Text style={{fontSize: 11, marginTop: 5, textAlign: 'center'}}>
          {place.locationName}
        </Text>
      </Marker>
    ));

  function getCongestionCard(place: object) {
    if (place.locationCongestionLevel == 0) {
      return <Low />;
    } else if (place.locationCongestionLevel == 1) {
      return <Middle />;
    } else {
      return <High />;
    }
  }

  function getCongestionColor(place: object) {
    if (place.locationCongestionLevel == 0) {
      return '#00990f';
    } else if (place.locationCongestionLevel == 1) {
      return '#ecaa00';
    } else {
      return '#c80000';
    }
  }

  function getCategoryName(id: string) {
    if (id === 'restaurant-cat-id') {
      return 'Restaurant';
    } else if (id === 'cafe-cat-id') {
      return 'Cafe';
    } else if (id === 'shopping-cat-id') {
      return 'Shopping';
    } else if (id === 'landmark-cat-id') {
      return 'Landmark';
    } else {
      return 'Museum';
    }
  }

  function filterPlaces(index: number) {
    let filteredPlaceList = places.filter(item =>
      item.locationName.includes(input),
    );
    if (index == 0) {
      return filteredPlaceList.filter(
        item => item.locationLocationCategoryId == 'restaurant-cat-id',
      );
    } else if (index == 1) {
      return filteredPlaceList.filter(
        item => item.locationLocationCategoryId == 'cafe-cat-id',
      );
    } else if (index == 2) {
      return filteredPlaceList.filter(
        item => item.locationLocationCategoryId == 'shopping-cat-id',
      );
    } else if (index == 3) {
      return filteredPlaceList.filter(
        item => item.locationLocationCategoryId == 'landmark-cat-id',
      );
    } else if (index == 4) {
      return filteredPlaceList.filter(
        item => item.locationLocationCategoryId == 'museum-cat-id',
      );
    } else {
      return filteredPlaceList;
    }
  }

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    },
  });

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

          <View style={{flex: 1}}>
            <View style={styles.container}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
                initialRegion={{
                  latitude: 36.36308,
                  longitude: 127.3561601,
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
                  tracksViewChanges={true}
                  coordinate={{
                    latitude: position && parseFloat(position.coords.latitude),
                    longitude:
                      position && parseFloat(position.coords.longitude),
                  }}
                  onPress={() => Alert.alert('hello')}>
                  <Image
                    source={require('../../public/icons/mylocation.png')}
                    style={{height: 30, width: 30, resizeMode: 'contain'}}
                  />
                </Marker>
                {congestion ? placeCongestionMarkers : placeCategoryMarkers}
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
                    includeFontPadding: false,
                    justifyContent: 'center',
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

            {/*<TouchableOpacity*/}
            {/*  onPress={() => setLocationInfo(!locationinfo)}*/}
            {/*  style={{*/}
            {/*    height: 40,*/}
            {/*    width: 40,*/}
            {/*    marginTop: 15,*/}
            {/*    marginRight: 15,*/}
            {/*    alignSelf: 'flex-end',*/}
            {/*    justifyContent: 'flex-end',*/}
            {/*  }}>*/}
            {/*  {submitted ? (*/}
            {/*    locationinfo ? (*/}
            {/*      <Image*/}
            {/*        source={require('../../public/icons/location_black.png')}*/}
            {/*        style={{height: 40, width: 40, marginRight: 10}}*/}
            {/*      />*/}
            {/*    ) : (*/}
            {/*      <Image*/}
            {/*        source={require('../../public/icons/location_white.png')}*/}
            {/*        style={{height: 40, width: 40, marginRight: 10}}*/}
            {/*      />*/}
            {/*    )*/}
            {/*  ) : locationinfo ? (*/}
            {/*    <Image*/}
            {/*      source={require('../../public/icons/no_location_black.png')}*/}
            {/*      style={{height: 40, width: 40, marginRight: 10}}*/}
            {/*    />*/}
            {/*  ) : (*/}
            {/*    <Image*/}
            {/*      source={require('../../public/icons/no_location_white.png')}*/}
            {/*      style={{height: 40, width: 40, marginRight: 10}}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity
              onPress={() => {
                setCongestion(!congestion);
              }}
              style={{
                height: 50,
                width: 50,
                marginTop: windowHeight * 0.6,
                marginRight: 10,
                alignSelf: 'flex-end',
              }}>
              {congestion ? (
                <Image
                  source={require('../../public/icons/congest_button_black.png')}
                  style={{height: 50, width: 50, marginRight: 10}}
                />
              ) : (
                <Image
                  source={require('../../public/icons/congest_button_white.png')}
                  style={{height: 50, width: 50, marginRight: 10}}
                />
              )}
            </TouchableOpacity>
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
                    Are you currently at {place}?{' '}
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
                        setPointalert(true);
                        setLocationSumbit(true);
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

          <Modal
            visible={submit_alert}
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
                  height: 200,
                  width: windowWidth * 0.75,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    textAlign: 'center',
                  }}>
                  {' '}
                  Thank you for participating the survey!{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    textAlign: 'center',
                  }}>
                  {' '}
                  You earned 5 points. 🎉{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {' '}
                  Your current points are{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    textAlign: 'center',
                  }}>
                  {' '}
                  <Text
                    style={{
                      fontFamily: 'Inter',
                      fontSize: 17,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    {' '}
                    30{' '}
                  </Text>
                  points.
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setPointalert(false);
                    }}
                    style={{
                      height: 32,
                      width: '35%',
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

                  <TouchableOpacity
                    onPress={() => {
                      setPointalert(false);
                    }}
                    style={{
                      height: 32,
                      width: '35%',
                      marginRight: 15,
                      borderRadius: 20,
                      borderWidth: 1,
                      backgroundColor: '#000',
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
                      Confirm
                    </Text>
                  </TouchableOpacity>
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
                marginBottom: 20,
              }}>
              Today's Hot Events
            </Text>
            <ScrollView
              contentContainerStyle={{paddingBottom: 20}}
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={{height: '100%'}}
              // style={{height: '100%'}}>
            >
              <EventCard
                title={'AAICON2023'}
                date={'12/7 - 12/8'}
                location={'대전컨벤션센터 1전시장 1F 중회의장'}
                description={'제3차 실용인공지능학회 학술대회입니다.'}
                image={'event1'}
              />
              <EventCard
                title={'2023 대전 오픈워십'}
                date={'12/09 18:30 ~ 20:30'}
                location={'대전 대덕구 홍도로 97 대전중앙침례교회'}
                description={'무료 오픈워십'}
                image={'event2'}
              />
              <EventCard
                title={'2023 JGAK 주니어골프시리즈 10차'}
                date={'12/11 00:00 ~ 23:00'}
                location={'충남 부여군 은산면 충절로 백제컨트리클럽'}
                description={'대전주니어골프대회'}
                image={'event3'}
              />
            </ScrollView>
          </View>
        </BottomSheetModal>

        <BottomSheetModal
          snapPoints={secondSnapPoints}
          ref={secondBottomSheetModalRef}
          index={0}
          enableContentPanningGesture={false}
          backdropComponent={({ style }) => (
            <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} >
              <View
                style={{
                  width: 86,
                  height: 57,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  backgroundColor: getCongestionColor(selectedPlace),
                  alignSelf: 'center',
                  marginTop: windowHeight * 0.07
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  {selectedPlace.currentViewsCount + 1}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 10,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  watching
                </Text>
              </View>
              <View style={{
                width: 0, height:0, 
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 10, // 삼각형의 너비 조절
                borderRightWidth: 10, // 삼각형의 너비 조절
                borderTopWidth: 10, // 삼각형의 높이 조절
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent', // 삼각형의 색상 조절
                borderTopColor: getCongestionColor(selectedPlace),
                alignSelf: 'center'
              }}/>
            </View>
            )}
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
                  {getCategoryName(selectedPlace.locationLocationCategoryId)}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 17,
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  {selectedPlace.locationName}
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
                {getCongestionCard(selectedPlace)}
              </View>
              <TouchableOpacity onPress={() => setBookmark(!bookmark)}>
                <Image
                  source={
                    bookmark
                      ? require('../../public/icons/bookMark.png')
                      : require('../../public/icons/bookMarkNone.png')
                  }
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
                    {selectedPlace.locationAddress}
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
                    {selectedPlace.openHour}
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
                    {selectedPlace.phoneNumber}
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
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Tip')}>
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
