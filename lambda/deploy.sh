#!/bin/bash
# Lambda Deployment Script for BahrainNights Image Processor
# With AI Content Moderation using AWS Rekognition

echo "========================================"
echo "BahrainNights Lambda Deployment"
echo "========================================"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Set the Lambda function name
FUNCTION_NAME="bahrainnights-image-processor"
REGION="me-south-1"

# Create deployment package
echo "📦 Creating deployment package..."
cd "$(dirname "$0")"

# Check if node_modules exists (for sharp)
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Please ensure sharp is installed."
    echo "   Run this on an Amazon Linux 2 environment or use Lambda layer."
fi

# Create zip file
zip -r function.zip index.mjs node_modules 2>/dev/null || zip -r function.zip index.mjs

echo "📤 Uploading to Lambda..."
aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Lambda function updated successfully!"
    echo ""
    echo "⚠️  IMPORTANT: Make sure the Lambda IAM role has Rekognition permissions!"
    echo "   Add this policy to the Lambda execution role:"
    echo ""
    echo '   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": "rekognition:DetectModerationLabels",
       "Resource": "*"
     }]
   }'
else
    echo "❌ Failed to update Lambda function"
    exit 1
fi

echo ""
echo "========================================"
echo "Deployment Complete!"
echo "========================================"
