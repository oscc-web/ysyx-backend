#!/usr/bin/env bash

set -e

PATH_ROOT=${PWD}
PATH_NODE=${PATH_ROOT}/node_modules/

if [ ! -f ${PATH_ROOT}/src/config/config-dynamic.ts ]; then
    cat > ${PATH_ROOT}/src/config/config-dynamic.ts << EOF
module.exports = {
    dbUsername: "",
    dbPassword: "",
    dbName: ""
}
EOF
fi

if [ ! -d ${PATH_NODE} ]; then
    echo ""
    echo "Downloading Node.js packages..."
    npm install
else
    echo ""
    echo -n "Do you want to update Node.js packages? [Y/n]: "
    read choice
    if [ ${choice} == "Y" ]; then
        npm install
    fi
    echo "Already up to date."
fi
