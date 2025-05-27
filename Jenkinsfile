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

    stage('Install dependencies') {
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm ci'
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
