import * as React from 'react';
import {useCallback, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
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

export default function Home({navigation}) {
  const [modal, setModal] = useState(true);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(-1);
  const [tutorial, setTutorial] = useState(true);
  const [next, setNext] = useState(false);
  const categoryList = ['Restaurant', 'Cafe', 'Shopping', 'Landmark', 'Museum'];
  const windowWidth = Dimensions.get('window').width;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ['50%'], []); // Here we add '0%' to make it start from the bottom
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const close = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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

  return (
    <SafeAreaView>
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
      <View>
        <BottomSheetModalProvider>
          <View
            style={{
              height: 50,
              width: '100%',
              backgroundColor: 'lightgreen',
            }}>
            <TouchableOpacity onPress={handlePresentModalPress}>
              <Text>expand</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetModal
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
            index={0}
            enableContentPanningGesture={false}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}>
            <Text>Hello</Text>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    </SafeAreaView>
  );
}
