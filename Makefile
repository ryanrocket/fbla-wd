commit:
	git add -A 
	git commit -m "unsigned commit"
	git commit origin master
	echo "\n\nCommit Complete!"

build:
	nohup node server.js & disown;
	echo "\n-> Build Completed!"

dev:
	nodemon server.js 