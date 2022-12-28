# find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
find src/components/Projekte/TreeContainer/contextmenu -name "*.tx" -exec sh -c 'mv "$0" "${0%.tx}.tsx"' {} \;
# find src/components/Projekte/TreeContainer/contextmenu -name "*.ts" -exec sh -c 'mv "$0" "${0%.ts}.tsx"' {} \;