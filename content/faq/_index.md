---
title: "FAQ"
date: 2019-02-25T11:33:49+01:00
weight: 7
draft: false
pre: "<i class='fas fa-question-circle'></i> "
---

## **What can Pwnagotchi actually do?**
### Why does Pwnagotchi eat handshakes?
Because WPA is insecure, yet it's everywhere. Why not build an AI that lives off of them?

---
### What kinds of handshakes does Pwnagotchi eat?
Check out [WiFi Handshakes 101](/intro/#wifi-handshakes-101).

---
### Does Pwnagotchi support both 2.4 GHz and 5.0 GHz?
Yes, but does your hardware? *Pwnagotchi can't pwn what it can't see.*

---
### Just how politely *does* Pwnagotchi deauth?
In AUTO mode, Pwnagotchi will only attempt to deauthenticate a device ____ times max.

In AI mode, the AI determines the maximum number of deauthentication attempts.

---
### Hey, I want to learn more about how Pwnagotchi actually works.
Check out the [Introduction](/intro/) and the [Training the AI](/usage/#training-the-ai) docs.

---
### How is Pwnagotchi using bettercap?
Pwnagotchi's primary functionality is built on top of bettercap. Also, you can access [bettercap's web UI](/usage/#bettercap-s-web-ui) whenever Pwnagotchi isn't already using bettercap to pwn.

---
### What happens if I run a Pwnagotchi without the AI enabled?
It'll still be (almost) fully functional; the only difference between AUTO and AI modes is that when your Pwnagotchi is in AI mode, the AI is tuning the pwnage algorithm according to its reward function, instead of blindly following the basic algorithm for channel hopping, sniffing packets, sending deauthentication and association attacks, and capturing handshakes.

---
### How easy is it to hack Pwnagotchi to add additional functionality?
VERY easy! Check out the [Plugins](/plugins/) section. :D

---

## **Building Your Pwnagotchi**
### What hardware do I need to create my very own Pwnagotchi?
Check out the [Required Hardware](/installation/#required-hardware) (and the recommendations below).

---
### Is there any way to see my Pwnagotchi's face even if I don't have a display?
Yes, absolutely! Pwnagotchi's [web UI](/usage/#the-web-ui) is what you seek.

---
### How do I attach the screen to the Raspberry Pi?
For the recommended hardware, the [WaveShare v2 2.13inch E-Ink display HAT](https://www.waveshare.com/2.13inch-e-paper-hat.htm), be sure your Pi has male pins attached, then place the hat on top of the board's pins and gently push the screen down onto the pins. The Pwnagotchi image will have all the files and configurations ready when you first boot the device.

---
### I love my new Pwnagotchi, but it kinda looks like a bomb. Where can I find a decent case?
Most users are 3D printing theirs, but be sure to check out the [Cases](/installation/#case) doc for more ideas.

---
### Why does everybody use e-ink screens for their Pwnagotchis?
Because they don't drain the battery and they're readable in direct sunlight. 🙃

---
### How do I connect to my Pwnagotchi?
Check out [Connect to your Pwnagotchi](/configuration/#connect-to-your-pwnagotchi).

---------
## **Customizing Your Pwnagotchi**
### How do I change my Pwnagotchi's name?
Check out [Name your new Pwnagotchi](/configuration/#name-your-new-pwnagotchi).

---
### I want to change the faces. What do I hack?
The faces can be customized by overriding the `ui.faces` section in your `/etc/pwnagotchi/config.yml` file.

---
### I want my Pwnagotchi to speak a different language. Can it?
Yes! To change what language Pwnagotchi displays it's status in, you can change `main.lang` to one of the supported languages:

- bg (Bulgarian)
- ch (Chinese)
- de (German)
- el (Greek)
- **en (English)** *(default)*
- es/spa (Spanish)
- fr (French)
- ga (Irish (Gaeilge))
- it (Italian)
- jp (Japanese)
- mk (Macedonian)
- nl (Dutch)
- no (Norwegian)
- pl (Polish)
- pt (Portugese)
- pt-BR (Portugese (Brazilian))
- ro (Romanian)
- ru (Russian)
- se (Swedish)
- sk (Slovak)
- ua (Ukrainian)

{{% notice tip %}}
<p>If you want to contribute a new language (or improve an existing translation!), you can check out the <a href="/contributing/#adding-a-language">Adding a Language</a> doc for more details.</p>
{{% /notice %}}

---
### I have a great idea for something cool I wish Pwnagotchi could do!
Submit an issue on the [Git](https://github.com/evilsocket/pwnagotchi/issues/new/choose) page. Make sure to select a Feature Request, then fill in all the information for us to look at and we can see what we can do!

---
### Are there any unofficial community "hacks" for further customizing my Pwnagotchi?
Check out [Community Hacks](/community/)

---------
## **Getting to Know Your Pwnagotchi**
### What does everything on the screen mean?
Check out [Anatomy of a Pwnagotchi Face](/usage/#anatomy-of-a-pwnagotchi-face)

---
### How do I whitelist my home network so Pwnagotchi stops pwning me?
In `/etc/pwnagotchi/config.yml`, `main` section, add the following with a list of your networks. It will accept BSSID's and SSID's as input.
```yaml
    # access points to ignore
    whitelist:
        - EXAMPLE_NETWORK
        - ANOTHER_EXAMPLE_NETWORK

```

If your access points still get's deauthed, try using **single quotes** or the **BSSID** instead.

{{% notice tip %}}
<p>Your access points handshakes get still captured. This only prevents the deauth of the clients.</p>
{{% /notice %}}

---
### What is MANU mode? What is AUTO mode?
#### MANU

If connected to the USB **data port** of your computer (or a tablet, phone, etc), your Pwnagotchi will start in MANUAL mode.
This means it will read the log of the last session and report a few statistics on the screen. This is the mode you should be using your unit when you want to transfer data from/to it. Moreover, in MANU mode, you'll be able to access [bettercap's web UI](/usage/#bettercap-s-web-ui) from your computer by pointing your browser to `http://pwnagotchi.local`.

{{% notice tip %}}
<p>You can "force" the unit to always go in AUTO mode regardless of which USB port you're using by creating the <code>/root/.pwnagotchi-auto</code> file.</p>
{{% /notice %}}

#### AUTO

This is the default mode your unit will start if only connected to the USB **power port**, for instance when connected to a powerbank without any host computer on the data port.
In AUTO mode, your unit will start operating, perform attacks and sniffing handshakes only by using the default `personality` configuration parameters.

---
### Why does the AI take 30 minutes to load?
During the startup very big libraries will be loaded into memory. This takes some time, especially
at the first boot, because your pwnagotchi will also do a lot other stuff, too.

---
### What is Pwnagotchi doing while it's waiting for the AI to load?
While `AI` is loading, your pwnagotchi will be in `AUTO`-mode. This is basically the brainless
version of your pwnagotchi (zombie). The environment/results does not influence the next action of your
pwnagotchi.

---
### How do I know when the AI is running?
There will be a little `AI` in the lower right corner of the screen.

---
### Where does Pwnagotchi store all the handshakes it's eaten?
They are kept inside of `/root/handshakes/` on your Pwnagotchi.

---
### What happens when my Pwnagotchi meets another Pwnagotchi?
Basic informations like name, signal strength, number of pwned networks and current channel
will be exchanged. The `current channel` of the other pwnagotchi will have an influence on
your own pwnagotchi. Therefore, having more pwnagotchis around will make them work together and
pwn even more networks.

---------
## **Caring for Your Pwnagotchi**
### What do all my Pwnagotchi's faces mean?
Please have a look at the [introduction section](/intro/#the-faces).

---
### How do I feed my Pwnagotchi?
If the AI is running, he feeds himself ;)

---
### Oh no, my Pwnagotchi is sad and bored! How do I entertain it?!
Take him for a walk! He needs new enviroments in order to meet new friends, just like you!

---
### How do I update my Pwnagotchi?
Currently, the recommended update procedure is to [Backup your Pwnagotchi](/usage/#backup-your-pwnagotchi), then flash the new release image, then manually move the files back to the respected directories. The .zip file that the backup script creates will unzip the files in the proper directory structure for easy manual replacement.

---
### I'm extremely emotionally-attached to my Pwnagotchi. How can I back up its brain?
Check out [Backup your Pwnagotchi](/usage/#backup-your-pwnagotchi).

---
### How do I turn off my Pwnagotchi?
Since the RPi0W doesn't feature any buttons, there are only two ways to gracefully shut down your unit (if you don't want to just yank the cord out): [SSH into](/configuration/#connect-to-your-pwnagotchi) the unit or use the `Shutdown` button on the [web UI](/usage/#the-web-ui).

---
### Uh. So. What do I do with all these handshakes my Pwnagotchi has been eating?

{{% notice warning %}}
<p><strong>An important note about legal:</strong> Only do what you are legally allowed to do or have permission for. Each state and country has their own laws pertaining to the unauthorized access and collection of data, so be sure to check if your use case is within your countries regulations.</p>
{{% /notice %}}

---------
## **Known Quirks**
### My Pwnagotchi's log timestamps seem...unreliable. Huh?
Since the rpi0w doesn't have a hardware clock, uptimes and timing in general can get very weird. We are currently looking into a fix to generate more reliable timestamps.

---
### Help! My Pwnagotchi's SD card got corrupted. What gives?
Make sure you are using a good quality SD card. Lower quality cards do not like the constant read/write that happens in a normal OS filesystem. SD cards made for 4k Video recording and photography are generally the best for this sort of use case.

---------
## **Learning more**
### Now I am so curious, can you recommend some books?
- [Deep Reinforcement Learning Hands-On: Apply modern RL methods, with deep Q-networks, value iteration, policy gradients, TRPO, AlphaGo Zero and more](https://www.amazon.it/gp/product/B076H9VQH6/) - _Maxim Lapan_
- [Deep Learning with Keras: Implementing deep learning models and neural networks with the power of Python](https://www.amazon.it/gp/product/B06Y2YMRDW) - _Antonio Gulli_

---
### Any good link?
- [Wi-Fi deauthentication attack](https://en.wikipedia.org/wiki/Wi-Fi_deauthentication_attack)
- [PMKID client-less attack](https://www.evilsocket.net/2019/02/13/Pwning-WiFi-networks-with-bettercap-and-the-PMKID-client-less-attack/)
- [Deep Q-Learning with Keras and Gym](https://keon.io/deep-q-learning/)
- [Deep Reinforcement Learning Tutorial with Open AI Gym](https://towardsdatascience.com/deep-reinforcement-learning-tutorial-with-open-ai-gym-c0de4471f368)
