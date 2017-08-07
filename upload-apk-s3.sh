#!/bin/bash
path=$1
file=$2
AWS_ACCESS_KEY_ID=$3
AWS_SECRET_KEY=$4
aws_path='apks'
bucket='practica-apks'
date=`date -R`
content_type='application/vnd.android.package-archive'
string="PUT\n\n$content_type\n$date\n/$bucket/$aws_path/$file"
signature=$(echo -en "${string}" | openssl sha1 -hmac "${AWS_SECRET_KEY}" -binary | base64)
curl --verbose -k -X PUT -T "$path/$file" \
  -H "Host: $bucket.s3.amazonaws.com" \
  -H "Date: $date" \
  -H "Content-Type: $content_type" \
  -H "Authorization: AWS ${AWS_ACCESS_KEY_ID}:$signature" \
  "https://$bucket.s3.amazonaws.com/$aws_path/$file"

