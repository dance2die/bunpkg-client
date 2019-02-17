[![Netlify Status](https://api.netlify.com/api/v1/badges/75669d62-e1fe-4137-9bf9-a6314260fbdc/deploy-status)](https://app.netlify.com/sites/bunpkg/deploys)
[![Known Vulnerabilities](https://snyk.io/test/github/dance2die/bunpkg-client/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dance2die/bunpkg-client?targetFile=package.json)

# What?

Build UNPKG links & script tags.  
Here is a demo.

[![Demo Video](https://img.youtube.com/vi/67MQcDrDNg4/0.jpg)](https://youtu.be/67MQcDrDNg4)

## Backend code

Source code is available on [dance2die/bunpkg-server](https://github.com/dance2die/bunpkg-server).

# Why?

A few reasons

1. Inspired by Michael Jackson on how he got started with UNPKG on React Podcast Episode 19, "[Supporting Open Source with Michael Jackson](https://reactpodcast.simplecast.fm/19)".
1. To make it easier to generate `<script>` tags for UNPKG.
1. To learn continuously.

# ToDo

- Iron out bugs - When back-end running on Heroku is unreachable, notify users
- Learn how to set up Redis to cache package names & version info
- Learn how to use CloudFlare API
- After caching works, make it work like CodeSandBox "Add Dependency" dialog box
- Make it available offline (PWA)
- Learn & apply Accessibility features
