# sleep-firebase 
[![Build and Deploy](https://github.com/mcatta/sleep-firebase/actions/workflows/main.yml/badge.svg)](https://github.com/mcatta/sleep-firebase/actions/workflows/main.yml)

This is the serverless backend used for the [Android App Sleep](https://github.com/mcatta/sleep). It provides two API:

- `/media` used to retrive the list of audio tracks
- `/media/{id}/url` used to ask the URL for a specific audio track. This URL is signed with a specific expire time.

