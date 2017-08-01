withCredentials([usernamePassword(credentialsId: 'aws-credentials', passwordVariable: 'AWS_REGISTRY_PASS', usernameVariable: 'AWS_REGISTRY_USER')])
{
  path=$1
  file=$2
  aws_path=$3
  bucket='practica-apks'
  date=$(date +"%a, %d %b %Y %T %z")
  acl="x-amz-acl:public-read"
  content_type='application/x-compressed-tar'
  string="PUT\n\n$content_type\n$date\n$acl\n/$bucket$aws_path$file"
  signature=$(echo -en "${string}" | openssl sha1 -hmac "${AWS_REGISTRY_USER}" -binary | base64)
  curl -X PUT -T "$path/$file" \
    -H "Host: $bucket.s3.amazonaws.com" \
    -H "Date: $date" \
    -H "Content-Type: $content_type" \
    -H "$acl" \
    -H "Authorization: AWS ${AWS_REGISTRY_PASS}:$signature" \
    "https://$bucket.s3.amazonaws.com$aws_path$file"
}

for file in "$path"/*; do
  putS3 "$path" "${file##*/}" "/apks/"
done
