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
