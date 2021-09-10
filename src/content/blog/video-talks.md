# [Video Talk Prepping](#/blog/video-talks) {.title}

Arjen Rouvoet -- January 16 2020

---

These are the years of online conferences. Prepping a video talk is tricky and
requires some fiddling with tools. To save you some time this blog documents the
setup that I arrived at after said fiddling.  I'm not an expert, but have at
least one data point that indicates [that it works](https://www.youtube.com/watch?v=LqudAqCmecQ).

The tools I used are all open source software available in most linux distributions,
and probably also available on macOS, although mileage me vary.

## Slides

I won't say much about making slides, since it is mostly just a matter of
preference.  Something to keep in mind is that slides that are watched on screen
as part of a video have different requirements than the ones you beam to the
big, low-contrast screen in front of a live audience.

My take is that you can be a bit more generous in using smaller fonts (don't
overdo it!). Dark backgrounds also work much better than with low-contrast
beamer displays.

People sometimes ask me what I use to draw my slides digitally. The answer is:
xournal++ and the large wacom one tablet. This works well, but it takes a lot
of patience to make handwriting sufficiently legible.

## Setting up the audio

The audio quality may be the most important part of the video. I highly
recommend to record with a good dedicated microphone. Do some tests to check if
is positioned well, any whether closeby noise sources can be heard in the
background (your laptop blasting air for example...).  Reverb due to the room
can be annoying and can not entirely be avoided without treating the room, but
it helps to get a good mic closeby and set it to low gain and whatever
non-ambient mode it has (e.g., my Blue mic has a cardioid polar pattern meant
for podcasts).

## Setting up the recording

OBS is the go-to tool to setup a nice video stream or recording. It is easy
enough to set up and is is easy to switch between multiple scenes if you want
for example to switch from slides to a code demo.  Scenes can consist of
multiple (slices of) windows/webcam video inputs/images/text/etc. I rather
enjoyed setting up something that looks nice. It takes little effort to make it
look like you put a lot of effort into it.

To make sure you record high-quality source material you have to look at a
number of settings in OBS. (Disclaimer: again, I am not an expert, but this
worked for me.)

-
-
-

Now you just have to check that it has the right audio device set for recording.
You may also have to check that it does/does not record the system audio output,
depending on what you want. Hit record, and test it out before the real take!

(Pro tip: make sure you have enough hard drive space. These video settings make for
big video files in the order of 2-3Gb/30min.)

## Post-processing and Subtitles

- Audacity
- Kdenlive
- Aegisub

