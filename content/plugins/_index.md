---
title: "Plugins"
date: 2019-02-25T10:58:28+01:00
weight: 5
draft: false
pre: "<i class='fas fa-puzzle-piece'></i> "

---

Pwnagotchi has a simple plugin system that you can use to customize your unit and its behavior. You can place your plugins anywhere
as Python files, and then edit the `config.toml` file (`main.custom_plugins` value) to point to their containing folder. Check the [plugins folder](https://github.com/evilsocket/pwnagotchi/tree/master/pwnagotchi/plugins/default) in the main Pwnagotchi repo for a list of  plugins included by default as well as all the callbacks that you can define for your own customizations.

## Default plugins
These plugins are maintained in the main `pwnagotchi` repository. New versions will be automatically
available when you use the `auto-update` feature.

Plugin Script | Description
--------------|------------
`auto-update.py` | `apt update && apt upgrade` when internet is available.
`bt-tether.py` | Makes the display reachable over bluetooth.
`gpio_buttons.py` | GPIO Button support plugin.
`gps.py` | Saves GPS coordinates whenever a handshake is captured.
`grid.py` | Signals the unit's cryptographic identity and (optionally) a list of pwned networks to PwnGRID at api.pwnagotchi.ai.
`led.py` | This plugin blinks the PWR led with different patterns depending on the event.
`logtail` | This plugins enables you to look at the logfile via your browser.
`memtemp.py` | Adds a memory and temperature indicator.
`net-pos.py` | Saves WiFi position whenever a handshake is captured and retrieves the geolocation when internet is next available.
`onlinehashcrack.py` | Automatically uploads handshakes to [onlinehashcrack.com](https://onlinehashcrack.com).
`paw-gps.py` | Saves GPS coordinates whenever an handshake is captured. The GPS data is get from PAW on android.
`session-stats.py` | Shows the current session stats in nice little graps.
`switcher.py` | You can switch to some non-pwnagotchi activity for some amount of time.
`ups_lite.py` | A plugin that will add a voltage indicator for the UPS Lite v1.1.
`webcfg.py` | With this plugin you can change the configuration via the browser.
`webgpsmap.py` | Plots the captures handshakes on a map.
`wigle.py` | Automatically uploads collected WiFi handshakes to [wigle.net](https://wigle.net/).
`wpa-sec.py` | Automatically uploads handshakes to [wpa-sec.stanev.org](https://wpa-sec.stanev.org).


## Community plugins

These are user contributed plugins for pwnagotchi, some of them have not been completely tested by the dev team,
use them at your own risk.

Plugin Script | Description
--------------|------------
`aircrackonly.py` | Confirms pcap contains handshake/PMKID or delete it.
`auto_backup.py` | Backs up files when internet is available.
`buttonshim.py` | Pimoroni Button Shim GPIO Button and RGB LED support plugin based on the pimoroni-buttonshim-lib and the pwnagotchi-gpio-buttons-plugin.
`christmas.py` | Christmas Countdown timer for pwnagotchi.
`clock.py` | Clock/Calendar for pwnagotchi.
`gpio_shutdown.py` | GPIO Shutdown plugin.
`handshakes-dl.py` | Download handshake captures from web-ui.
`hashie.py` | Attempt to automatically convert pcaps to a crackable format.
`mostodon.py` | Periodically post status updates. Based on twitter plugin by evilsocket.
`quickdic.py` | Runs a quick dictionary scan against captured handshakes.
`screen_refresh.py` | Refreshes the e-ink display after X amount of updates.
`telegram.py` | Periodically sent messages to Telegram about the recent activity of pwnagotchi.
`twitter.py` | Creates tweets about the recent activity of Pwnagotchi.


## Plugins in the browser

If you navigate to the **plugins-section** of your pwnagotchi-web-ui, you will see all available plugins listed in small little boxes like the following:

![logtail](https://i.imgur.com/KAhh1Fu.png)

If the name is underlined, you can click on them and will be navigated to their web representation.
If you toggle the switch, the plugin will be enabled/disabled permanently (it will be saved to the config).

## Working with the CLI

Pwnagotchi also has a small **plugins** subcommand, which can be used to manage the plugins.

```shell
usage: pwnagotchi plugins [-h]
                          {search,list,update,upgrade,enable,disable,install,uninstall,edit}
                          ...

positional arguments:
  {search,list,update,upgrade,enable,disable,install,uninstall,edit}
    search              Search for pwnagotchi plugins
    list                List available pwnagotchi plugins
    update              Updates the database
    upgrade             Upgrades plugins
    enable              Enables a plugin
    disable             Disables a plugin
    install             Installs a plugin
    uninstall           Uninstalls a plugin
    edit                Edit the options

optional arguments:
  -h, --help            show this help message and exit
```

**Example:** If you want to update all your plugins to their latest version, you have to do this:

```shell
pwnagotchi plugins update
pwnagotchi plugins upgrade
```

{{% notice note %}}
<p>Configuration files you changed, wont we overwritten but suffixed with <b>.bak</b>.</p>
{{% /notice %}}

## Developing your own plugin

If you want to develop your own plugin, you have the following callbacks availaible:

Callback | Description
--------------|------------
`on_ai_best_reward` | Called when the AI got the best reward so far.
`on_ai_policy` | Called when the AI finds a new set of parameters.
`on_ai_ready` | Called when the AI finished loading.
`on_ai_training_end` | Called when the AI has done training.
`on_ai_training_start` | Called when the AI starts training for a given number of epochs.
`on_ai_training_step` | Called after the AI completed a training epoch.
`on_ai_worst_reward` | Called when the AI got the worst reward so far.
`on_association` | Called when the agent is sending an association frame.
`on_bored` | Called when the status is set to bored.
`on_channel_hop` | callend when the agent is tuning on a specific channel.
`on_config_changed` | This will be triggered if the config has changed (also right after **on_loaded**).
`on_deauthentication` | Called when the agent is deauthenticating a client station from an AP.
`on_display_setup` | Called when the hardware display setup is done, display is an hardware specific object.
`on_epoch` | Called when an epoch is over (where an epoch is a single loop of the main algorithm).
`on_excited` | Called when the status is set to excited.
`on_free_channel` | Called when a non overlapping wifi channel is found to be free.
`on_handshake` | Called when a new handshake is captured, access_point and client_station are json objects if the agent could match the BSSIDs to the current list, otherwise they are just the strings of the BSSIDs.
`on_internet_available` | This will be triggered every few seconds during the time pwnagotchi has internet.
`on_loaded` | The plugin got loaded and is enabled.
`on_lonely` | Called when the status is set to lonely.
`on_peer_detected` | Called when a new peer is detected.
`on_peer_lost` | Called when a known peer is lost.
`on_ready` | Called when everything is ready and the main loop is about to start.
`on_rebooting` | Called when the agent is rebooting the board.
`on_sad` | Called when the status is set to sad.
`on_sleep` | Called when the agent is sleeping for t seconds.
`on_ui_setup` | Called to setup the ui elements.
`on_ui_update` | Called when the ui is updated.
`on_unfiltered_ap_list` | Called when the agent refreshed an unfiltered access point list this list contains all access points that were detected BEFORE filtering.
`on_unload` | This will be triggered if the plugin gets unloaded (e.g. the user toggled the enable/disable switch). You should remove unneeded **ui-elements** here.
`on_wait` | Called when the agent is waiting for t seconds.
`on_webhook` | You can provide some web-functionality here. Will be triggered if the user opens `/plugins/<pluginname>`.
`on_wifi_update` | Called when the agent refreshed its access points list.

### Example
To illustrate how easy it is to add additional functionality via the plugin system, here is the code for the GPS plugin (`gps.py`):

```python
import logging
import json
import os
import pwnagotchi.plugins as plugins


class GPS(plugins.Plugin):
    __author__ = 'evilsocket@gmail.com'
    __version__ = '1.0.0'
    __license__ = 'GPL3'
    __description__ = 'Save GPS coordinates whenever an handshake is captured.'

    def __init__(self):
        self.running = False

    def on_loaded(self):
        logging.info("gps plugin loaded for %s" % self.options['device'])

    def on_ready(self, agent):
        if os.path.exists(self.options['device']):
            logging.info("enabling gps bettercap's module for %s" % self.options['device'])
            try:
                agent.run('gps off')
            except:
                pass

            agent.run('set gps.device %s' % self.options['device'])
            agent.run('set gps.speed %d' % self.options['speed'])
            agent.run('gps on')
            self.running = True
        else:
            logging.warning("no GPS detected")

    def on_handshake(self, agent, filename, access_point, client_station):
        if self.running:
            info = agent.session()
            gps = info['gps']
            gps_filename = filename.replace('.pcap', '.gps.json')

            logging.info("saving GPS to %s (%s)" % (gps_filename, gps))
            with open(gps_filename, 'w+t') as fp:
                json.dump(gps, fp)

```
