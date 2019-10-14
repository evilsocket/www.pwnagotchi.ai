---
title: "Community Hacks"
date: 2019-02-25T11:33:49+01:00
weight: 8
draft: false
pre: "<i class='fas fa-cube'></i> "
---

{{% notice warning %}}
<p><strong>IMPORTANT DISCLAIMER:</strong> The information provided on this page is NOT officially supported by the Pwnagotchi development team. These are unofficial "hacks" that users have worked out while customizing their units and decided to document for anybody else who might want to do something similar. <strong>Please do NOT open issues on GitHub if you cannot get something described in this document to work.</strong> It (almost) goes without saying, but obviously: <strong>we are NOT responsible if you break your hardware by following any instructions documented here. Use this information at your own risk.</strong></p>
{{% /notice %}}

If you test one of these hacks yourself and it still works, it's extra nice if you update the **Last Tested On** table for that particular hack and note any minor adjustments you may have had to make to the instructions to make it work with your particular Pwnagotchi setup. ❤️

{{% notice tip %}}
<p>Some of these hacks involve a soldering iron. If you don't have one already, the [Miniware TS100](https://hackaday.com/2017/07/24/review-ts100-soldering-iron/) is a nice inexpensive choice.</p>
{{% /notice %}}

- [**Screens**](#screens)
  - [Waveshare 3.5" SPI TFT screen](#waveshare-3-5-spi-tft-screen)
  - [Pwnagotchi face via Bluetooth](#pwnagotchi-face-via-bluetooth)
- [**Hardware Mods**](#hardware-modifications)
  - [Adding an external antenna to the RPi0W](#adding-an-external-antenna-to-the-rpi0w)
  - [RPi0W with Waveshare V2 "Slim-agotchi"](#rpi0w-with-waveshare-v2-slim-agotchi)

## Screens
### Waveshare 3.5" SPI TFT screen

Last tested on | Pwnagotchi version | Hardware | Working? | Reference
---------------|--------------------|----------|----------|-----------|
2019-10-03 | Unknown | unknown | ✅ | ([link](https://github.com/evilsocket/pwnagotchi/issues/124#issue-502346040))

Some of this guide will work with other framebuffer-based displays.

- First: SSH into your Pwnagotchi, and give it some internet! 
  - Don't forget to check your default gateway and `apt-get update`.
- Follow the guide here: [www.waveshare.com/wiki/3.5inch_RPi_LCD_(A)#Method_1._Driver_installation](https://www.waveshare.com/wiki/3.5inch_RPi_LCD_(A)#Method_1._Driver_installation)
  - At the step with `./LCD35-show`, add `lite` to the command prompt (e.g., `./LCD35-show lite`).
- Reboot.
- As root, make three symlinks:
  - `cd ~`
  - `ln -s pwnagotchi.png pwnagotchi_1.png`
  - `ln -s pwnagotchi.png pwnagotchi_2.png`
  - `ln -s pwnagotchi.png pwnagotchi_3.png`
- `apt install fbi`
- Change display type to `inky` in `config.yml`
- Add `modules-load=dwc2,g_ether` to your kernel command line (`/boot/cmdline.txt`) or it will break!
- Also must add `dtoverlay=dwc2` to the bottom of (`/boot/config.txt`)
- Edit `/etc/rc.local` and add: 
```
fbi -T 1 -a -noverbose -t 15 -cachemem 0 /root/pwnagotchi_1.png /root/pwnagotchi_2.png /root/pwnagotchi_3.png &
```
- Reboot.

And you should be good!

### Pwnagotchi face via Bluetooth

Last tested on | Pwnagotchi version | Hardware | Working? | Reference
---------------|--------------------|----------|----------|-----------|
2019-10-06 | Unknown | Android | ✅ | Slack
2019-10-06 | Unknown | iPad iOS 9.3.5 | ✅ | Slack

A way to view your Pwnagotchi's ~~face~~ UI wirelessly via Bluetooth on a separate device. Refresh rate is the same as the e-ink display (every few seconds). 

**Please note:** This is NOT Bluetooth tethering; this is only Bluetooth as a server on Pi side; you connect the Bluetooth and get a DHCP IP address and that's it. This hack cannot leverage the data connection.

Contributed by Systemic in the Slack.

#### 1. First Step!
- Comment out the Bluetooth disable line from `/boot/config.txt` : `#dtoverlay=pi3-disable-bt`
- Change `/root/pwnagotchi/config.yml` to have `0.0.0.0` instead of `10.0.0.2` to listen as well on Bluetooth.
- Then launch the following commands:

#### 2. Install required packages:

```
sudo apt-get install bluez bluez-tools bridge-utils dnsmasq
```

#### 3. Configure Bluetooth and start it:
```
sudo modprobe bnep
sudo brctl addbr pan0
sudo brctl setfd pan0 0
sudo brctl stp pan0 off
sudo ifconfig pan0 172.26.0.1 netmask 255.255.255.0
sudo ip link set pan0 up

cat <<- EOF > /tmp/dnsmasq_bt.conf

bind-interfaces
port=0
interface=pan0
listen-address=172.26.0.1
dhcp-range=172.26.0.2,172.26.0.100,255.255.255.0,5m
dhcp-leasefile=/tmp/dnsmasq_bt.leases
dhcp-authoritative
log-dhcp
EOF

sudo dnsmasq -C /tmp/dnsmasq_bt.conf
sudo bt-agent -c NoInputNoOutput&
sudo bt-adapter -a hci0 --set Discoverable 1
sudo bt-adapter -a hci0 --set DiscoverableTimeout 0
sudo bt-adapter -a hci0 --set Pairable 1
sudo bt-adapter -a hci0 --set PairableTimeout 0
sudo bt-network -a hci0 -s nap pan0 &
```

#### 4. Finally: on your phone, you have to disable all existing interfaces:

- Shutdown WiFi.
- Shutdown mobile data.
- Connect to the newly available Bluetooth device (which has the name of your Pwnagotchi).
   - Once connected, you can test: `http://172.26.0.1:8080`
- You can also install bettercap's UI (`sudo bettercap` then `ui.update`) 
   - You'll need to change the http caplets to change `127.0.0.1` to `0.0.0.0`.
- You can connect to the shell with a terminal emulator ...

Happy tweaking.


### Pwnagotchi Bluetooth Tethering with access to internet, webui, ssh

New guide is available here : https://github.com/systemik/pwnagotchi-bt-tether

### Static RDNIS gadget to avoid reconfiguration everytime you plug it to the computer

You can execute these two commands and then each time you connect the pwnagotchi to your computer, the interface will be ready and configured:

```
export RDNIS=' g_ether.host_addr='$(dmesg | awk '/: HOST MAC/{print $NF}')' g_ether.dev_addr='$(dmesg | awk '/: MAC/{print $NF}')
sudo sed -i '$ s/$/ \'"$RDNIS"'/' /boot/cmdline.txt
```


## Hardware Modifications

### Adding an external wireless antenna to the RPi0W
Last tested on | Pwnagotchi version | Hardware |Working? | Reference
---------------|--------------------|----------|---------|-----------|
2019-10-06 | Unknown | RPi0W | ✅ | [Tweet](https://twitter.com/mastblast09/status/1180938109850136576)

Step-by-step guide to soldering an external antenna to your Pwnagotchi's RPi0W. It can improve the signal by ~6-8 dB. (**Please note:** If you implement this, you will no longer be able to use the RPi0W's built-in antenna.)

![ui](https://i.imgur.com/1UG1g4I.jpg)![ui](https://i.imgur.com/xp5h7nN.jpg)

(Contributed by [@Mastblast09](https://twitter.com/mastblast09).)

#### Parts needed:

- Connector ([example](https://uk.farnell.com/hirose-hrs/u-fl-r-smt-1-10/rf-coaxial-u-fl-straight-jack/dp/1688077?CMP=i-ddd7-00001003))
- Coax cable ([example](https://uk.farnell.com/multicomp/r-134g7210150ca/cable-u-fl-sma-rp-150mm-50ohm/dp/1699261?CMP=i-ddd7-00001003))
- Antenna ([example](https://uk.farnell.com/siretta/delta6c-x-smam-s-rp-11/swivel-antenna-2-4-5-8ghz-sma/dp/2717651?st=sma%20antenna)—but any SMA antenna should do the trick)

#### Tools needed:

- Soldering iron **OR** *(if you have access to one, but not necessary)* hot air rework station
- Solder
- Flux
- Magnifying device (having a stereo microscope is ideal, because the components are VERY small)
- Steady hands!

**Please be aware that if you modify your Pi, you will invalidate its FCC certification (if that matters to you).**

I used the following guide for the great images that they were able to take: [briandorey.com/post/raspberry-pi-zero-w-external-antenna-mod](https://www.briandorey.com/post/raspberry-pi-zero-w-external-antenna-mod)

- **WARNING:** If you do not have soldering skills OR don't have the correct tools for this mod, you will damage your Pi.
- This can be done very quickly with a hot air rework station, but not many folks will have a hot air rework station—so I did it with my soldering iron.
- You will need some sort of magnification device (whether a jewelers loupe or a stereo microscope) when it comes to the moving of the 0ohm resistor. It is VERY small.

### RPi0W with Waveshare V2 "Slim-agotchi"

Last tested on | Pwnagotchi version | Hardware | Working? | Reference
---------------|--------------------|----------|----------|-----------|
2019-10-12 | Unknown | RPi0W | ✅ | Slack

If you want to slim down the thickness of your RPi0W for a slim Pwnagotchi, it can be done by removing the 8-pin header on the board and slimming down the thickness of the screen. This hack involves removing the 8-pin header using a simple soldering iron and braid wick, then snipping header pins and inserting them through the RPi0W and soldering.

![ui](https://i.imgur.com/qderZXO.jpg)![ui](https://i.imgur.com/nvb7MzW.jpg)

(Contributed by [@Mastblast09](https://twitter.com/mastblast09).)

#### Tools needed:

- a soldering iron
- flux
- copper braid wick
- side cutter


#### Parts needed:

- a RPi0W
- a Waveshare V2 e-ink screen
- some [kapton tape](https://en.wikipedia.org/wiki/Kapton)


#### Instructions:

1. Place some flux on the wick. 
![ui](https://i.imgur.com/X6jSEzc.png)

2. Place some flux on the connector pins. 
 ![ui](https://i.imgur.com/ObnCH1a.png)

3. Set your soldering iron to around 300˚ C; you want it hot enough to flow solder into the wick. 

4. Place the wick above the pins and heat with the soldering iron. 
![ui](https://i.imgur.com/GanjyiX.png)

5. When you get to the side pads, you can use a side cutter like this one if you need to cut the pins. (Sometimes these are difficult to remove because of the size and solder amount.) 
![ui](https://i.imgur.com/j9sTmuf.png)

6. When finished, your pads should look like this:
![ui](https://i.imgur.com/s24cIQc.png)

7. Apply some Kapton tape to the back to prevent any shorting and isolate the board:
![ui](https://i.imgur.com/YyTgXqX.png)

8. Now it's time to make some pins to use in your thruhole RPi0W. You can cut these headers and use the pins like this:
![ui](https://i.imgur.com/JZgLVZN.png)
![ui](https://i.imgur.com/3GmWlnp.png)
![ui](https://i.imgur.com/T076UQ0.png)

9. Finally, place the pins in the screen and set your RPi0W on top; then solder the pins onto the RPi0W.
![ui](https://i.imgur.com/OMILljO.png)

10. And you're finished!