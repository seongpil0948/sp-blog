# follow the logs that last modified in the directory
# Usage: last-log.sh /logs/ixi-admin-api/svc/

DIR_PATH=$1
DEEP=$2

if [ -z "$DIR_PATH" ]; then
  DIR_PATH="/logs/ixi-admin-api/svc"
fi
if [ -z "$DEEP" ]; then
  DEEP=1
fi

if [ $DEEP -eq 1 ]; then
  find $DIR_PATH -type f -print0 | xargs -0 stat --format '%Y :%y %n' | sort -nr | cut -d: -f2- | head -n 1 | xargs tail -f
else
  ls -lt $DIR_PATH | head -n 2 | awk '{print $9}' | awk -v dir_path=$DIR_PATH '{print dir_path"/"$1}' | xargs tail -f
fi


