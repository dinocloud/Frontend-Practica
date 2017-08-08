String apkTag = null

node {

    apkTag = (env.BRANCH_NAME == "master")? "0.0.${env.BUILD_NUMBER}" : "0.0.${env.BUILD_NUMBER}-${env.BRANCH_NAME}"

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
    /*In this stage install the dependencies */
    {
      sh "npm install"  /* Really important (it installs all your project dependencies) */
      sh "cordova platform rm android" /* Remove the old platform */
      sh "cordova platform add android " /* We say which plattform we built in the apk */
      sh "cordova build android --release " /* APK release creation */
      sh "mv platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/${apkTag}.apk"
      /*sh "jarsigner -keystore $PATH_TO_KEYSTORE platforms/android/build/outputs/apk/${apkTag}.apk -storepass $STORE_PASSWORD " # Signing the APK */
   }

    stage ('Upload apk to S3')
    {
      withCredentials([usernamePassword(credentialsId: 'aws-credentials', passwordVariable: 'AWS_SECRET_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')])
      {
        pwd = sh "pwd"
        sh "./upload-apk-s3.sh $pwd/platforms/android/build/outputs/apk $apkTag.apk $AWS_ACCESS_KEY_ID $AWS_SECRET_KEY "
      }
    }

    /*stage ('Clean')
    {
      deleteDir()
    }*/

    }

