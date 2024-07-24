# Create a new package

To create a new package, you need to create a new directory in the `packages` directory. The name of the directory should be the name of the package.

## Example for a TS lib using Vite

```bash
mkdir -p packages/new-package/src
echo "console.log('Hello, World!');" > packages/new-package/index.ts
cd packages/new-package
pnpm init

pnpm add -D @types/node

cat <<< $(jq 'del(.description)' package.json) > package.json
cat <<< $(jq '.type = "module"' package.json) > package.json
cat <<< $(jq '.version = "0.0.0"' package.json) > package.json
cat <<< $(jq '.devDependencies.vite = "catalog:vite5"' package.json) > package.json
cat <<< $(jq '.devDependencies.typescript = "catalog:typescript5"' package.json) > package.json
cat <<< $(jq '.name = "@my-org/new-package"' package.json) > package.json
cat <<< $(jq '.scripts.dev = "vite build --watch"' package.json) > package.json
cat <<< $(jq '.scripts.build = "vite build"' package.json) > package.json
cat <<< $(jq '.scripts.preview = "vite preview"' package.json) > package.json

cat <<< $(jq '.main = "./dist/my-lib.cjs"' package.json) > package.json
cat <<< $(jq '.module = "./dist/my-lib.js"' package.json) > package.json
cat <<< $(jq '.exports = { ".": { "import": "./dist/my-lib.js", "require": "./dist/my-lib.cjs" } }' package.json) > package.json

pnpm install

# Add basic vite.config.ts
cat > vite.config.ts <<EOF
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'MyLib',
      fileName: 'my-lib',
    },
  },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
});
EOF

# Add basic tsconfig.json
cat > tsconfig.vite.json <<EOF
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.vite.tsbuildinfo",
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
EOF

cat > tsconfig.app.json <<EOF
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["index.ts", "src/**/*.ts", "src/**/*.tsx"]
}
EOF

cat > tsconfig.json <<EOF
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.vite.json"
    }
  ]
}
EOF
```
