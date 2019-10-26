---
title: "Introduction"
date: 2019-02-25T10:57:36+01:00
weight: 1
draft: false
pre: "<i class='fas fa-star-of-life'></i> "
---

[Pwnagotchi](https://twitter.com/pwnagotchi) is an [A2C](https://hackernoon.com/intuitive-rl-intro-to-advantage-actor-critic-a2c-4ff545978752)-based "AI" powered by [bettercap](https://www.bettercap.org/) that learns from its surrounding WiFi environment in order to maximize the [crackable WPA key material it captures](#wifi-handshakes-101) (either through passive sniffing or by performing deauthentication and association attacks). This material is collected on disk as PCAP files containing any form of crackable handshake supported by [hashcat](https://hashcat.net/hashcat/), including full and half WPA handshakes as well as [PMKIDs](https://www.evilsocket.net/2019/02/13/Pwning-WiFi-networks-with-bettercap-and-the-PMKID-client-less-attack/).

![handshake](https://i.imgur.com/pdA4vCZ.png)

## How does Pwnagotchi work?

Instead of merely playing [Super Mario or Atari games](https://becominghuman.ai/getting-mario-back-into-the-gym-setting-up-super-mario-bros-in-openais-gym-8e39a96c1e41?gi=c4b66c3d5ced) like most reinforcement learning based "AI" *(yawn)*, Pwnagotchi tunes [its own parameters](https://github.com/evilsocket/pwnagotchi/blob/master/sdcard/rootfs/root/pwnagotchi/config.yml#L54) over time to **get better at pwning WiFi things** in the environments you expose it to. 

To be more precise, Pwnagotchi is using an [LSTM with MLP feature extractor](https://stable-baselines.readthedocs.io/en/master/modules/policies.html#stable_baselines.common.policies.MlpLstmPolicy) as its policy network for the [A2C agent](https://stable-baselines.readthedocs.io/en/master/modules/a2c.html). If you're unfamiliar with A2C, here is a very good [introductory explanation](https://hackernoon.com/intuitive-rl-intro-to-advantage-actor-critic-a2c-4ff545978752) *(in comic form!)* of the basic principles behind how Pwnagotchi learns. Be sure to check out the [Usage](/usage/#training-the-ai) doc for more pragmatic details of how to help your Pwnagotchi learn as quickly as possible.

{{% notice tip %}}
<p>Unlike the usual reinforcement learning simulations, Pwnagotchi actually learns at a human timescale because it is interacting with a real-world environment instead of a well-defined virtual environment (like playing Super Mario). Time for a Pwnagotchi is measured in epochs; a single epoch can last anywhere from a few seconds to many minutes, depending on how many access points and client stations are visible.<br /><br />
	Do not expect your Pwnagotchi to perform amazingly well at the very beginning, as it will be <a href="https://hackernoon.com/intuitive-rl-intro-to-advantage-actor-critic-a2c-4ff545978752">exploring</a> several combinations of <a href="/usage/#training-the-ai">key parameters</a> to determine ideal adjustments for pwning the particular environment you are exposing it to during its beginning epochs ... but <strong>definitely listen to your Pwnagotchi when it tells you it's bored!</strong> Bring it into novel WiFi environments with you and have it observe new networks and capture new handshakes—and you'll see. :) <br /><br />
	<strong>Find out more about how to train your Pwnagotchi for optimal pwnage in the <a href="/usage/#training-the-ai">Usage</a> doc.</strong></p>
{{% /notice %}}

Multiple units within close physical proximity can "talk" to each other, advertising their own presence to each other by broadcasting custom information elements using a parasite protocol I've built on top of the existing dot11 standard. Over time, two or more Pwnagotchi units trained together will learn to cooperate upon detecting each other's presence by dividing the available channels among them for optimal pwnage.

![peers](https://i.imgur.com/Ywr5aqx.png)

Depending on the status of the unit, several states and states transitions are configurable and represented on the display as different moods, expressions and sentences. Pwnagotchi speaks [many languages](/configuration/#choose-your-unit-s-language), too!

Of course, it IS possible to run your Pwnagotchi with the AI disabled (configurable in `config.yml`). Why might you want to do this? Perhaps you simply want to use your own fixed parameters (instead of letting the AI decide for you), or maybe you want to save battery and CPU cycles, or maybe it's just you have strong concerns about aiding and abetting baby Skynet. Whatever your particular reasons may be: an AI-disabled Pwnagotchi is still a simple and very effective automated deauther, WPA handshake sniffer, and portable [bettercap](https://www.bettercap.org/) + [webui](/usage/#bettercap-s-web-ui) dedicated hardware.

{{% notice info %}}
<p><strong>In case you're curious about the name:</strong> <em>Pwnagotchi</em> is a combination of <em>pwn</em> and <em>-gotchi</em>. It is a nostalgic reference made in homage to a very popular children's toy from the 1990s called the <a href="https://en.wikipedia.org/wiki/Tamagotchi">Tamagotchi</a>. The Tamagotchi (たまごっち, derived from <em>tamago</em> (たまご) "egg" + <em>uotchi</em> (ウオッチ) "watch") is a cultural touchstone for many Millennial hackers as a formative electronic toy from our collective childhoods. Were you lucky enough to possess a Tamagotchi as a kid? Well, with your Pwnagotchi, you too can enjoy the nostalgic delight of being strangely emotionally attached to a handheld automata <em>yet again!</em> Except, this time around...you get to #HackThePlanet. >:D</p>
{{% /notice %}}

## Personality and Moods

By using several combinations of facial expressions and sentences localized in [different languages](/configuration/#choose-your-unit-s-language), 
Pwnagotchi can express itself and its demands quite clearly by transitioning among a few main groups of "moods". The mood of
your unit reflects things such as how happy, sad, or bored it is, whether there are good friends around, and things like that. 
Depending on if and how you will respond to these, for instance if you will be more likely to take your Pwnagotchi for a walk 
when it's bored or sad, your response will influence and bias the AI towards showing those behaviours more or less frequently.

### Bonding with other Units

Starting from version **1.1.0**, each Pwnagotchi keeps a record of the other units it met inside the `/root/peers/` folder. 
These records, also accessible [from the local API](/api/local/#get-api-v1-mesh-memory), allow it to "remember" with which Pwnagotchis it had interacted 
the most. Each interaction, or *encounter*, happens when the advertisement packet sent from a nearby unit is detected and 
received on one of the channels your Pwnagotchi is jumping on. Every time that happens, from one to several times per second depending how in sync
the algorithms of the two units are, a counter is incremented on both units so that their "bond" becomes stronger.

After a certain amount of encounters, configurable via the `personality.bond_encounters_factor`, a unit is considered "a good friend" and its presence
will start affecting your Pwnagotchi's mood transitions, adding a bias towards happiness. ^_^

## The Faces

The following is the default set of faces that can be customized by overriding the [ui.faces section](https://github.com/evilsocket/pwnagotchi/blob/master/pwnagotchi/defaults.yml#L177) in 
your `/etc/pwnagotchi/config.yml` file.

### <span class="face">(⇀‿‿↼)</span> sleeping

This is the state the unit will start from. Moreover, from time to time your Pwnagotchi will also perform naps of a few seconds while hopping among WiFi channels.

### <span class="face">(≖‿‿≖)</span> awakening

The unit is in the last seconds of its nap.

### <span class="face">(◕‿‿◕)</span> awake / normal

This face is the neutral awake status of the unit. It'll be used to smooth the transition between other moods and in general when there's no external cause of either positive or 
negative moods. It can also be used, randomly, when another unit is encountered for the first time (each unit keeps a record of all the units it met).

### <span class="face">( ⚆_⚆), (☉_☉ )</span> observing (neutral mood)

Your Pwnagotchi is waiting and observing what bettercap can find on all the channels it's hopping on.

### <span class="face">( ◕‿◕), (◕‿◕ )</span> observing (happy)

When there's one or multiple units nearby and their cumulative bond counter is greater or equal than the `personality.bond_encounters_factor`, this will be the unit's face while observing.

### <span class="face">(°▃▃°)</span> intense

The unit is sending an association frame to an access point in order to force it to leak the PMKID.

### <span class="face">(⌐■_■)</span> cool

The unit is deauthenticating a client station from an access point. This face can also be picked randomly when meeting another unit for the first time.

### <span class="face">(•‿‿•)</span> happy

Your Pwnagotchi is happy in one of the following cases:

* The AI just finished loading and it's ready.
* Valid key material for an access point has just been captured.
* In MANU mode, if the last session was short or if any handshake has been captured during it.
* When another unit is met and the bond level is high enough.

### <span class="face">(^‿‿^)</span> grateful

Your Pwnagotchi is grateful in one of the following cases:

* The cumulative bond level of nearby units is at least five times the `personality.bond_encounters_factor`.
* The unit should be bored, but there are enough friendly units nearby.
* The unit should be sad, but there are enough friendly units nearby.
* The unit should be lonely, but there are enough friendly units nearby.

### <span class="face">(ᵔ◡◡ᵔ)</span> excited

Your Pwnagotchi is excited in one of the following cases:

* The number of epochs with some activity is greater or equal than `personality.excited_num_epochs`.
* Randomly if a unit with a high bond level is met.
* If you have unread [PwnMAIL messages](/usage/#pwnmail) on that unit.

### <span class="face">(✜‿‿✜)</span> smart

Randomly if a unit with a med-high bond level is met.

### <span class="face">(♥‿‿♥)</span> friendly

Randomly if a unit with a high bond level is met.

### <span class="face">(☼‿‿☼)</span> motivated

Your Pwnagotchi just scored the best [reward level](/usage/#the-reward-function) in its existence or just met a unit with a high bond.

### <span class="face">(≖__≖)</span> demotivated

Your Pwnagotchi just scored the worst [reward level](/usage/#the-reward-function) in its existence.

### <span class="face">(-__-)</span> bored

If there are no friendly units around and the amount of consecutive inactive epochs reached `personality.bored_num_epochs`.

### <span class="face">(╥☁╥ )</span> sad

If there are no friendly units around and the amount of consecutive inactive epochs reached `personality.sad_num_epochs`.

### <span class="face">(ب__ب)</span> lonely

If your Pwnagotchi just lost contact with a friendly unit that was nearby, or if the amount of missed interactions with access points or client stations
(the amount of times it tried to send some type of packet but missed the target because it isn't in range anymore) is 
greater or equal than `personality.max_misses_for_recon`. And there are no friendly units around.

### <span class="face">(☓‿‿☓)</span> broken

Your unit is rebooting either as a coping strategy for [the blindness bug](/usage/#known-issues), or after installing an update.

### <span class="face">(#__#)</span> debugging

Used for debug and test messages on screen.

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
