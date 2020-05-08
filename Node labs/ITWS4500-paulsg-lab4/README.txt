Martin Paulsen
paulsg
Lab 4 revised

With the weekend and some help from one of my groupmates I was able to get the
lab to work properly. I learned a great deal about serving files with express
and how to effectively have angular and node communicate. The problem I was
facing was that I was not writing the data from the api call to a page
that the http request from angularJS was calling. I was trying to read
the static file which was not on the server. Once I outputted the data to a
page I was able to have angularJS properly read and capture the data.

I was happy that I took the extra time to get this lab working correctly
as this basic express stuff is crucial not to fall behind on.


 *** IGNORE THIS OLD README I FIGURE IT OUT ***
As you can tell I had a lot of problems with this lab.

I was able to have node run as my server, and send API requests
to node, have node make the call with the input data, create and
or update the json file, and pushed it out.
BUT for the life of me a could not figure out how to get angular to
pick up the file after I sent it out. I think I needed to serve the
file somehow and I could not get node to update after creating the file
I tried to use socket.io, but I was not able to get it working and the
api calls were failing so I reverted to this version.
The console kept saying 404 json file not found, but I was serving
all my static files with express. Even when the file was created before
angularjs could not find it. I was really
frustrated as I could not send the data from node to the front end
to display it but I could create it and push it to a file.

I feel pretty lost in terms of how to do it without socket and even with
socket I kept getting errors.
