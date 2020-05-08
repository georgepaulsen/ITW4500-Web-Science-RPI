Martin Paulsen
paulsg
Lab 6 More Mongo Madness

INSTRUCTIONS
If you click the hamburger menu it outlines all the instructions for ease of use!

IMPROVEMNETS
For this lab I did a lot.
1. Atlas connected DB
2. Created a second schema to hold meta data for each query
3. queries now handle phrase searching instead of just keyword
4. display is less clunky, click into each article for details
5. Cleaned up code for more modern look and syntax and file work

EXPERIENCE / HARD STUFF
I wanted to do a lot, like whitelisting or blacklisting user enter domains. I also wanted
to remove duplicate entries which i did for the query data but for some reason the articles
were leaving out data when I prevented duplicates. The transitions are still clunky and
I could not figure out how to make them smooth given how I hid and displayed the data.
I also had a hard time making multiple insert and drop calls, but I eventually learned I could
stack them and create a json object to res.send()! I also wanted to paginate the results
but I could not figure that out unfortunatly.

EASY STUFF / CONCLUSION
I finally took the time to learn the funky new => javascript syntax as well as some other
shortcut things to do so I went through my code and modernized it so it looks all pretty.
I did some file work and moved the models into their own folder and wrote a function to sync
them in later.

Overall I am really getting the hang of some of this Node AngularJS and Mongo web development
and I can say that I like it a lot more than apache and php!
