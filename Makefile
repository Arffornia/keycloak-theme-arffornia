# Thin wrappers over npm scripts. `make check` is what CI runs.
# npm ci needs --legacy-peer-deps (peer ranges of the shadcn login package).
.PHONY: install check lint typecheck build theme storybook tokens tokens-check

install:
	npm ci --legacy-peer-deps

check: lint build

lint:
	npm run lint

# Type-check + Vite build (tsc -b runs inside `npm run build`)
build:
	npm run build

typecheck:
	npx tsc -b

# Full Keycloak theme JAR in dist_keycloak/ (needs Maven and Java)
theme:
	npm run build-keycloak-theme

storybook:
	npm run storybook

TOKENS_URL := https://raw.githubusercontent.com/Arffornia/Arffornia_Assets/main/ui/tokens/dist/tokens.css

tokens:
	curl -fsSL $(TOKENS_URL) -o src/tokens.css

tokens-check:
	curl -fsSL $(TOKENS_URL) | diff -u src/tokens.css -
