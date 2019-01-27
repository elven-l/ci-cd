pipeline {
    agent {
        docker {
            image 'node:10.15.0-jessie' 
            args '-p 3000:3000' 
        }
    }
    stages {
         stage('SetRegister') { 
            steps {
                sh 'npm config set registry http://registry.npm.taobao.org/' 
            }
        }
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Run') { 
            steps {
                sh 'npm start' 
            }
        }
    }
}
