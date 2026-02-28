pipeline {
    agent any

    environment {
        IMAGE_NAME = "anik4good/peptide"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        VERSION_PREFIX = "1.0"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    env.IMAGE_TAG = "${VERSION_PREFIX}.${env.BUILD_NUMBER}"
                    sh """
                        docker build -t $IMAGE_NAME:$IMAGE_TAG .
                        echo "Built image tag: $IMAGE_NAME:$IMAGE_TAG"
                    """
                }
            }
        }

        stage('Login to Docker Hub & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                        docker logout
                    """
                }
            }
        }

        // stage('Deploy to K3s') {
        //     steps {
        //         withCredentials([file(credentialsId: 'k3s-kubeconfig', variable: 'KUBECONFIG_FILE')]) {
        //             sh """
        //                 export KUBECONFIG=$KUBECONFIG_FILE
        //                 # Apply everything in k3s_deploy
        //                 kubectl apply -f k3s_deploy/ -n default
        //                 # Force pods to refresh latest image
        //                 kubectl rollout restart deployment app -n default
        //             """
        //         }
        //     }
        // }

    //     stage('Verify Deployment') {
    //         steps {
    //             withCredentials([file(credentialsId: 'k3s-kubeconfig', variable: 'KUBECONFIG_FILE')]) {
    //                 sh """
    //                     export KUBECONFIG=$KUBECONFIG_FILE

    //                     # Apply Deployment manifests
    //                     kubectl apply -f k3s_deploy/ -n default

    //                     # Force pods to refresh latest image
    //                     kubectl rollout restart deployment app -n default

    //                     # Wait for rollout to complete
    //                     kubectl rollout status deployment/app -n default --timeout=120s || \
    //                     kubectl logs -l io.kompose.service=app -n default --tail=20
    //                 """
    //             }
    //         }
    //     }
    // }

    }

    post {
        always {
            cleanWs()
        }
    }
}
