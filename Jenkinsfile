pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20'  // Tên NodeJS bạn cấu hình trong Jenkins Tools
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/iamhafa/university-library-api.git', branch: 'main'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'node -v'
        sh 'yarn -v'
        sh 'yarn install --frozen-lockfile'  // tương đương với npm ci
      }
    }

    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
  }

  post {
    success {
      echo '✅ Build thành công!'
    }
    failure {
      echo '❌ Build thất bại!'
    }
  }
}
