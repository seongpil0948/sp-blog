# follow the logs that last modified in the directory
# Usage: last-log.sh /logs/ixi-admin-api/svc/

DIR_PATH=$1
if [ -z "$DIR_PATH" ]; then
  # echo "Usage: last-log.sh /logs/ixi-admin-api/svc/"
  # exit 1
  DIR_PATH="/logs/ixi-admin-api/svc"
fi

ls -lt $DIR_PATH | head -n 2 | awk '{print $9}' | awk -v dir_path=$DIR_PATH '{print dir_path"/"$1}' | xargs tail -f

# follw the logs that last modified in the directory with depth
# Usage: last-log.sh /logs/ixi-admin-api/svc/ 2

tree -L /logs/ixi-admin-api/svc | grep -v "directories" | grep -v "files" | grep -v "bytes" | grep -v "total" | grep -v "KB" | grep -v "MB" | grep -v "GB" | grep -v "TB" | grep -v "B" | grep -v "K" | grep -v "M" | grep -v "G" | grep -v "T
