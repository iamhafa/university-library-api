pipeline {
  agent any

  environment {
    NODE_VERSION = '20'
  }

  stages {
    stage('Clone') {
      steps {
        // Nếu dùng GitHub, GitLab,...
        git url: 'https://github.com/iamhafa/university-library-api.git', branch: 'main'
      }
    }

    stage('Install Node.js') {
      steps {
        script {
          // Sử dụng NodeJS plugin (nếu đã cài trên Jenkins) hoặc cài thủ công
          // Hoặc dùng nvm, hoặc container agent có sẵn Node.js
          sh "curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -"
          sh "apt-get install -y nodejs"
          sh "node -v"
          sh "npm -v"
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }

  post {
    success {
      echo '✅ Build và test thành công!'
    }
    failure {
      echo '❌ Có lỗi xảy ra!'
    }
  }
}
