pipeline {
    agent any
    stages {
        stage('git repo clone') {
            steps {
                git branch: 'main', url: 'https://github.com/JRiyaz/my-movie-plan.git'
            }
        }
        // stage('clean') {
        //     steps {
        //         sh "mvn clean"
        //     }
        // }
        // stage('package') {
        //     steps {
        //         sh "mvn package"
        //     }
        // }
        // stage('docker build') {
        //     steps {
        //         sh "docker build -t employee-management ."
        //     }
        // }
        stage('docker compose build') {
             steps {
                 sh "docker-compose build"
             }
        }

        stage('docker compose start') {
             steps {
                 sh "docker-compose up"
             }
        }
    }
}