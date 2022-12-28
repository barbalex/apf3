# find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
find src/components/Ekf -name "*.ts" -exec sh -c 'mv "$0" "${0%.ts}.tsx"' {} \;
