commit:
	git add -A 
	git commit -m "unsigned commit"
	git push origin master
	echo "\n\nCommit Complete!\n\n"

build:
	nohup node server.js & disown;
	kill %1
	echo "\n-> Build Completed!\n\n"

dev:
	nodemon server.js 

purge:
	rm -rf ./temp
	rm -rf ./node_module
	touch output.pid
	echo "Purged Temp Files (+ Node Packaged)" >> ./output.pid