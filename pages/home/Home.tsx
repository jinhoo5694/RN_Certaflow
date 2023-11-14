import * as React from 'react';
import {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';

export default function Home({navigation}) {
  const [modal, setModal] = useState(true);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(-1);
  const [tutorial, setTutorial] = useState(true);
  const [next, setNext] = useState(false);
  const [location, setLocation] = useState(false);
  const [place, setPlace] = useState("Woody Room");
  const [surveyed, setSurveyed] = useState(false);
  const [selected, setSelected] = useState(0);
  const categoryList = ['Restaurant', 'Cafe', 'Shopping', 'Landmark', 'Museum'];
  const windowWidth = Dimensions.get('window').width;


<<<<<<< Updated upstream
=======
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
        {place.congestion == 0 ? 
        <Image
          source={require('../../public/icons/not_congested.png')}
          style={{height: 46, width: 39.48, resizeMode: 'contain'}}
        /> : 
        place.congestion == 1 ? 
        <Image
          source={require('../../public/icons/slightly_congested.png')}
          style={{height: 46, width: 39.48, resizeMode: 'contain'}}
        /> :
        <Image
          source={require('../../public/icons/very_congested.png')}
          style={{height: 46, width: 39.48, resizeMode: 'contain'}}
        />
        }
        <Text style={{fontSize:11, marginTop: 5, textAlign: 'center'}}>{place.name}</Text>
      </Marker>
      </View>
    ));

  console.log(selectedPlace);
>>>>>>> Stashed changes

  return (
    <SafeAreaView>
      <Image
        source={require('../../public/images/img_1.png')}
        style={{
          position: 'absolute',
        }}
      />
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

      <Modal
        visible={location}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center',}}
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
              alignItems: 'center',}}>
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
                    fontSize: 13
                  }}
                >Are you current at {place}? </Text>
                <Text>How congested is it?</Text>
              </View>
              <View 
                style={{
                  flexDirection:'column',
                  justifyContent: 'center',
                  width: windowWidth * 0.59,
                  marginTop: 8}}>
                <View
                style={{
                  flexDirection:'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                  <TouchableOpacity onPress={() => { setSelected(1); setSurveyed(true) }}>
                  <View
                    style={[{
                      height: 12,
                      width: 12,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center'
                      }]}>
                      {selected == 1 ? <View style={{height: 6, width:6, borderRadius:6, backgroundColor: '#000'}} /> : null}
                  </View>
                  </TouchableOpacity>
                  <View style={{
                      borderStyle: 'dotted',
                      width: windowWidth * 0.2,
                      borderWidth: 1,
                      borderRadius: 1,
                    }}>
                    </View>
                  <TouchableOpacity onPress={() => { setSelected(2); setSurveyed(true) }}>
                  <View
                    style={[{
                      height: 12,
                      width: 12,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center'
                      }]}>
                      {selected == 2 ? <View style={{height: 6, width:6, borderRadius:6, backgroundColor: '#000'}} /> : null}
                  </View>
                  </TouchableOpacity>
                  <View style={{
                      borderStyle: 'dotted',
                      width: windowWidth * 0.2,
                      borderWidth: 1,
                      borderRadius: 1,
                    }}>
                  </View>
                  <TouchableOpacity onPress={() => { setSelected(3); setSurveyed(true) }}>
                  <View
                    style={[{
                      height: 12,
                      width: 12,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#000',
                      alignItems: 'center',
                      justifyContent: 'center'
                      }]}>
                    {selected == 3 ? <View style={{height: 6, width:6, borderRadius:6, backgroundColor: '#000'}} /> : null}
                  </View>
                  </TouchableOpacity>
                </View>

              <View style={{
                flexDirection:'row',
                justifyContent: 'space-between',
                marginTop: 5}}>
              <Text style={{fontFamily: 'Inter', fontSize: 9, textAlign: 'center'}}>not{"\n"}congested</Text>
              <Text style={{fontFamily: 'Inter', fontSize: 9, textAlign: 'center'}}>slightly{"\n"}congested</Text>
              <Text style={{fontFamily: 'Inter', fontSize: 9, textAlign: 'center'}}>very{"\n"}congested</Text>
              </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => { setLocation(false); }}
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
                {surveyed? 
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
                </TouchableOpacity> :
                <View style={{
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
                      color:'#AFACAC',
                    }}>
                    Submit
                  </Text>
                </View>
                }
              </View>
          </View>

        </View>
      </Modal>

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
        <ScrollView horizontal={true} 
          contentContainerStyle={{paddingHorizontal: 25}}
          showsHorizontalScrollIndicator={false}
          style={{height:26}}>
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
    </SafeAreaView>
  );
}
