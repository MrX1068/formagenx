#!/bin/bash

echo "🔧 Enabling corepack"
corepack enable

echo "📦 Preparing pnpm@10.12.4"
corepack prepare pnpm@10.12.4 --activate

echo "📁 Installing dependencies with pnpm@$(pnpm -v)"
pnpm install --no-frozen-lockfile --prefer-offline

echo "🏗 Running build"
pnpm build
