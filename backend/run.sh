#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

case "${1:-run}" in
  build)
    javac -d out $(find src/main/java -name "*.java")
    ;;
  run)
    javac -d out $(find src/main/java -name "*.java")
    java -cp out org.openpayment.Main
    ;;
  *)
    echo "Usage: ./run.sh [build|run]"
    exit 1
    ;;
esac
