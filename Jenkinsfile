pipeline {
  agent {
    docker {
      image 'node:20'
      args '-u root' // Chạy với quyền root trong container, giúp tránh lỗi permission
    }
  }

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

    stages {
    stage('Install & Build') {
      steps {
        sh 'node -v'
        sh 'npm ci'
        sh 'npm run build'
      }
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
