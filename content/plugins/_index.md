---
title: "Plugins"
date: 2019-02-25T10:58:28+01:00
weight: 5
draft: false
pre: "<i class='fas fa-puzzle-piece' style='color:#b33636;'></i> "

---

Pwnagotchi has a simple plugin system that you can use to customize your unit and its behavior. You can place your plugins anywhere
as Python files, and then edit the `config.yml` file (`main.plugins` value) to point to their containing folder. Check the [plugins folder](https://github.com/evilsocket/pwnagotchi/tree/master/pwnagotchi/plugins/default) in the main Pwnagotchi repo for a list of  plugins included by default as well as all the callbacks that you can define for your own customizations.

## Default plugins

Plugin Script | Description
--------------|------------
`auto-backup.py` | Backs up files when internet is available.
`auto-update.py` | `apt update && apt upgrade` when internet is available.
`example.py` | Example plugin for Pwnagotchi that implements all the available callbacks.
`gps.py` | Saves GPS coordinates whenever a handshake is captured.
`grid.py` | Signals the unit's cryptographic identity and (optionally) a list of pwned networks to PwnGRID at api.pwnagotchi.ai.
`memtemp.py` | Adds a memory and temperature indicator.
`net-pos.py` | Saves WiFi position whenever a handshake is captured and retrieves the geolocation when internet is next available.
`onlinehashcrack.py` | Automatically uploads handshakes to [onlinehashcrack.com](https://onlinehashcrack.com).
`quickdic.py` | Runs a quick dictionary scan against captured handshakes.
`screen_refresh.py` | Refreshes the e-ink display after X amount of updates.
`twitter.py` | Creates tweets about the recent activity of Pwnagotchi.
`ups_lite.py` | Add a voltage indicator for the UPS Lite v1.1.
`wigle.py` | Automatically uploads collected WiFi handshakes to [wigle.net](https://wigle.net/).
`wpa-sec.py` | Automatically uploads handshakes to [wpa-sec.stanev.org](https://wpa-sec.stanev.org).

## Example
To illustrate how easy it is to add additional functionality via the plugin system, here is the code for the GPS plugin (`gps.py`):

```python
__author__ = 'evilsocket@gmail.com'
__version__ = '1.0.0'
__name__ = 'gps'
__license__ = 'GPL3'
__description__ = 'Save GPS coordinates whenever an handshake is captured.'

import logging
import json
import os

running = False
OPTIONS = dict()


def on_loaded():
    logging.info("gps plugin loaded for %s" % OPTIONS['device'])


def on_ready(agent):
    global running

    if os.path.exists(OPTIONS['device']):
        logging.info("enabling gps bettercap's module for %s" % OPTIONS['device'])
        try:
            agent.run('gps off')
        except:
            pass

        agent.run('set gps.device %s' % OPTIONS['device'])
        agent.run('set gps.speed %d' % OPTIONS['speed'])
        agent.run('gps on')
        running = True
    else:
        logging.warning("no GPS detected")


def on_handshake(agent, filename, access_point, client_station):
    if running:
        info = agent.session()
        gps = info['gps']
        gps_filename = filename.replace('.pcap', '.gps.json')

        logging.info("saving GPS to %s (%s)" % (gps_filename, gps))
        with open(gps_filename, 'w+t') as fp:
            json.dump(gps, fp)
```
