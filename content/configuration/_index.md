---
title: "Configuration"
date: 2019-02-25T10:57:57+01:00
draft: false
weight: 3
pre: "<i class='fas fa-cog' style='color:#b33636;'></i> "
---

Once you've [written the image file onto the SD card](/installation/#flashing-an-image), there're a few steps you'll have to follow in order to configure your new Pwnagotchi properly.

1. [Connect to your Pwnagotchi](/configuration/#connect-to-your-pwnagotchi)
2. [Name your new Pwnagotchi](/configuration/#name-your-new-pwnagotchi)
3. [Choose your unit's language](/configuration/#choose-your-unit-s-language)
4. [Set your PwnGrid preferences](/configuration/#set-your-pwngrid-preferences)
5. [Select your display](/configuration/#select-your-display)
6. [Host connection sharing](/configuration/#host-connection-sharing)
7. [Troubleshooting](/configuration/#troubleshooting)

-------------------------------------------------------------------------------------------------------------

## Connect to your Pwnagotchi

In order to properly set up and configure your Pwnagotchi, you'll first need to connect to it via SSH.

{{% notice warning %}}
<p><b>PLEASE NOTE:</b> If you cannot connect to your Pwnagotchi <b>no matter what you try</b>, ensure that the micro-USB you are using <b>allows data transfer</b> and doesn't ONLY provide charge. Cheaper quality micro-USB cords often do not support data transfer and will NOT allow you to actually connect to your Pwnagotchi. :'( <b>Use a quality cord!</b></p>
{{% /notice %}}

1. Start by connecting the micro-USB cable to the data port of your Pwnagotchi's RPi0W, then connect the other end of that cable to your computer. 
2. After a few seconds, the RPi0W's board will boot and you will see a new Ethernet interface on your host computer.
3. You'll need to configure it with a static IP address:
     - IP: `10.0.0.1`
     - Netmask: `255.255.255.0`
     - Gateway: `10.0.0.1`
     - DNS (if required): `8.8.8.8` *(or whatever)*
4. If everything's been configured properly, you will now be able to `ping` either `10.0.0.2` or `pwnagotchi.local`
     * If you have already [configured the name](/configuration/#name-your-new-pwnagotchi) of your Pwnagotchi, `pwnagotchi.local` won't work. Instead, try *your unit's hostname* + `.local`.
5. **Congratulations!** You should now be able to connect to your unit using SSH:

```bash
ssh pi@10.0.0.2
```

#### About your SSH connection

The default password is `raspberry`; you should change it as soon as you log in for the first time by issuing the `passwd` command and selecting a new and more complex passphrase.

If you want to login directly without entering a password (recommended!), copy your SSH public key to the unit's authorized keys:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub pi@10.0.0.2
```

-------------------------------------------------------------------------------------------------------------

## Name your new Pwnagotchi

You can give your new Pwnagotchi unit its own name by [changing its hostname](https://geek-university.com/raspberry-pi/change-raspberry-pis-hostname/). By default, your new Pwnagotchi's name will be `Pwnagotchi`.

Open the `/etc/pwnagotchi/config.yml` file (either via SSH or by directly editing the SD card's contents from a computer with a card reader) to override the [default configuration](https://github.com/evilsocket/pwnagotchi/blob/master/pwnagotchi/defaults.yml) with your custom values.

-------------------------------------------------------------------------------------------------------------
## Choose your unit's language

Pwnagotchi displays its UI in English by default, but it can speak several other languages! If you're fine with English, you don't need to do anything special here.

But if you **do** want to change what language Pwnagotchi displays its status in, you can change `main.lang` to one of the supported languages:

- **English** *(default)*
- German
- Italian
- French
- Russian
- Dutch
- Greek
- Swedish
- Macedonian


{{% notice tip %}}
<p>If you want to contribute a new language (or improve an existing translation!), you can check out the <a href="/contributing/#adding-a-language">Adding a Language</a> doc for more details.</p>
{{% /notice %}}


## Set your [PwnGrid](/intro/#pwnagotchis-on-the-pwngrid) preferences

By default, the `grid` [plugin](/plugins/) is **only partially** enabled. This means that whenever the unit will detect internet connectivity while in [MANUAL mode](/usage/#user-interface), it will signal its existence to the PwnGrid server by sending ONLY the following enrollment data: 

- The cryptographic identity of the unit, generated at first boot and used for authentication.
- The output of the `uname -a` command on the unit used to determine the type of hardware.

If you would like your unit to participate in [PwnGrid]()'s community rankings and scoreboards (PwnGrid is like Pokèmon Go, but for WiFi!), as well as be a datapoint in regional (country-level) statistics, you can **fully opt-in** to PwnGrid by enabling your unit to send the PwnGrid API some basic information about the networks it has pwned. **None of your unit's captured cryptographic material is sent to the PwnGrid server;** ONLY the minimum information to enroll the unit in the PwnGrid database (see above) and calculate how many networks it has "conquered" so far, namely:

- The list of networks that the unit collected handshakes of (consisting of their `BSSID` and `ESSID`).

In order to **fully opt-in** to PwnGrid, you must make the following change in your `/etc/pwnagotchi/config.yml` file:

```yaml
main:
    plugins:
      grid:
        enabled: true
        report: true # full-opt in
```

Even if you have decided to **fully opted-in** to PwnGrid, you can still disable reporting for specific networks—for instance, if you don't want your home network to be in the system:

```yaml
main:
    plugins:
      grid:
        enabled: true
        report: true
        exclude:
          - MyHomeNetwork     # both ESSIDs and BSSIDs are supported
          - de:ad:be:ef:de:ad # both ESSIDs and BSSIDs are supported
```

If instead you prefer to completely opt-out by also disabling signaling:

```yaml
main:
    plugins:
      grid:
        enabled: false # full opt-out
        report: false
```

## Select your display

{{% notice tip %}}
<p>If you want to use the web UI (instead of an e-ink display attached to your unit's RPi0W) to see your Pwnagotchi's face, check out the <a href="/usage/#user-interface">User Interface</a> doc for more details on using the web UI.</p>
{{% /notice %}}

**Set the type of display you want to use via `ui.display.type`.**
If your display does not work after changing this setting, you might need to completely remove power from the Raspberry Pi and make a clean boot.

**You can configure the refresh interval of the display via `ui.fps`.** We recommend using a slow refresh rate to avoid shortening the lifetime of your e-ink display. The default value is `0`, which will *only* refresh when changes are made to the screen.

## Apply the new Configuration

Now you can run:

    sudo service pwnagotchi restart
    
In order to restart the service with the new configuration.

{{% notice tip %}}
<p>You will need to either reboot your unit or perform this step every time you will change the configuration.</p>
{{% /notice %}}

## Host connection sharing

Want to be able to update your Pwnagotchi and access things from the internet on it? *Sure you do!*

1. Connect to the Pwnagotchi unit via `usb0` (A.K.A., using the data port).
2. Run the appropriate connection sharing script to bring the interface up on your end and share internet connectivity from another interface:

OS | Script Location
------|---------------------------
Linux | `scripts/linux_connection_share.sh`
Mac OS X | `scripts/macos_connection_share.sh`
Windows | `scripts/win_connection_share.ps1`

&nbsp;

**All done configuring your new Pwnagotchi?** Time to learn how to take care of your new friend over in [**Usage**](/usage/)!

## Troubleshooting

##### If your network connection keeps flapping on your device connecting to your Pwnagotchi:
* Check if `usb0` (or equivalent) device is being controlled by NetworkManager. 
* You can check this via `nmcli dev status`.
