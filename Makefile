CWD=`pwd`

build:
	@interleave -o timelord.js src/timelord.js
	
test:
	# node test/db.js

.PHONY: test