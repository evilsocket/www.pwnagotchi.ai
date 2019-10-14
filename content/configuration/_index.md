---
title: "Configuration"
date: 2019-02-25T10:57:57+01:00
draft: false
weight: 3
pre: "<i class='fas fa-cog'></i> "
---

Once you've [written the image file onto the SD card](/installation/#flashing-an-image), there're a few steps you'll have to follow in order to configure your new Pwnagotchi properly.

1. **Connecting to your Pwnagotchi**
    - Original [Connect to your Pwnagotchi](/configuration/#connect-to-your-pwnagotchi)
    - Updated for Linux host [Connecting to Pi0w with MicroUSB cable on Linux Host
](/configuration/#connecting-to-pi0w-with-microusb-cable-on-linux-host)
2. [Name your new Pwnagotchi](/configuration/#name-your-new-pwnagotchi)
3. [Choose your unit's language](/configuration/#choose-your-unit-s-language)
4. [Set your PwnGrid preferences](/configuration/#set-your-pwngrid-preferences)
5. [Select your display](/configuration/#select-your-display)
6. [Host connection sharing](/configuration/#host-connection-sharing)
7. [Troubleshooting](/configuration/#troubleshooting)

## Connect to your Pwnagotchi

In order to properly set up and configure your Pwnagotchi, you'll first need to connect to it via SSH.

{{% notice warning %}}
<p><b>PLEASE NOTE:</b> If you cannot connect to your Pwnagotchi <b>no matter what you try</b>, ensure that the micro-USB you are using <b>allows data transfer</b> and doesn't ONLY provide charge. Cheaper quality micro-USB cords often do not support data transfer and will NOT allow you to actually connect to your Pwnagotchi. :'( <b>Use a quality cord!</b></p>
{{% /notice %}}

![ui](https://i.imgur.com/uLdQYqF.png)

1. Start by connecting the micro-USB cable to the **data port** of your Pwnagotchi's RPi0W, then connect the other end of that cable to your computer. 
2. **If your Pwnagotchi has already been booted up at least once before:** after a few seconds, you will see a new Ethernet interface on your host computer.
     - **If you have never booted your Pwnagotchi before:** it will take a few minutes to boot up &/or become visible or responsive. **DO NOT INTERRUPT YOUR PWNAGOTCHI DURING THIS PROCESS.** That extra time it takes to boot the first time you turn your Pwnagotchi on? It's because it is generating its RSA keys; if you interrupt this process, the generated keys may be corrupted!
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

## Connecting to Pi0w with MicroUSB cable on Linux Host
* Works for Release RC4 *

{{% notice warning %}}
<p><b>DEV NOTE:</b> These are directions for the recommended hardware, a Pi0w - and connecting to it from a Linux based host via a Micro-USB through the data port. This was written while connecting to a Pi0w with a Data Capable MicroUSB to a Macbook Pro late 2012 running Ubuntu 19.04. We can not guarantee these specific directions work on any other OS. Hopefully further write ups will be provided at a later date.</p>
{{% /notice %}}

### Pre-Face
* If you have any wired interfaces on your host PC, you will need to remove them from Network Manager so we can be sure you have everything set correctly, on the correct interface.
* If you are using Wi-Fi on your host computer, you need to be certain that your routers IP address scheme is not in the `10.0.0.1/24` range. If it is, you should turn Wi-Fi off initially to best troubleshoot your connectivity issues, then change the interface IP scheme on your Pi once you can `ssh` to it.
* These settings are only verified to work on, **1.** *a Pi0w*, with a **2.** *MicroUSB data capable cable,* **3.** the newest released image found on [our Github](https://github.com/evilsocket/pwnagotchi/releases/) *which at the time of writing is RC4,* and **4.** a *completely* vanilla image(*plug-in and whitelist configuration is fine, but if you have previously adjusted the UI: from `10.0.0.2` to `0.0.0.0`, you need to revert those changes by deleting anything related to `UI:` in your `config.yml`.*)
![ui](https://i.imgur.com/uLdQYqF.png)
#### Steps to complete on your host (the pc that you are connecting the Pi to)
1. First, type `ifconfig` to check and take note of the names of your current interfaces, and what is now recognized as an adapter on your system. **Take note of the Mac Addresses that you see in this output.**
2. Starting with a clean slate in your Network Manager (remove all wired interface profiles that you have on your Network Manager,) plug your unpowered Pi0w into your computer through the data port seen in the picture shown above .
3.  Wait until your Pi boots into Manu mode. Once you see the breakdown that Pwnagotchi does when in MANU mode, type `ifconfig` again on your host machine and look for a new interface that was not there during **Step 1.**
***Take EXTRA note of the new interfaces mac address** I will be referencing this mac address on multiple occasions as **Step 3***.
    - **If you have never booted your Pwnagotchi before:** it will take a few minutes to boot up &/or become visible or responsive. **DO NOT INTERRUPT YOUR PWNAGOTCHI DURING THIS PROCESS.** That extra time it takes to boot the first time you turn your Pwnagotchi on? It's because it is generating its RSA keys; if you interrupt this process, the generated keys may be corrupted!
4.  On Network Manager on your PC/Host, (if there are no interfaces automatically added, you can attempt to add a new interface by selecting the mac address noted in **Step 3** for the interface profile) select Settings > IPv4 and then change from `automatic` to `manual`, then for your address, you'll need to configure it with a static IP address and then press apply in the top right:
     - IP: `10.0.0.1`
     - Netmask: `255.255.255.0`
5.  Back in your terminal, type `ifconfig` and look for the interface that you found in **Step 3** and that you edited the settings for in **Step 4**. If you see the following on the second line of the interface that matches the mac address from **Step 3**, you should now be able to enter `ping 10.0.0.2` and receive a response from your pi.

```bash
inet 10.0.0.1  netmask 255.255.255.0  broadcast 10.0.0.255
```
6.  **Congratulations!** You should now be able to connect to your unit using SSH:

```bash
ssh pi@10.0.0.2
```
{{% notice tip %}}
<p><b>TIP:</b> you may need to use the `linux_connection_share.sh` script before your PC will allow you to ssh to your Pi. [Host connection sharing](/configuration/#host-connection-sharing)</p>
{{% /notice %}}

{{% notice warning %}}
<p><b>DEV NOTE:</b> if you have some issues, either you are using the wrong cord, or your Operating System is missing required drivers, or something mostly out of our control. We can't help everyone with their networking, sorry</p>
{{% /notice %}}

#### About your SSH connection

The default password is `raspberry`; you should change it as soon as you log in for the first time by issuing the `passwd` command and selecting a new and more complex passphrase.

If you want to login directly without entering a password (recommended and necessary for certain packaged scripts to work, like `backup.sh` for instance!), copy your SSH public key to the unit's authorized keys:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub pi@10.0.0.2
```

## Name your new Pwnagotchi

You can give your new Pwnagotchi unit its own name by [changing its hostname](https://geek-university.com/raspberry-pi/change-raspberry-pis-hostname/). By default, your new Pwnagotchi's name will be `Pwnagotchi`.

Open the `/etc/pwnagotchi/config.yml` file (either via SSH or by directly editing the SD card's contents from a computer with a card reader) to override the [default configuration](https://github.com/evilsocket/pwnagotchi/blob/master/pwnagotchi/defaults.yml) with your custom values.

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

## Set your PwnGrid preferences

By default, the `grid` [plugin](/plugins/) is **only partially** enabled. This means that whenever the unit will detect internet connectivity while in [MANUAL mode](/usage/#auto-ai-and-manu-modes), it will signal its existence to the PwnGrid server by sending ONLY the following enrollment data: 

- The cryptographic identity of the unit, generated at first boot and used for authentication.
- The output of the `uname -a` command on the unit used to determine the type of hardware.

If you would like your unit to participate in PwnGrid's community rankings and scoreboards (PwnGrid is like Pokémon Go, but for WiFi!), as well as be a datapoint in regional (country-level) statistics, you can **fully opt-in** to PwnGrid by enabling your unit to send the PwnGrid API some basic information about the networks it has pwned. **None of your unit's captured cryptographic material is sent to the PwnGrid server;** ONLY the minimum information to enroll the unit in the PwnGrid database (see above) and calculate how many networks it has "conquered" so far, namely:

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

## Apply the new configuration

Now you can run:

    sudo service pwnagotchi restart
    
...in order to restart the service with the new configuration.

{{% notice warning %}}
<p>You will need to either reboot your unit or perform this step every time you will change the configuration.</p>
{{% /notice %}}

## Host connection sharing

Want to be able to update your Pwnagotchi and access things from the internet on it? *Sure you do!*

1. Connect to the Pwnagotchi unit via `usb0` (A.K.A., using the data port).
2. Run the appropriate connection sharing script to bring the interface up on your end and share internet connectivity from another interface:

OS | Script Location | Link
---|-----------------|---------
Linux | `scripts/linux_connection_share.sh` | [link](https://github.com/evilsocket/pwnagotchi/blob/master/scripts/linux_connection_share.sh)
Mac OS X | `scripts/macos_connection_share.sh` | [link](https://github.com/evilsocket/pwnagotchi/blob/master/scripts/macos_connection_share.sh)
Windows | `scripts/win_connection_share.ps1` | [link](https://github.com/evilsocket/pwnagotchi/blob/master/scripts/win_connection_share.ps1)

### Bluetooth

If you want to upload your handshakes while walking, want to use your smartphone as a display or simply shutdown your pwnagotchi gracefully,
you can use the `bt-tether`-plugin.

The configuration is as follows:

```yaml
main:
    plugins:
      bt-tether:
        enabled: true
        mac: 'FF:FF:FF:FF:FF'  # you need to put your phones bt-mac here (goto your phones settings > status)
        ip: '192.168.44.44'    # adjust this to your phones pan-network (run "ifconfig bt-pan" on your phone)
        netmask: 24
        interval: 1
        share_internet: true   # this will change the routing and nameserver on your pi
```

Also don't forget to bind your pwnagotchi to all interfaces:

```yaml
ui:
  display:
    video:
      address: 0.0.0.0
```

&nbsp;

**All done configuring your new Pwnagotchi?** Time to learn how to take care of your new friend over in [**Usage**](/usage/)!

## Troubleshooting

##### If your network connection keeps flapping on your device connecting to your Pwnagotchi:
* Check if `usb0` (or equivalent) device is being controlled by NetworkManager. 
* You can check this via `nmcli dev status`.
* If you are having trouble connecting to your Pi via USB, be sure you are using a microUSB cord that is capable of data transfer
