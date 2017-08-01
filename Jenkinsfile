String apkTag = null

node {

    apkTag = (env.BRANCH_NAME == "master")? "latest" : "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"

    parameters
     {
    string(name:'STORE_PASSWORD', defaultValue:'dinocloud123$', description: 'STORE_PASSWORD is the password use when we built keystore.')
    string(name:'PATH_TO_KEYSTORE',defaultValue:'/home/ubuntu/dinocloud.keystore', description:'PATH_TO_KEYSTORE is the path where we have the keystore key')
     }


    stage('Checkout')
    {
        checkout scm
    }

    stage('Build APK')
    /*In this stage install the dependencies and create the apk */
    {
      sh "npm install"  /* Really important (it installs all your project dependencies) */
      sh "ionic cordova platform rm android" /* Clean the old plattform */
      sh "ionic cordova platform add android" /* We say which plattform we built in the apk */
      sh "ionic cordova build --release" /* APK release creation */
      sh "./upload-apk-s3.sh"
    }

    }
