# setup.sh
# sets up penpal

cd ./src;

echo -n "Enter your Microsoft Bot Framework app ID and press [ENTER]: ";
read app_id;
sed 's/APP_ID/'$app_id'/g' ./app.js;

echo -n "Enter your Microsoft Bot Framework app password and press [ENTER]: ";
read app_password;
sed 's/APP_PASSWORD/'$app_password'/g' ./app.js;

npm install;
node app.js;
