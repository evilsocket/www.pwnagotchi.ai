---
title: "Contributing"
date: 2019-02-25T11:33:49+01:00
weight: 6
draft: false
pre: "<i class='fas fa-dna' style='color:#b33636;'></i> "
---

<!-- §CHANGE§ DOESN'T THIS NEED TO GET COMPLETELY REWRITTEN? vvvvvvvvvvvvvv -->

- Raspbian + [nexmon patches](https://re4son-kernel.com/re4son-pi-kernel/) for monitor mode, or any Linux with a monitor mode enabled interface (if you tune config.yml).

**Do not try with Kali on the Raspberry Pi 0 W, it is compiled without hardware floating point support and TensorFlow is simply not available for it, use Raspbian.**

## Creating an Image

You can use the `scripts/create_sibling.sh` script to create an - ready to flash - rasbian image with pwnagotchi.

```shell
usage: ./scripts/create_sibling.sh [OPTIONS]

  Options:
    -n <name>    # Name of the pwnagotchi (default: pwnagotchi)
    -i <file>    # Provide the path of an already downloaded raspbian image
    -o <file>    # Name of the img-file (default: pwnagotchi.img)
    -s <size>    # Size which should be added to second partition (in Gigabyte) (default: 4)
    -v <version> # Version of raspbian (Supported: latest; default: latest)
    -p           # Only run provisioning (assumes the image is already mounted)
    -d           # Only run dependencies checks
    -h           # Show this help
```

#### Known Issues

`GLib-ERROR **: 20:50:46.361: getauxval () failed: No such file or directory`

- Affected DEB & Versions: QEMU <= 2.11
- Fix: Upgrade QEMU to >= 3.1
- Bug Link: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=923289

<!-- §CHANGE§ DOESN'T THIS NEED TO GET COMPLETELY REWRITTEN? ^^^^^^^^^^^^^^^ -->

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
An important part is: dont change the voice.py, because this results in a change in all languages






#### old version of the language HOW TO
use the `language.sh` script.  If you want to add for example the language **italian** you would type: 


Now you can use the `preview.py`-script to preview the changes:

```shell
./scripts/preview.py --lang it --display ws1 ws2 inky --output preview.png
# Now open preview.png
```