PACKAGE := extension.zip

SRC_DIR := src
DIST_DIR := dist

TS_CONFIG := tsconfig.json

.PHONY: package build build-js clean

package: build build-js
	zip -r $(PACKAGE) $(DIST_DIR)

build: prepare-dist copy-src copy-manifest

build-js:
	tsc --project $(TS_CONFIG)

prepare-dist:
	@mkdir -p $(DIST_DIR)

copy-src:
	cp -r $(SRC_DIR)/ $(DIST_DIR)/$(SRC_DIR)/

copy-manifest:
	cp manifest.json $(DIST_DIR)/manifest.json

clean:
	@rm -rf $(DIST_DIR) $(PACKAGE)
