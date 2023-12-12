#!/usr/bin/env bash

PRJ_DIR=$(cd $(dirname $0); pwd)

if [ ! -d $PRJ_DIR/db ]; then
    mkdir $PRJ_DIR/db
    cat > $PRJ_DIR/db/books.json << EOF
    [
        {
            "id": "riscv-reader",
            "download": 0
        }
    ]
EOF
fi
