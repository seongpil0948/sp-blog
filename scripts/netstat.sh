#!/bin/bash

TYPE=$1
if [ -z "$TYPE" ]; then
  # usage: netstat.sh <type> <port> <label> 
  # exit 1
  TYPE=text
fi


LISTEN_PORT=$2
if [ -z "$LISTEN_PORT" ]; then
  # usage: netstat.sh <type> <port> <label> 
  # exit 1
  LISTEN_PORT=8080
fi

LABEL=$3
if [ -z "$LABEL" ]; then
  # usage: netstat.sh <type> <port> <label> 
  # exit 1
  LABEL=app=sc-ixi-admin-api
fi



# LISTEN_IP=178.133.54.238
# get pod label
# kubectl get pods -n ns-16975174264043953 --show-labels
# kubectl get pods -n ns-16975174264043953 --no-headers=true | awk '/sc-ixi-admin|pattern2/{print $1}'

LABEL=app=cr-ixi-admin-simplenlp
NS=$(kubectl get pods -A -l $LABEL --no-headers=true | awk '{print $1}' | uniq | head -n 1)
echo "$(kubectl get pods -n $NS  -o custom-columns=NAME:.metadata.name,IP:.status.podIP | grep -v -E 'instance')"

# get pod name
POD=$(kubectl get pods -n $NS -l $LABEL --no-headers=true -o custom-columns=NAME:.metadata.name,NAMESPACE:.metadata.namespace,IP:.status.podIP,Node:.spec.nodeName | head -n 1)
POD_NAME=$(cut -d ' ' -f 1 <<< $POD)
POD_IP=$(cut -d ' ' -f 3 <<< $POD)
echo "POD_NAME: $POD_NAME, POD_IP: $POD_IP"

CMD_TEXT="while true; do echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'; netstat -antl | grep $LISTEN_PORT; echo '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' ; sleep 3; done"
CMD_WC="while true; do echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'; netstat -antl | grep $LISTEN_PORT  | wc -l; echo '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' ; sleep 1; done"


if [ "$TYPE" == "text" ]; then
  kubectl -n $NS exec -it $POD_NAME -- /bin/bash -c "$CMD_TEXT"
elif [ "$TYPE" == "wc" ]; then
  kubectl -n $NS exec -it $POD_NAME -- /bin/bash -c "$CMD_WC"
else
  echo "Usage: netstat.sh <type> <port> <label> "
  exit 1
fi








# while true; do echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'; netstat -antl | grep '178.133.54.238'  | wc -l ; echo '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' ; sleep 3; done
# while true; do echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'; netstat -antl | grep ':8080'  | tail -n 10; echo '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' ; sleep 1; done
# while true; do echo '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'; netstat -antl | grep 'ES' | tail -n 5; echo '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' ; sleep 1; done

