build/.git:
	-rm -r build/
	git clone git@github.com:ElessarWebb/ElessarWebb.github.io.git build/

gh-page: build/.git
	yarn compile
