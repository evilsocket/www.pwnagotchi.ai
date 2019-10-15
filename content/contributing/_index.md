---
title: "Contributing"
date: 2019-02-25T11:33:49+01:00
weight: 6
draft: false
pre: "<i class='fas fa-dna'></i> "
---

Pwnagotchi's developement environment is [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) + [nexmon patches](https://re4son-kernel.com/re4son-pi-kernel/) for monitor mode, or any Linux with a monitor mode enabled interface (if you tune config.yml).

{{% notice warning %}}
<p>
<strong>Do not try with Kali on the Raspberry Pi 0 W</strong>, it is compiled without hardware floating point support and TensorFlow is simply not available for it, use Raspbian.
</p>
{{% /notice %}}

## Writing a Plugin

The easiest way to extend Pwnagotchi's functionalities is writing a plugin. Pwnagotchi has a simple plugin system that you can 
use to customize your unit and its behavior. You can place your plugins anywhere as Python files, and then edit the 
`config.yml` file (`main.plugins` value) to point to their containing folder.

Check the [plugins](/plugins/) page for more information.

## Writing an App

You can write any type of application on top of our [API](/api/), sky is the limit!

## Adding a new Display

Currently Pwnagotchi supports [several displays](http://localhost:1313/configuration/#select-your-display) and adding support for new ones is very easy! 
All you have to do is copying the specific Python libraries of the hardware [into this folder](https://github.com/evilsocket/pwnagotchi/tree/master/pwnagotchi/ui/hw/libs) 
and then create a new class in its parent folder that implements the methods of the following abstract class:

```python
class DisplayImpl(object):
    def __init__(self, config, name):
        self.name = name
        self.config = config['ui']['display']
        self._layout = {
            'width': 0,
            'height': 0,
            'face': (0, 0),
            'name': (0, 0),
            'channel': (0, 0),
            'aps': (0, 0),
            'uptime': (0, 0),
            'line1': (0, 0),
            'line2': (0, 0),
            'friend_face': (0, 0),
            'friend_name': (0, 0),
            'shakes': (0, 0),
            'mode': (0, 0),
            # status is special :D
            'status': {
                'pos': (0, 0),
                'font': fonts.Medium,
                'max': 20
            }
        }

    def layout(self):
        raise NotImplementedError

    def initialize(self):
        raise NotImplementedError

    def render(self, canvas):
        raise NotImplementedError

    def clear(self):
        raise NotImplementedError
```

For instance, the [pwnagotchi/ui/hw/oledhat.py](https://github.com/evilsocket/pwnagotchi/blob/master/pwnagotchi/ui/hw/oledhat.py) file which supports [this hat](https://www.waveshare.com/wiki/1.3inch_OLED_HAT) 
looks like this:

```python
import logging

import pwnagotchi.ui.fonts as fonts
from pwnagotchi.ui.hw.base import DisplayImpl


class OledHat(DisplayImpl):
    def __init__(self, config):
        super(OledHat, self).__init__(config, 'oledhat')
        self._display = None

    def layout(self):
        fonts.setup(8, 8, 8, 8)
        self._layout['width'] = 128
        self._layout['height'] = 64
        self._layout['face'] = (0, 32)
        self._layout['name'] = (0, 10)
        self._layout['channel'] = (0, 0)
        self._layout['aps'] = (25, 0)
        self._layout['uptime'] = (65, 0)
        self._layout['line1'] = [0, 9, 128, 9]
        self._layout['line2'] = [0, 53, 128, 53]
        self._layout['friend_face'] = (0, 41)
        self._layout['friend_name'] = (40, 43)
        self._layout['shakes'] = (0, 53)
        self._layout['mode'] = (103, 10)
        self._layout['status'] = {
            'pos': (30, 18),
            'font': fonts.Small,
            'max': 18
        }
        return self._layout

    def initialize(self):
        logging.info("initializing oledhat display")
        from pwnagotchi.ui.hw.libs.waveshare.oledhat.epd import EPD
        self._display = EPD()
        self._display.init()
        self._display.Clear()

    def render(self, canvas):
        self._display.display(canvas)

    def clear(self):
        self._display.clear()
```

## Creating an Image

If you want to create a custom image for testing, developing or just hacking, you will need a GNU/Linux computer and the binaries for 
`curl`, `git`, `make`, `unzip`, `go`, `qemu-user-static` and `kpartx`. The Makefile will also temporarily install [packer](https://www.packer.io/) and use `sudo` as needed.

To create a zip file with the image and one with its sha256 checksum, just run:

```sh
make image
```

To remove the generated files:

```sh
sudo make clean
```

## Adding a Language

#### Contributing a new translation
If you want to contribute a new translation of Pwnagotchi's status messages for the UI, do the following:

1. Copy the language template (`voice.pot`); the template should NOT be changed manually.
```bash
./scripts/language.sh add <lang> (e.g. "de")
```

2. Now the user changes the file `pwnagotchi/locale/<lang>/LC_MESSAGES/voice.po`

 - The important part: be sure to change the `msgstr` part, NOT the `msgid` part!

3. Now you'll need to compile it; this will create the `.mo` files:

```bash
./scripts/language.sh compile <lang>
```

4. Now just add it to the [GitHub repo](https://github.com/evilsocket/pwnagotchi) and submit a pull request.


#### Updating an existing translation
Sometimes we change old or add new status messages in Pwnagotchi's UI. If that's happened and something in the `voice.py` the code has changed, users can submit updated translations using the following procedure:

1. Update the template and merges it with the already translated po-file:

```bash
./scripts/language.sh update <lang>
```

2. Now you need to 
    - Look for `fuzzy` marked strings in the file pwnagotchi/locale/<lang>/LC_MESSAGES/voice.po
 	- Add your new/changed translation
 	- Remove the `fuzzy` string afterwards
3. Recompile the `.mo` file

```bash
./scripts/language.sh compile <lang>
```

4. Add it to the [GitHub repo](https://github.com/evilsocket/pwnagotchi) and submit a pull request.
None of these changes break anything. If the user made a mistake it will fallback to english.
An important part is: dont change the voice.py, because this results in a change in all languages.
