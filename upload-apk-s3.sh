#!/bin/bash
path=$1
file=$2
AWS_REGISTRY_PASS=$3
AWS_USERNAME=$4
aws_path='/apks'
bucket='practica-apks'
date=$(date +"%a, %d %b %Y %T %z")
acl="x-amz-acl:public-read"
content_type='application/x-compressed-tar'
string="PUT\n\n$content_type\n$date\n$acl\n/$bucket$aws_path$file"
signature=$(echo -en "${string}" | openssl sha1 -hmac "${AWS_USERNAME}" -binary | base64)
echo $1
curl -X PUT -T "$path/$file" \
  -H "Host: $bucket.s3.amazonaws.com" \
  -H "Date: $date" \
  -H "Content-Type: $content_type" \
  -H "$acl" \
  -H "Authorization: AWS ${AWS_REGISTRY_PASS}:$signature" \
  "https://$bucket.s3.amazonaws.com/$aws_path/$file"

/*curl -X PUT -T "platforms/android/build/outputs/apk/0.0.49-devops_files.apk" \
  -H "Host: practica-apks.s3.amazonaws.com" \
  -H "Content-Type: application/x-compressed-tar" \
  -H "Date: $(date +"%a, %d %b %Y %T %z")" \
  -H "x-amz-acl:public-read" \
  -H "Authorization: AWS Da0sgYVIpzpPQnJIiZ+6nlq5ltVeSz0GgHBowEVC:$(echo -en \"${string}\" | openssl sha1 -hmac "" -binary | base64)" \
  "https://practica-apks.s3.amazonaws.com/apks/0.0.49-devops_files.apk"*/


