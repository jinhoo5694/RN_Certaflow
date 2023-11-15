## Step 1: Clone the project

IMPORTANT: The whole instruction is based on an assumption that your environment is properly set up with React Native
project
If not, please follow through this guideline: https://reactnative.dev/docs/environment-setup

If the requirements are not met, then you might not be able to run the project properly.

First, you need to clone this repository into your local repository, with 'master' branch.

Then, install the dependencies that are required.

```bash
git clone -b master https://github.com/jinhoo5694/RN_Certaflow.git
yarn
```

## Step 2: Start your Application

Currently, the project is perfectly working on iOS environment, but still debugging on Android environment.

Therefore, the instructions are for ios environment only.

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

## Congratulations! Navigate through the app

Now please explore through our Certaflow Service!

### Things to be improved

1. Currently, Google Map for Android is not working properly. We will fix this issue shortly.
2. Our Backend Server is still in development. Therefore, all the data available on the application is a static
   dummy-data. We will integrate the service soon.
3. Some fonts are not supported on certain devices. We will try to handle this issue, but it is not a major problem.
