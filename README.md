## Step 1: Clone the project

IMPORTANT: The whole instruction is based on an assumption that your environment is properly set up with React Native
project
If not, please follow through this guideline: https://reactnative.dev/docs/environment-setup

Or, If you have an android device, you can just simply install our 'apk' file to your device!

If the requirements are not met, then you might not be able to run the project properly.

First, you need to clone this repository into your local repository, with 'master' branch.

Then, install the dependencies that are required.

```bash
git clone -b master https://github.com/jinhoo5694/RN_Certaflow.git
yarn
```

## Step 2: Start your Application

Most important thing: iOS simulators only work on Mac environments.

NOTE: install Xcode on your PC, and then download ios simulator.

### For iOS

```bash
# ios platform
cd ios
bundle install
pod install
cd ..
npx react-native run-ios
```

### For android

There are no specific requirements for android users. just download the apk file and enjoy!
link: https://drive.google.com/file/d/1pEIXuzqqIOUsTDmK1Iee8Z5llTGkCbqI/view?usp=drive_link

## Congratulations! Navigate through the app

Now please explore through our Certaflow Service!

### Things to be improved

Some fonts are not supported on certain devices. We will try to handle this issue, but it is not a major problem.
