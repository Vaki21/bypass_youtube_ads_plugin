# youtube-ad-bypasser-plugin

Chrome plugin and background service for bypassing YouTube Ads.

Plugin onClick will send POST request to the background service which will execute command youtube-dl. After the file is downloaded it will create a basic HTML page with the downloaded video. After closing the window the video file will be deleted.
