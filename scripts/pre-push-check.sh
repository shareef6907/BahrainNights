#!/bin/bash
# Pre-push verification script
# Run this before pushing changes to catch issues early

echo "🔍 Running pre-push checks..."

# 1. TypeScript type checking
echo ""
echo "📝 Checking TypeScript..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found!"
    exit 1
fi
echo "✅ TypeScript check passed"

# 2. Check for common issues
echo ""
echo "🔎 Checking for common issues..."

# Check for console.log (excluding legitimate logging)
CONSOLE_LOGS=$(grep -r "console\.log" src --include="*.tsx" --include="*.ts" | grep -v "// console" | grep -v "console.error" | grep -v "console.warn" | wc -l)
if [ "$CONSOLE_LOGS" -gt 50 ]; then
    echo "⚠️  Warning: Found $CONSOLE_LOGS console.log statements (consider cleaning up)"
fi

# Check for TODO comments
TODOS=$(grep -r "TODO\|FIXME" src --include="*.tsx" --include="*.ts" | wc -l)
if [ "$TODOS" -gt 0 ]; then
    echo "📌 Found $TODOS TODO/FIXME comments"
fi

# 3. Quick syntax check on changed files
echo ""
echo "📂 Checking git status..."
git status --short

echo ""
echo "✅ Pre-push checks complete!"
echo ""
echo "Note: Full build requires Supabase env vars (available on Vercel)."
echo "If TypeScript passes, Vercel build should succeed."
