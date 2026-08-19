# Pwnagotchi: Deep Reinforcement Learning for WiFi pwning!

[Pwnagotchi](https://twitter.com/pwnagotchi) is an [A2C](https://hackernoon.com/intuitive-rl-intro-to-advantage-actor-critic-a2c-4ff545978752)-based "AI" powered by [bettercap](https://www.bettercap.org/) and running on a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) that learns from its surrounding WiFi environment in order to maximize the [crackable WPA key material it captures](/intro/#wifi-handshakes-101) (either through passive sniffing or by performing deauthentication and association attacks). This material is collected on disk as PCAP files containing any form of handshake supported by [hashcat](https://hashcat.net/hashcat/), including full and half WPA handshakes as well as [PMKIDs](https://www.evilsocket.net/2019/02/13/Pwning-WiFi-networks-with-bettercap-and-the-PMKID-client-less-attack/).  

Learn more about [the project and how it started on the author's blog](https://www.evilsocket.net/2019/10/19/Weaponizing-and-Gamifying-AI-for-WiFi-Hacking-Presenting-Pwnagotchi-1-0-0/).

<img src="https://media.giphy.com/media/f9GsXyfgEQbY65fnhu/source.gif"/>

Instead of merely playing [Super Mario or Atari games](https://becominghuman.ai/getting-mario-back-into-the-gym-setting-up-super-mario-bros-in-openais-gym-8e39a96c1e41?gi=c4b66c3d5ced) like most reinforcement learning based "AI" *(yawn)*, Pwnagotchi tunes [its own parameters](https://github.com/evilsocket/pwnagotchi/blob/master/pwnagotchi/defaults.toml#L137) over time to **get better at pwning WiFi things** in the real world environments you expose it to.

{{% notice tip %}}
<p><strong>Learn more about <a href="/intro/#how-does-pwnagotchi-work">how Pwnagotchi works</a> and why it <a href="/intro/#wifi-handshakes-101">eats WPA handshakes</a> in the <i class='fas fa-star-of-life' style='color:#b33636;'></i> <a href="/intro/">Introduction</a> doc. You can also read about <a href="https://www.evilsocket.net/2019/10/19/Weaponizing-and-Gamifying-AI-for-WiFi-Hacking-Presenting-Pwnagotchi-1-0-0/" target="_blank">the story of the project</a>.</strong></p>
{{% /notice %}}

## But...why?

To give hackers an excuse to learn about reinforcement learning and WiFi networking—and have a reason to get out for more walks.

Also? **It's cute as f---**.

{{% notice info %}}
<p><strong>In case you're curious about the name:</strong> <em>Pwnagotchi</em> (ポーナゴッチ) is a portmanteau of <em>pwn</em> and <em>-gotchi</em>. It is a nostalgic reference made in homage to a very popular children's toy from the 1990s called the <a href="https://en.wikipedia.org/wiki/Tamagotchi">Tamagotchi</a>. The Tamagotchi (たまごっち, derived from <em>tamago</em> (たまご) "egg" + <em>uotchi</em> (ウオッチ) "watch") is a cultural touchstone for many Millennial hackers as a formative electronic toy from our collective childhoods. <br /><br />Were <em>you</em> lucky enough to possess a Tamagotchi as a kid? Well, with your Pwnagotchi, you too can enjoy the nostalgic delight of being strangely emotionally attached to a handheld automata <em>yet again!</em> Except, this time around...you get to #HackThePlanet. >:D</p>
{{% /notice %}}
