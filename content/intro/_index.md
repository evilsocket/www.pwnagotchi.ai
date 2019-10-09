---
title: "Introduction"
date: 2019-02-25T10:57:36+01:00
weight: 1
draft: false
pre: "<i class='fas fa-star-of-life' style='color:#b33636;'></i> "
---

[Pwnagotchi](https://twitter.com/pwnagotchi) is an [A2C](https://hackernoon.com/intuitive-rl-intro-to-advantage-actor-critic-a2c-4ff545978752)-based "AI" powered by [bettercap](https://www.bettercap.org/) that learns from its surrounding WiFi environment in order to maximize the [crackable WPA key material it captures](#wifi-handshakes-101) (either through passive sniffing or by performing deauthentication and association attacks). This material is collected on disk as PCAP files containing any form of crackable handshake supported by [hashcat](https://hashcat.net/hashcat/), including full and half WPA handshakes as well as [PMKIDs](https://www.evilsocket.net/2019/02/13/Pwning-WiFi-networks-with-bettercap-and-the-PMKID-client-less-attack/).

![handshake](https://i.imgur.com/pdA4vCZ.png)

## How does Pwnagotchi work?

Instead of merely playing [Super Mario or Atari games](https://becominghuman.ai/getting-mario-back-into-the-gym-setting-up-super-mario-bros-in-openais-gym-8e39a96c1e41?gi=c4b66c3d5ced) like most reinforcement learning based "AI" *(yawn)*, Pwnagotchi tunes [its own parameters](https://github.com/evilsocket/pwnagotchi/blob/master/sdcard/rootfs/root/pwnagotchi/config.yml#L54) over time to **get better at pwning WiFi things** in the environments you expose it to. 

To be more precise, Pwnagotchi is using an [LSTM with MLP feature extractor](https://stable-baselines.readthedocs.io/en/master/modules/policies.html#stable_baselines.common.policies.MlpLstmPolicy) as its policy network for the [A2C agent](https://stable-baselines.readthedocs.io/en/master/modules/a2c.html). If you're unfamiliar with A2C, here is a very good [introductory explanation](https://hackernoon.com/intuitive-rl-intro-to-advantage-actor-critic-a2c-4ff545978752) *(in comic form!)* of the basic principles behind how Pwnagotchi learns. Be sure to check out the [Usage](../usage/#training-the-ai) doc for more pragmatic details of how to help your Pwnagotchi learn as quickly as possible.

{{% notice tip %}}
<p>Unlike the usual reinforcement learning simulations, Pwnagotchi actually learns at a human timescale because it is interacting with a real-world environment instead of a well-defined virtual environment (like playing Super Mario). Time for a Pwnagotchi is measured in epochs; a single epoch can last anywhere from a few seconds to many minutes, depending on how many access points and client stations are visible.<br /><br />
	Do not expect your Pwnagotchi to perform amazingly well at the very beginning, as it will be <a href="https://hackernoon.com/intuitive-rl-intro-to-advantage-actor-critic-a2c-4ff545978752">exploring</a> several combinations of <a href="https://github.com/evilsocket/pwnagotchi/blob/master/docs/usage.md#training-the-ai">key parameters</a> to determine ideal adjustments for pwning the particular environment you are exposing it to during its beginning epochs ... but <strong>definitely listen to your Pwnagotchi when it tells you it's bored!</strong> Bring it into novel WiFi environments with you and have it observe new networks and capture new handshakes—and you'll see. :) <br /><br />
	<strong>Find out more about how to train your Pwnagotchi for optimal pwnage in the <a href="../usage/#training-the-ai">Usage</a> doc.</strong></p>
{{% /notice %}}

Multiple units within close physical proximity can "talk" to each other, advertising their own presence to each other by broadcasting custom information elements using a parasite protocol I've built on top of the existing dot11 standard. Over time, two or more Pwnagotchi units trained together will learn to cooperate upon detecting each other's presence by dividing the available channels among them for optimal pwnage.

![peers](https://i.imgur.com/Ywr5aqx.png)

Depending on the status of the unit, several states and states transitions are configurable and represented on the display as different moods, expressions and sentences. Pwnagotchi speaks [many languages](https://github.com/evilsocket/pwnagotchi/blob/master/docs/configure.md#configuration), too!

Of course, it IS possible to run your Pwnagotchi with the AI disabled (configurable in `config.yml`). Why might you want to do this? Perhaps you simply want to use your own fixed parameters (instead of letting the AI decide for you), or maybe you want to save battery and CPU cycles, or maybe it's just you have strong concerns about aiding and abetting baby Skynet. Whatever your particular reasons may be: an AI-disabled Pwnagotchi is still a simple and very effective automated deauther, WPA handshake sniffer, and portable [bettercap](https://www.bettercap.org/) + [webui](https://github.com/evilsocket/pwnagotchi/blob/master/docs/usage.md#bettercaps-web-ui) dedicated hardware.

{{% notice info %}}
<p><strong>In case you're curious about the name:</strong> <em>Pwnagotchi</em> is a combination of <em>pwn</em> and <em>-gotchi</em>. It is a nostalgic reference made in homage to a very popular children's toy from the 1990s called the <a href="https://en.wikipedia.org/wiki/Tamagotchi">Tamagotchi</a>. The Tamagotchi (たまごっち, derived from <em>tamago</em> (たまご) "egg" + <em>uotchi</em> (ウオッチ) "watch") is a cultural touchstone for many Millennial hackers as a formative electronic toy from our collective childhoods. Were you lucky enough to possess a Tamagotchi as a kid? Well, with your Pwnagotchi, you too can enjoy the nostalgic delight of being strangely emotionally attached to a handheld automata <em>yet again!</em> Except, this time around...you get to #HackThePlanet. >:D</p>
{{% /notice %}}

## WiFi Handshakes 101

In order to understand why it's valuable to have an AI that wants to eat handshakes, it's helpful to understand a little bit about how handshakes are used in the WPA/WPA2 wireless protocol.

Before a client device that's connecting to a wireless access point—say, for instance, your phone connecting to your home WiFi network—is able to securely transmit to and receive data from that access point, a process called the **4-Way Handshake** needs to happen in order for the WPA encryption keys to be generated. This process consists of the exchange of four packets (hence the "4" in "4-Way") between the client device and the AP; these are used to derive session keys from the access point's WiFi password. Once the packets have been successfully exchanged and the keys are generated, the client device is authenticated and can start sending and receiving data packets (now secured by encryption) to and from the wireless AP.

<p align="center">
<img src="https://i.imgur.com/nI8IE6a.png"/>
<br/>
<small>image taken from <a target="_blank" href="https://www.wifi-professionals.com/2019/01/4-way-handshake">wifi-professionals.com</a></small>
</p>

So...what's the catch? Well, these four packets can easily be "sniffed" by an attacker monitoring nearby (say, with a Pwnagotchi 😇). And once recorded, that attacker can use [dictionary and/or bruteforce attacks](https://hashcat.net/wiki/doku.php?id=cracking_wpawpa2) to crack the handshakes and recover the original WiFi key. In fact, **successful recovery of the WiFi key doesn't necessarily even need all four packets!** A half-handshake (containing only two of the four packets) can be cracked, too—and in some *(most)* cases, just [a single packet is enough](https://hashcat.net/forum/thread-7717-post-41447.html), *even without clients.*

In order to ~~eat~~ collect as many of these crackable handshake packets as possible, Pwnagotchi uses two strategies:

1. **Deauthenticating the client stations it detects.** A deauthenticated device must reauthenticate to its access point by re-performing the 4-Way Handshake with the AP, thereby giving Pwnagotchi another chance to sniff the handshake packets and collect more crackable material.
2. **Sending association frames directly to the access points themselves**
to try to force them to [leak the PMKID](https://www.evilsocket.net/2019/02/13/Pwning-WiFi-networks-with-bettercap-and-the-PMKID-client-less-attack/).

{{% notice tip %}}
<p>In addition to the two above methods, <strong>there is a third method by which Pwnagotchi completely passively collects handshakes:</strong> if a device happens to be attempting to authenticate to an AP on the same channel that the unit just so happens to be monitoring at that time, Pwnagotchi may <s>eat</s> collect handshakes completely by chance (and <strong>not</strong> as the result of a deauthentication or PMKID attack).<br /><br />

For instance, even if you whitelist your home network so that Pwnagotchi knows to never actively attack it, you will <strong>still</strong> passively collect handshakes for that network <em>by chance</em> as your Pwnagotchi is simply sniffing packets in its environment. (If you're monitoring a residential area, you might see an uptick in handshakes passively acquired as your neighbors turn on their devices in the morning and again in the early evening when they return home after work.)</p>
{{% /notice %}}

All the handshakes captured by your Pwnagotchi are saved into `.pcap` files on its filesystem. Each PCAP file that Pwnagotchi generates is organized according to access point; one PCAP will contain all the handshakes that Pwnagotchi has ever captured for that particular AP. These handshakes can later be [cracked with proper hardware and software](https://hashcat.net/wiki/doku.php?id=cracking_wpawpa2).

<!--

## Pwnagotchis on the PwnGrid

TODO 

### PwnLympics

TODO

### Statistics

TODO 

### Geographical Heatmap

TODO
-->

## License

`pwnagotchi` is made with ♥  by [@evilsocket](https://twitter.com/evilsocket) and the [amazing dev team](https://github.com/evilsocket/pwnagotchi/graphs/contributors). It is released under the GPL3 license.
