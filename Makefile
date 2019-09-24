LIGHT_OUTPUT = ./nohup.out

commit:
	git add -A 
	git commit -m "${message}"
	git push origin master
	echo "\n\nCommit Complete!\n\n"

build:
	nohup node server.js & disown;
	echo ^c
	echo "\n-> Build Completed!\n\n"

dev:
	nodemon server.js 

purge:
	rm -rf ./temp
	rm -rf ./node_module
	touch output.pid
	echo "Purged Temp Files (+ Node Packaged)" >> ./output.pid

commit-beta:
	git add -A 
	git commit -m "${message}"
	git push origin master:beta
	echo "\n\nCommit Complete!\n\n"

version:
	# Node Project FBLA-WD Version ~1.0.3

.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~ 

$(ODIR)/%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)