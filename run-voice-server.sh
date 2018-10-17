#!/usr/bin/env bash -x

export AWS_PROFILE=${1:-default}

pip3 list | grep boto3
retVal=$?

if [ ${retVal} -ne 0 ]; then
 pip3 install boto3
fi

python3 polly-server/server.py
