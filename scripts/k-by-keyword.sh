#!/bin/bash

# first argument is the keyword-ns
# second argument is the keyword-pod

KEYWORD_NS=$1
KEYWORD_POD=$2

# if blank, error
if [ -z "$KEYWORD_NS" ] || [ -z "$KEYWORD_POD" ]; then
  echo "Usage: k-by-keyword.sh <keyword-ns> <keyword-pod>"
  exit 1
fi

NAMESPACES=$(kubectl get ns | grep $KEYWORD_NS | awk '{print $1}' | uniq)
for ns in $NAMESPACES; do
  PODS=$(kubectl get pods -n $ns | grep $KEYWORD_POD | awk '{print $1}')
  for pod in $PODS; do
    echo "kubectl -n $ns exec -it $pod -- /bin/bash"
  done
done
```
