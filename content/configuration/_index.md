---
title: "Configuration"
date: 2019-02-25T10:57:57+01:00
draft: false
weight: 3
---

Once you've [written the image file onto the SD card](https://github.com/evilsocket/pwnagotchi/blob/master/docs/install.md#flashing-an-image), there're a few steps you'll have to follow in order to configure your new Pwnagotchi properly.

## Connect to your Pwnagotchi

1. First, start with connecting the USB cable to the data port of the Raspberry Pi and the RPi to your computer. 
2. After a few seconds, the board will boot and you will see a new Ethernet interface on your host computer.
3. You'll need to configure it with a static IP address:
     - IP: `10.0.0.1`
     - Netmask: `255.255.255.0`
     - Gateway: `10.0.0.1`
     - DNS (if required): `8.8.8.8` (or whatever)

4. If everything's been configured properly, you will now be able to `ping` both `10.0.0.2` or `pwnagotchi.local`
     * If you have already customized the hostname of your Pwnagotchi, `pwnagotchi.local` won't work. Instead, try *your unit's hostname* + `.local`.

5. **Congratulations!** You can now connect to your unit using SSH:

```bash
ssh pi@10.0.0.2
```
##### About your SSH connection
The default password is `raspberry`; you should change it as soon as you log in for the first time by issuing the `passwd` command and selecting a new and more complex passphrase.

If you want to login directly without entering a password (recommended!), copy your SSH public key to the unit's authorized keys:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub pi@10.0.0.2
```

## Give your Pwnagotchi a name

You can now set a new name for your unit by [changing the hostname](https://geek-university.com/raspberry-pi/change-raspberry-pis-hostname/)!

Open the `/etc/pwnagotchi/config.yml` file (either via SSH or by directly editing the SD card contents from a computer) that will override the [default configuration](https://github.com/evilsocket/pwnagotchi/blob/master/pwnagotchi/defaults.yml) with your custom values.

## Choose your Pwnagotchi's language

Pwnagotchi displays its UI in English by default, but it can speak several other languages! If you're fine with English, you don't need to do anything special.

But if you want, you can change `main.lang` to one of the supported languages:

- **English** *(default)*
- German
- Dutch
- Greek
- Macedonian
- Italian
- French
- Russian
- Swedish

## PwnGRID

By default the `grid` [plugin](https://github.com/evilsocket/pwnagotchi/blob/master/docs/plugins.md) is **only partially** enabled, this means that whenever the Pwnagotchi detects internet connectivity in manual mode, it'll signal its 
presence to the PwnGRID server without sending any data other than: 

- The cryptographic identity of the unit, generated at first boot and used for authentication.
- The output of the `uname -a` command on the unit used to determine the type of hardware.

It is possible to fully opt-in and also enable the unit to send basic information about the pwned networks. None of the captured cryptographic material is sent to this server, 
just the minimum information to enroll the unit in the database and know how many networks it "conquered" so far, namely:

- The list of networks that the unit collected handshakes of, made of their `BSSID` and `ESSID`.

This is used for easy unit identification and debugging, this data is collected in order to build rankings, scoreboards and regional statistics. **Like Pokèmon Go, but for WiFi!**

In order to fully opt-in, you can put this in your `/etc/pwnagotchi/config.yml` file:

```yaml
main:
    plugins:
      grid:
        enabled: true
        report: true # full-opt in
```

Even if you fully opt-in, you can still disable reporting for specific networks, for instance if you don't want your home network to be in the system:

```yaml
main:
    plugins:
      grid:
        enabled: true
        report: true
        exclude:
          - MyHomeNetwork
          - de:ad:be:ef:de:ad # both ESSIDs and BSSIDs are supported
```

If you would prefer instead to completely opt-out, also disabling signaling:

```yaml
main:
    plugins:
      grid:
        enabled: false # full opt-out
        report: false
```

## Display Selection

**Set the type of display you want to use via `ui.display.type`.**
If your display does not work after changing this setting, you might need to completely remove its power, safely shutting down first to preserve the SD Card, from the Raspberry Pi and make a clean boot.

**You can configure the refresh interval of the display via `ui.fps`.** We recommend using a slow refresh rate to avoid shortening the lifetime of your e-ink display. The default value is `0`, which will *only* refresh when changes are made to the screen.

## Host Connection Share

Want to be able to update your Pwnagotchi and access things from the internet on it? *Sure you do!*

1. Connect to the Pwnagotchi unit via `usb0` (A.K.A., using the data port).
2. Run the appropriate connection sharing script to bring the interface up on your end and share internet connectivity from another interface:

OS | Script Location
------|---------------------------
Linux | `scripts/linux_connection_share.sh`
Mac OS X | `scripts/macos_connection_share.sh`
Windows | `scripts/win_connection_share.ps1`

## Troubleshooting

##### If your network connection keeps flapping on your device connecting to your Pwnagotchi.
* Check if `usb0` (or equivalent) device is being controlled by NetworkManager. 
* You can check this via `nmcli dev status`.
