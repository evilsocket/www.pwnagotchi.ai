---
title: "Installation"
date: 2019-02-25T10:57:57+01:00
draft: false
weight: 2
pre: "<i class='fas fa-flask'></i> "
---

- [**Required Hardware**](/installation/#required-hardware)
   - [Body](/installation/#body-nbsp)
   - [SD card](/installation/#sd-card)
   - [Battery](/installation/#battery)
   - [Display](/installation/#display)
   - [Case](/installation/#case)
- [**Flashing an Image**](/installation/#flashing-an-image)

## Required Hardware

- A [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) *(see [here](/installation/#body-nbsp) for more details on alternative bodies).*
- A [**microSD card**](/installation/#sd-card) (8GB minimum recommended, **preferably of good quality and speed**).
- A decent quality **micro-USB cord** that **allows data transfer** (not just charging!)
- A portable **power bank** *(see [here](/installation/#battery) for benchmarks with popular portable batteries).*
- **Optional:** One of the [supported displays](/installation/#display).

<p align="center">{{% button href="#flashing-an-image" %}}<b>Already got all your hardware?</b> Skip to flashing the SD card!{{% /button %}}</p>

### Body &nbsp;

The "vanilla" hardware setup for a Pwnagotchi is a [**Raspberry Pi 0 W**](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) (usually referred to as `RPi0W` throughout this documentation). Most development and testing has been conducted on Pwnagotchis living in RPi0W bodies configured as an [USB ethernet gadget](https://learn.adafruit.com/turning-your-raspberry-pi-zero-into-a-usb-gadget/ethernet-gadget) device (in order to connect to it via USB). That said:

- Some users have gotten their Pwnagotchi running on other types of Raspberry Pi with no apparent issues (🤞). This includes:
  - Raspberry Pi 3
  - Raspberry Pi 4
- In fact, **technically ANY** GNU/Linux computer with a WiFi interface that supports monitor mode could be used to host a Pwnagotchi—given the appropriate configuration tweaks.

### SD card

The microSD card ought to be:

- a minimum of 8 GBs capacity.
- of decent quality and speed ([from UHS-2 on](https://www.expertreviews.co.uk/storage/1404380/how-to-choose-an-sd-card-class-and-speed-ratings-explained)).

### Battery

If you're going to be taking your Pwnagotchi out into the world to find new and exciting WiFi environments (!), you're going to need to power it with an external battery. Depending on your priorities, you may only need a small battery if you're just going to be out for a couple hours. But if you're going to be out all day, you might need something bigger. *How do you know what you'll need to keep your Pwnagotchi pwning?* 

Happily, our users have submitted some preliminary benchmarks using some popular batteries to help give you a sense for how long a particular battery is likely to be able to power your Pwnagotchi when you take it out into the WiFi wilderness. :)

Manufact. | Model | mAh | Pwn Version | Body | Mode | Observed Duration | Date Tested
----------|-------|-----|-------------|------|------|-------------------|------------
PiSugar | [PowerPack L](https://github.com/PiSugar/PiSugar) | 1200 | (alpha) | RPi0W | AI | 04:49:42 | 2019-10-07 
UPS-Lite | [UPS-Lite V1.1](https://aliexpress.com/item/32954180664.html) | 1000 | (alpha) | RPi0W | AI | 03:10:00 | 2019-10-19 
*unbranded* | *unknown* | 2000 | (alpha) | RPi0W | AI | 08:24:00 | 2019-10-07 
Anker | AstroMini 79AN7913S | 3200 | (alpha) | RPi0W | AI | 10:18:00 | 2019-10-08
Anker | PowerCore [A1109](https://www.anker.com/products/variant/powercore-5000/A1109011) | 5000 | (alpha) | RPi0W | AUTO | 05:MM:SS | 2019-09-DD 
Anker | PowerCore [20100](https://www.anker.com/products/variant/powercore-20100/A1271012) | 20000 | (alpha) | RPi0W | AI | 19:44:00 | 2019-10-07
Anker | Astro E7 [A1210](https://www.anker.com/products/variant/astro-e7-26800mah-portable-charger/A1210012) | 25600 | (alpha) | RPi0W | AUTO | 49:MM:SS | 2019-09-DD
*unknown* | *unknown* | 4400 | (alpha) | *unknown* | *unknown* | 08:XX:XX | [2019-10-05](https://twitter.com/BosAnon1/status/1180644126309720064?s=20)

#### UPS-Lite Battery level indicator plugin

UPS-Lite V1.1 is nice and feature-rich battery hat. It has battery charge controller which communicate over I2C interface and can tell its' voltage level. It also has built-in UART->USB adapter connected to raspbbery UART pins so you can connect to serial console using the same microUSB port while charing the battery.

Pwnagotchi has a `ups_lite` plugin to display battery on the screen. Before using it i2c interface should be enabled in `raspi-config`.

![Pwnagotchi UPS-Lite V1.1 Battery level indicator plugin](https://i.imgur.com/5cncoXL.jpg)

### Display

{{% notice tip %}}
<p>If you want to use the web UI (instead of an e-ink display attached to your unit's RPi0W) to see your Pwnagotchi's face, check out the <a href="/usage/#the-web-ui">web UI</a> doc for more details on using the web UI.</p>
{{% /notice %}}

If, instead, you want to fully enjoy walking around and literally looking at your unit's cute af face, the supported e-ink display models are:

- **[Waveshare eInk Display (both V1 and V2)](https://www.waveshare.com/2.13inch-e-paper-hat.htm) \***
  - [Product comparison](https://www.waveshare.com/4.3inch-e-paper.htm) (scroll down to `Selection Guide`)
  - [GitHub](https://github.com/waveshare/e-Paper/tree/master/RaspberryPi%26JetsonNano/python)
  - **\* The Waveshare V2 is the officially-supported e-ink display for Pwnagotchi. See [Recommendations](/installation/#recommendations) for more details.** The Waveshare V2 can be distinguished from the V1 by the presence of a [red sticker](https://www.waveshare.com/wiki/2.13inch_e-Paper_HAT#Versions) on the screen.
- [Pimoroni Inky pHAT](https://shop.pimoroni.com/products/inky-phat)
  - [Product page](https://shop.pimoroni.com/products/inky-phat)
  - [GitHub](https://github.com/pimoroni/inky)
- [PaPiRus eInk Screen](https://uk.pi-supply.com/products/papirus-zero-epaper-screen-phat-pi-zero)

Before purchasing a display, see [Recommendations](/installation/#recommendations) for more details about choosing the right display. If you find yourself struggling with the screen you've chosen, there are dedicated #waveshare and #inky channels for troubleshooting in the [Pwnagotchi Slack](https://pwnagotchi.herokuapp.com/).

Needless to say, we are always happy to receive pull requests updating support for existing models as well as adding support for new models. ❤️

{{% notice warning %}}
<p>Not all displays are created equally! TFT displays, for example, work similar to an HDMI display, and they are NOT supported. <strong>Currently, all the officially-supported displays are I2C displays.</strong> If you are still interested in using unsupported displays, you may be able to find a community-submitted hack in the <a href="/hacks/#screens">Screens</a> section of the <a href="/hacks/">Hacks</a> page. We are not responsible for anything you break by trying to use any display that is not officially supported by the development team!</p>
{{% /notice %}}

#### Color vs. Black & White e-ink displays

Some of the supported displays support both **Black & White** and **Colored** versions. One common question whether there are meaningful differences between the two. There are:

- **Color displays have a much slower refresh rate.** In some cases, it can take up to 15 seconds; if slow refresh rates are something that you want to avoid, we recommend you use B&W displays.
- The 3-color 2.13" Waveshare displays have a slightly smaller pixel layout (104x212) compared to their B&W counterparts (122x250).
- We recommend you stick to the **Waveshare B&W V2.**

#### Recommendations
- **The Waveshare V2 screen is the officially supported e-ink screen for the following reasons:**
   - supports partial refreshes of the screen, which avoids those black screens between full refreshes.
   - better rendering of font UI elements.
   - features a higher functional resolution compared to the Inky pHATs.
   - will always have the most updated and best supported UI elements; Pwnagotchi's primary developer ([@evilsocket](https://twitter.com/evilsocket)) will be testing new features exclusively on Waveshare V2s.
   - the continued support for other e-ink display models like the Inky pHAT depends entirely on users' continued contributions to the code.
- Avoid the Waveshare eInk **3-color** display. The refresh time is 15 seconds.
- Avoid the Pimoroni Inky pHAT **v1.** They're discontinued due to a faulty hardware part source used in manufacturing that resulted in high failure rates.


### Case

We recommend housing your Pwnagotchi's body in a case if you don't want your Pwnagotchi to get dirty (or short the GPIO pins on the back, or be mistaken for a bomb...).

If you're running your Pwnagotchi in headless mode (AKA without a screen) and are using its [web UI](/usage/#the-web-ui) instead of an e-ink screen, any generic case for a RPi0W ought to do the trick. But if you've installed an e-ink screen on your RPi0W in order to view your Pwnagotchi's face without any external equipment, you'll probably need to make or acquire a custom case.

A few users have already designed custom cases you can 3D print (If you don't have access to a 3D printer yourself, you can use a service like Shapeways or treatstock.com to have a case printed on demand):

- [@DorkfeastTeam](https://twitter.com/dorkfeastteam)'s [Pwnagotchi case on Thingiverse](https://www.thingiverse.com/thing:3849519) for use with a Raspberry Pi 0 and a Waveshare e-ink screen.
- [@elkentaro](https://twitter.com/elkentaro)'s [Pwnagotchi case on Thingiverse](https://www.thingiverse.com/thing:3879459) for use with a Raspberry Pi 0 and a Waveshare e-ink screen. There is 71.5x34x20mm available for the acrylic plate on the 3D printed model. (MK3S, PET, 0.25mm extruder, 0.15mm layer height.)
- [@3MUl0R](https://twitter.com/3mul0r)'s [Pwnagotchi case for RPi0W with Inky pHAT](https://www.thingiverse.com/thing:3897860) is the only case (that we are aware of) designed to fit the RPi0Ws fitted with the Inky pHAT e-ink display.

If you're looking for a ready-made case that fits (albeit bulkily):

- [This enclosure on Amazon](https://www.amazon.com/gp/product/B072FS3W7X) works if you drill a hole in the side. 
- A RPi0W+Waveshare screen also fits in a large classic Altoid tin. You can [cut holes](https://www.head-fi.org/threads/best-way-to-create-holes-in-an-altoids-tin.406228/#post-5370959) in the side for the wires with a paper-hole punch.

There are many creative Pwnagotchi case set-ups. We have a dedicated `#cases` channel in our Slack for all your case-related discussion needs!

## Flashing an Image

The easiest way to create a new Pwnagotchi is downloading the latest stable image from [our release page](https://github.com/evilsocket/pwnagotchi/releases) and writing it to your SD card. 

<p align="center">{{% button href="https://github.com/evilsocket/pwnagotchi/releases" icon="fas fa-download" %}}Download the latest Pwnagotchi release{{% /button %}}<br /><br /></p>

Once you have downloaded the latest Pwnagotchi image, you will need to use an image writing tool to install that image on your SD card. We recommend using [balenaEtcher](https://www.balena.io/etcher/), a graphical SD card writing tool that works on Mac OS, Linux, and Windows; it is the easiest option for most users. (balenaEtcher also supports writing images directly from the ZIP file, without any unzipping required!)

**To write your Pwnagotchi image with balenaEtcher:**

- Download the latest **[Pwnagotchi .img file](https://github.com/evilsocket/pwnagotchi/releases).**
- Download **[balenaEtcher](https://www.balena.io/etcher/)** and install it.
- Connect an SD card reader with the SD card inside.
- Open **balenaEtcher** and select from your hard drive the Raspberry Pi `.img` or `.zip` file you wish to write to the SD card.
- Select the SD card you wish to write your image to.
- Review your selections, then click `Flash!` to begin writing data to the SD card.

**Wait before removing the SD card** as you will need to create one last file on it with the [initial configuration](/configuration/).
