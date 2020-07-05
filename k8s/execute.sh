export NAME=eksdemo.k8s.local
export KOPS_STATE_STORE=s3://eks-demo-state-storage
 kops create cluster --zones us-east-1a,us-east-1b,us-east-1c ${NAME}
 kops update cluster --name eksdemo.k8s.local --yes
 kops validate cluster
kubectl apply -f task/k8s