lab 3 Streaming API
Martin Paulsen
webSci ITWS 4500 S20

Angular:
At first I had no idea how to really use angular beyond the lecture
and I was hard pressed to find a use for it as I could have done
all the data handling with jQuery. However, after doing some more
research and YouTubing I figured out some Angular! I used it for
all of my data handling with the API call and it made development
a lot faster and easier to read. After getting used to the syntax
I was able to pick it up quickly. Bootstrap is also becoming more
of my friend and allows me to more fluidly develop consistent elements.

Problems:
One problem I had was 404 link errors in my src tags where I used
angular to put the link to the photo. Once the page loads
the data is filled in, but the error gives some crack URL and I am not
sure how to get html to wait to check the src of the image, or give it
a default value.

Creativity:
For creativity I tried displaying information about the user who posted
the photo as well as the photo itself, (number of likes and a description
if the user placed one). I also took the current photos on the page and
found the one with the most likes, plucked the username and used that to
make another API call to pull that user's top 3 photos as well as their
bio.I display that information in the side panel that collapses and responds
tomy media query which auto-collapses the side bar if the screen is too small.
