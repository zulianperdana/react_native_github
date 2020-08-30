
# Github

## React Native Github

React Native Github Commit Explorer.
short video demo https://streamable.com/3995wf

## Main Features:

- Login using your GitHub account with password / personal access token
- Browse commit by repository
- Offline Capability, you can access your search history and their commits without internet connection
- Dark Mode 
- Internationalization (support en and id, you can change the settings through your phone Language Settings)

## Extra Features:

- Search Repository Suggestions
- Pagination
- Filter commits made by you
- Access private repository

## Security:

- Your credential is stored securely with [https://github.com/oblador/react-native-keychain](https://github.com/oblador/react-native-keychain)

## Screenshoots
![enter image description here](https://github.com/zulianperdana/react_native_github/blob/master/screenshoots/ss1.png?raw=true)
![enter image description here](https://github.com/zulianperdana/react_native_github/blob/master/screenshoots/ss2.png?raw=true)
![enter image description here](https://github.com/zulianperdana/react_native_github/blob/master/screenshoots/ss3.png?raw=true)
![enter image description here](https://github.com/zulianperdana/react_native_github/blob/master/screenshoots/ss5.png?raw=true)

## Made with:
- Typescript
- [https://github.com/infinitered/ignite-bowser](https://github.com/infinitered/ignite-bowser) boilerplate (i usually use [https://github.com/infinitered/ignite-andross](https://github.com/infinitered/ignite-andross) so this is the first time i used this)

## Quick Start

Make sure you have your React Native environment set up.
```
1. git clone https://github.com/zulianperdana/react_native_github.git```
2. cd react_native_github
3. yarn install / npm install
4. react-native run-ios / react-native run-android
```

## Tested On

1. iOS 13.1 Emulator
2. Android 9 Real Device

## To Do

1. Add app icon
2. App Splashscreen for iOS and Android
3. Add automated Testing
4. Remove left over files from boilerplate
5. Improve pagination implementation (need to fetch total commit count)
6. Add branch functionality so user can explore indivual branch
