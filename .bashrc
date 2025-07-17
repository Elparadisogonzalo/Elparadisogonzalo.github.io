 HEAD
export GIT_DISCOVERY_ACROSS_FILESYSTEM=1
=======
export ANDROID_NDK_HOME=$HOME/android-ndk-r25b
export android_ndk_path=$ANDROID_NDK_HOME
export PATH=$PATH:$ANDROID_NDK_HOME

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
<<<<<<< HEAD
>>>>>>> origin/master
=======
alias syncup="git add . && git commit -m '🔄 Sync update' && git pull --rebase origin main && git push origin main"
alias syncdown="git pull --rebase origin main"
 293eda3f6a (🔄 Sync update)
