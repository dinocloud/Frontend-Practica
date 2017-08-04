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
    /*In this stage install the dependencies */
    {
      sh "npm install"  /* Really important (it installs all your project dependencies) */
      sh "cordova platform rm android"
      sh "cordova platform add android " /* We say which plattform we built in the apk */
      sh "cordova build android --release " /* APK release creation */
    }

    stage ('Upload apk to S3')
    {
      /*

      withCredentials([usernamePassword(credentialsId: 'aws-credentials', passwordVariable: 'AWS_REGISTRY_PASS', usernameVariable: 'AWS_REGISTRY_USER')])
        {
        sh "./upload-apk-s3.sh $AWS_REGISTRY_PASS $AWS_REGISTRY_USER"
        }
        */
    }

    }
