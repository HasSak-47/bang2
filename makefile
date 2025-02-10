package: build build-js
	zip -r extension.zip dist

build:
	cp -r src/ dist/src
	cp manifest.json dist/manifest.json

build-js:
	tsc --project tsconfig.json
