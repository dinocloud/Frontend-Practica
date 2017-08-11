String apkTag = null

node {

    apkTag = (env.BRANCH_NAME == "master")? "0.0.${env.BUILD_NUMBER}" : "0.0.${env.BUILD_NUMBER}-${env.BRANCH_NAME}"

     stage('Checkout')
    {
        checkout scm
    }

    stage('Build APK')
    /*In this stage, we build the apk using ionic cordova framework */
    {
      sh "npm uninstall --no-save"
      sh "npm install"  /* Really important (it installs all your project dependencies) */
      sh "ionic cordova platform rm android || true " /* Remove the old platform */
      sh "ionic cordova platform add android " /* We say which plattform we built in the apk */
      sh "ionic cordova build android --prod --release " /* APK release creation */
      sh "mv platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/${apkTag}.apk"
    }

    stage ('Upload apk to S3')
    {
      withCredentials([usernamePassword(credentialsId: 'aws-credentials', passwordVariable: 'AWS_SECRET_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')])
      {
        sh "./upload-apk-s3.sh $WORKSPACE/platforms/android/build/outputs/apk ${apkTag}.apk $AWS_ACCESS_KEY_ID $AWS_SECRET_KEY "
      }
    }

    stage ('Clean')
    {
      deleteDir()
    }

    }

