all: docs

docs:
	@hugo
	@mv public docs

clean:
	@rm -rf public docs
