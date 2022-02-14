# DeskCut
An easy to use app that lets you create Desktop Shortcuts (.desktop files) on Linux without requiring to mess with `.desktop` files!

![image](https://user-images.githubusercontent.com/25067102/152531646-1988e573-bd4d-495b-8d63-de00a3905c29.png)

## How to use
### <a href="#">Download from Snap Store</a>
Snap version will no longer be supported due to several issues that come up because of sandboxing. Please use the DEB or the AppImage version till another alternative is provided.

### Manual Installation:
Go to the releases section and download DeskCut's latest version, Install and that's it!   

- You can download either the `.deb` version or the `AppImage`.   
- Use the `.deb` file to directly install it using your store app. Please remember that .deb files only work on Debian based distros like Ubuntu, ZorinOS, PopOS, Mint, KDE Neon, etc. DEB file will not work on Fedora/Manjaro/Arch.   
- AppImage is portable and it works almost everywhere. It should be fine for most people but remember that it doesn't integrate by default. You'll have to run the file everytime you want to use the app because AppImages aren't supposed to be installed on a system. So make sure you use something like <a href="https://github.com/TheAssassin/AppImageLauncher/releases/" target="_blank">AppImage Launcher</a> to properly install it on your system. 


## Build Instructions

You'll need `node` and `npm` or `yarn`.
### To install node, you can use fnm:
```bash
`curl -fsSL https://fnm.vercel.app/install | bash`   
```
Add `eval "$(fnm env --use-on-cd)"` to your .bashrc or .zshrc and then   
```bash
source .bashrc
OR
source .zshrc`
```
Then type
```bash
fnm install 16.13.2
fnm use 16.13.2
```
Node is now installed.

### OPTIONAL: Install Yarn
Yarn is not necessary, npm can do exactly the same thing but I used yarn to create this project (Totally irrelevant).   
But if you still want to use Yarn:   
```
npm install --global yarn
```
### Set up project
Now cd to the location where you cloned this project and run:   
```bash
npm install
or
yarn install
```

### Run Development Build
```bash
npm run start
OR
yarn start
```

### To Package Build
```bash
npm run dist
OR
yarn dist
```

## To-Do

- [ ] Dark Mode
- [ ] Auto-Update AppImage
