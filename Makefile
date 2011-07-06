

default: build

lib/parser.js: lib/parser.y lib/lexer.l
	jison -o $@ $^

build: lib/parser.js

clean:
	rm -f lib/parser.js test/*.js

all: build
