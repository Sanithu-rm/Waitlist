#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

usage() {
  cat <<'EOF'
Usage: ./up.sh [up|down|build|logs|restart]

Commands:
  up       Start containers (default). Equivalent to docker-compose up --build
  down     Stop and remove containers
  build    Rebuild services
  logs     Tail logs for all services
  restart  Restart all services
EOF
}

ACTION="${1:-up}"

case "$ACTION" in
  up)
    docker-compose up --build
    ;;
  down)
    docker-compose down
    ;;
  build)
    docker-compose build
    ;;
  logs)
    docker-compose logs -f
    ;;
  restart)
    docker-compose down
    docker-compose up --build
    ;;
  help|*)
    usage
    ;;
esac

