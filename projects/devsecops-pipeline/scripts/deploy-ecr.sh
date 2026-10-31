#!/usr/bin/env bash
# ==============================================================================
# AWS ECR Image Push & Tagging Script
# Author: Anu Sah (@Anusah99)
# ==============================================================================

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-123456789012}"
ECR_REPO="${ECR_REPO:-secops-enterprise-service}"
IMAGE_TAG="${1:-$(git rev-parse --short HEAD)}"

ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"

echo -e "\033[1;36m[+] Authenticating Docker with AWS ECR (${AWS_REGION})...\033[0m"
aws ecr get-login-password --region "${AWS_REGION}" | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

echo -e "\033[1;34m[+] Tagging image ${ECR_REPO}:${IMAGE_TAG} -> ${ECR_URI}:${IMAGE_TAG}...\033[0m"
docker tag "${ECR_REPO}:${IMAGE_TAG}" "${ECR_URI}:${IMAGE_TAG}"
docker tag "${ECR_REPO}:${IMAGE_TAG}" "${ECR_URI}:latest"

echo -e "\033[1;34m[+] Pushing image to AWS ECR...\033[0m"
docker push "${ECR_URI}:${IMAGE_TAG}"
docker push "${ECR_URI}:latest"

echo -e "\033[1;32m[✓] Successfully deployed image to ${ECR_URI}:${IMAGE_TAG}\033[0m"
