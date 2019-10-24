---
title: "Grid"
date: 2019-02-25T10:57:36+01:00
weight: 1
draft: false
---

[PwnGRID authentication mechanism](/api/grid/#post-api-v1-unit-enroll) is based on the RSA keypair that's unique to each unit and generated on boot. In order to authenticate, the unit needs to 
perform a procedure called "enrollment", which consists in sending a cryptographically signed payload in order to prove the unit's identity.

After this payload is verified server side, a standard [JWT token](https://tools.ietf.org/html/rfc7519) is generated and sent to the unit for 
further requests. This token has to be refreshed every 30 minutes and must be used via the Authentication header as:

```
POST https://api.pwnagotchi.ai/api/v1/some-api-path
...
...
Authorization: token ... JWT token here ...
...
```

{{% notice warning %}}
<p>
Despite the RSA keys can be moved from <code>/etc/pwnagotchi/</code> and used on any computer, leaving them on your unit and authenticating through it 
will provide basic hardware isolation and therefore improve the security of the keys.
</p>
{{% /notice %}}

All requests go to https://api.pwnagotchi.ai/, paths indicated with <i class="fas fa-lock-open"></i> do not require authentication, the ones with <i class="fas fa-lock"></i> instead require 
the aforementioned JWT token.

## GET /api/v1/units

Get a paged list of all the enrolled units, use `?p=2` for pages other than the first one. <i class="fas fa-lock-open"></i>

{{%expand "Example Response"%}}
<pre><code>{
	"pages": 17,
	"records": 409,
	"units": [{
		"enrolled_at": "2019-10-06T22:56:06Z",
		"updated_at": "2019-10-15T09:57:37Z",
		"country": "IT",
		"name": "alpha",
		"fingerprint": "ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea",
		"public_key": "-----BEGIN RSA PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzJQRTn1KDdIxduFq/pB+\nQ/+pNtvegmGAmzwb3YlP+SzhihbBUIOx85TodOEQZ1efUZy6Jn3ig6gPib3a2JsM\nT85P/Fxwfz6HrC8UlaOMaDyMksDgO7ZBM4zxthL8kgwtF9N7BYXn9nBZ2ReS1Gua\ncwayBkcMUlX83fpFe15fosXF3WeBO6jSa56YLuYDaxugUODhHR9C30n6okR2wssx\n2mUK6r6/smhSqoXwLttej4YvLi0NEvhdgp1Qy5zNHdcMhqJcxvbhFrJFx4JFZLdR\nLshs2nwTQq3rwyqC8nZvHCxXOdmFXBlSY6nQzILPLVlbeUYACeyfrOGFwdsXxq8u\nk/+Q6h9MFvdDGErv16eDYd0t/s0c0h8rHcGZpPYSE/zWviM+vQgpBPUEE4JBFNro\nxCOUjVtTWHlsjnp5dIQexagXm1/5jP1ko/q9Mf/ex3WUyadIqyoJoM8M7SlkUMYW\n39Yf/Zf52dTz4gUTUtSuMwvKvO94sa33RXxQIKXhecyjh1pJ6X1QYEcxWqCFs+qf\ns3AqNeHl7h2O6ouEuZNtkRg6+cy8zYD0ZrmwMphE5tqNm1L8lpdgaNzKnOSTcTfW\nU6wDIwC/8DkANfRds5ngA+SXCkI2LI8ujthLAi25e7qY57lAKCMdK15njcQftfiS\nEgdfHZVIDLO+lLw/ZqrAqRMCAwEAAQ==\n-----END RSA PUBLIC KEY-----\n",
		"data": {
			"advertisement": {
				"epoch": 9,
				"face": "(◕‿‿◕)",
				"identity": "ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea",
				"name": "alpha",
				"policy": {
					"advertise": true,
					"ap_ttl": 120,
					"associate": true,
					"bored_num_epochs": 15,
					"channels": [],
					"deauth": true,
					"excited_num_epochs": 10,
					"hop_recon_time": 10,
					"max_inactive_scale": 2,
					"max_interactions": 3,
					"max_misses_for_recon": 5,
					"min_recon_time": 5,
					"min_rssi": -200,
					"recon_inactive_multiplier": 2,
					"recon_time": 30,
					"sad_num_epochs": 25,
					"sta_ttl": 300
				},
				"pwnd_run": 0,
				"pwnd_tot": 424,
				"uptime": 19031,
				"version": "1.0.0RC4"
			},
			"brain": {
				"born_at": 1569086045.8648627,
				"epochs_lived": 6435,
				"epochs_trained": 6295,
				"rewards": {
					"best": 1.052142857142857,
					"worst": -120000000000000000000
				}
			},
			"session": {
				"associated": 5,
				"avg_reward": 0.00945353791507638,
				"deauthed": 1,
				"duration": "00:31:06",
				"epochs": 13,
				"handshakes": 0,
				"max_reward": 0.16214285714285717,
				"min_reward": -0.2,
				"peers": 0,
				"train_epochs": 0
			},
			"uname": "Linux alpha 4.19.66-Re4son+ #1 Sun Aug 18 13:42:02 AEST 2019 armv6l GNU/Linux",
			"version": "1.0.0RC4"
		},
		"networks": 419
	},
    ...
    ...]
}
</code></pre>
{{% /expand%}}

## GET /api/v1/units/by_country

Get a list of countries and number of units registered for each. <i class="fas fa-lock-open"></i>

{{%expand "Example Response"%}}
<pre><code>[{
		"country": "US",
		"units": 117
	},
	{
		"country": "DE",
		"units": 58
	},
	{
		"country": "IT",
		"units": 29
	},
	{
		"country": "GB",
		"units": 28
	},
	{
		"country": "FR",
		"units": 23
	},
	{
		"country": "CA",
		"units": 15
	},
	{
		"country": "IE",
		"units": 11
	},
	{
		"country": "AU",
		"units": 10
	},
	{
		"country": "NL",
		"units": 10
	},
	{
		"country": "CH",
		"units": 10
	},
	{
		"country": "BE",
		"units": 10
	},
	{
		"country": "AR",
		"units": 9
	},
	{
		"country": "AT",
		"units": 9
	},
	{
		"country": "PT",
		"units": 8
	},
	{
		"country": "ES",
		"units": 7
	},
	{
		"country": "CZ",
		"units": 6
	},
	{
		"country": "TR",
		"units": 5
	},
	{
		"country": "SE",
		"units": 4
	},
	{
		"country": "BR",
		"units": 4
	},
	{
		"country": "NZ",
		"units": 4
	},
	{
		"country": "MY",
		"units": 3
	},
	{
		"country": "RU",
		"units": 3
	},
	{
		"country": "BG",
		"units": 3
	},
	{
		"country": "CY",
		"units": 3
	},
	{
		"country": "ZA",
		"units": 3
	},
	{
		"country": "BN",
		"units": 2
	},
	{
		"country": "PL",
		"units": 2
	},
	{
		"country": "LT",
		"units": 2
	},
	{
		"country": "MX",
		"units": 2
	},
	{
		"country": "DK",
		"units": 2
	},
	{
		"country": "CL",
		"units": 1
	},
	{
		"country": "BY",
		"units": 1
	},
	{
		"country": "IN",
		"units": 1
	},
	{
		"country": "CO",
		"units": 1
	},
	{
		"country": "UA",
		"units": 1
	},
	{
		"country": "FI",
		"units": 1
	},
	{
		"country": "NO",
		"units": 1
	}
]
</code></pre>
{{% /expand%}}

## GET /api/v1/unit/{fingerprint}

Get information about a unit given its fingerprint. <i class="fas fa-lock-open"></i>

{{%expand "Example Response"%}}
<pre><code>{
	"enrolled_at": "2019-10-06T22:56:06Z",
	"updated_at": "2019-10-15T09:57:37Z",
	"country": "IT",
	"name": "turing",
	"fingerprint": "ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea",
	"public_key": "-----BEGIN RSA PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzJQRTn1KDdIxduFq/pB+\nQ/+pNtvegmGAmzwb3YlP+SzhihbBUIOx85TodOEQZ1efUZy6Jn3ig6gPib3a2JsM\nT85P/Fxwfz6HrC8UlaOMaDyMksDgO7ZBM4zxthL8kgwtF9N7BYXn9nBZ2ReS1Gua\ncwayBkcMUlX83fpFe15fosXF3WeBO6jSa56YLuYDaxugUODhHR9C30n6okR2wssx\n2mUK6r6/smhSqoXwLttej4YvLi0NEvhdgp1Qy5zNHdcMhqJcxvbhFrJFx4JFZLdR\nLshs2nwTQq3rwyqC8nZvHCxXOdmFXBlSY6nQzILPLVlbeUYACeyfrOGFwdsXxq8u\nk/+Q6h9MFvdDGErv16eDYd0t/s0c0h8rHcGZpPYSE/zWviM+vQgpBPUEE4JBFNro\nxCOUjVtTWHlsjnp5dIQexagXm1/5jP1ko/q9Mf/ex3WUyadIqyoJoM8M7SlkUMYW\n39Yf/Zf52dTz4gUTUtSuMwvKvO94sa33RXxQIKXhecyjh1pJ6X1QYEcxWqCFs+qf\ns3AqNeHl7h2O6ouEuZNtkRg6+cy8zYD0ZrmwMphE5tqNm1L8lpdgaNzKnOSTcTfW\nU6wDIwC/8DkANfRds5ngA+SXCkI2LI8ujthLAi25e7qY57lAKCMdK15njcQftfiS\nEgdfHZVIDLO+lLw/ZqrAqRMCAwEAAQ==\n-----END RSA PUBLIC KEY-----\n",
	"data": {
		"advertisement": {
			"epoch": 9,
			"face": "(◕‿‿◕)",
			"identity": "ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea",
			"name": "alpha",
			"policy": {
				"advertise": true,
				"ap_ttl": 120,
				"associate": true,
				"bored_num_epochs": 15,
				"channels": [],
				"deauth": true,
				"excited_num_epochs": 10,
				"hop_recon_time": 10,
				"max_inactive_scale": 2,
				"max_interactions": 3,
				"max_misses_for_recon": 5,
				"min_recon_time": 5,
				"min_rssi": -200,
				"recon_inactive_multiplier": 2,
				"recon_time": 30,
				"sad_num_epochs": 25,
				"sta_ttl": 300
			},
			"pwnd_run": 0,
			"pwnd_tot": 424,
			"uptime": 19031,
			"version": "1.0.0RC4"
		},
		"associated": 13,
		"avg_reward": 0.0033886043297653642,
		"brain": {
			"born_at": 1569086045.8648627,
			"epochs_lived": 6435,
			"epochs_trained": 6295,
			"rewards": {
				"best": 1.052142857142857,
				"worst": -120000000000000000000
			}
		},
		"bssid": "84:1b:5e:dd:1c:85",
		"deauthed": 4,
		"duration": "92:05:08",
		"epochs": 164,
		"essid": "Needle",
		"handshakes": 5,
		"max_reward": 1.1514285714285712,
		"min_reward": -0.2,
		"peers": 0,
		"session": {
			"associated": 5,
			"avg_reward": 0.00945353791507638,
			"deauthed": 1,
			"duration": "00:31:06",
			"epochs": 13,
			"handshakes": 0,
			"max_reward": 0.16214285714285717,
			"min_reward": -0.2,
			"peers": 0,
			"train_epochs": 0
		},
		"train_epochs": 122,
		"uname": "Linux alpha 4.19.66-Re4son+ #1 Sun Aug 18 13:42:02 AEST 2019 armv6l GNU/Linux",
		"version": "1.0.0RC4"
	},
	"networks": 419
}
</code></pre>
{{% /expand%}}

## POST /api/v1/unit/enroll

Enroll a unit with its RSA keypair and give it a JWT token for further authenticated requests. <i class="fas fa-lock-open"></i>

{{%expand "Example Request"%}}
<pre><code>{
  "identity": "alpha@ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea",
  "public_key": "... BASE64(unit.public_key_pem) ...",
  "signature": "... BASE64(SIGN(identity, unit.private_key)) ...",
  "data": "... misc unit data ..."
}
</code></pre>

The <code>identity</code> field is made of the name of the unit (can be anything up to 255 characters) and its 
<a href="/usage/#pwnmail">public key fingerprint</a>.
Followed by <code>public_key</code>, which contains the unit's public key encoded in PEM format and then in base64 and the <code>signature</code>.
The signature is created by using the <a href="RSA-PSS scheme">RSA-PSS scheme</a> to sign the identity string (and thus proving 
ownership on the private key too). Finally, the <code>data</code> contains up to 10KB of custom data, currently it's used to report information about the last 
unit's session, its current sent of parameters, etc. The reference Go code for this enrollment request can be <a href="https://github.com/evilsocket/pwngrid/blob/master/api/client.go#L70">found here</a>.
{{% /expand%}}

{{%expand "Example Response"%}}
<pre><code>{
    "token": "... JWT token here ..."	
}
</code></pre>
{{% /expand%}}

## GET /api/v1/unit/inbox

Get a paged list of all PwnMAIL inbox messages. <i class="fas fa-lock"></i>

{{%expand "Example Response"%}}
<pre><code>{
	"pages": 1,
	"records": 1,
	"messages": [{
        "id": 123,
        "created_at": "2019-10-06T22:56:06Z",
        "updated_at": "2019-10-06T22:56:06Z",
        "deleted_at": null,
        "seen_at": null,
        "sender_name": "alpha",
        "sender": "ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea"
    }]
}
</code></pre>
{{% /expand%}}

## GET /api/v1/unit/inbox/{id} 

Get a message given its identifier. The content is encrypted and must be decrypted. <i class="fas fa-lock"></i>

{{%expand "Example Response"%}}
<pre><code>{
    "id": 123,
    "created_at": "2019-10-06T22:56:06Z",
    "updated_at": "2019-10-06T22:56:06Z",
    "deleted_at": null,
    "seen_at": null,
    "sender_name": "alpha",
    "sender": "ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea",
    "data": "base64 encoded AES-GCM encrypted data",
    "signature": "base64 encoded RSA-PSS signature of the data"
}
</code></pre>

The data is composed of:

<ul>
    <li>12 bytes of nonce.</li>
    <li>4 bytes of a little endian integer representing the size of the RSA-OAEP encrypted key buffer.</li>
    <li>The RSA-OAEP encrypted key buffer, this is the AES-GCM key encrypted with the recipient public key.</li>
    <li>The AES-GCM encrypted message.</li>
</ul>

The reference Go code for signature verification and dencryption can be <a href="https://github.com/evilsocket/pwngrid/blob/master/api/peer_inbox.go#L38">found here</a>.
{{% /expand%}}

## GET /api/v1/unit/inbox/{id}/{mark}

Mark a message given its identifier, mark can be `seen`, `unseen` or `deleted`. <i class="fas fa-lock"></i>

## POST /api/v1/unit/{fingerprint}/inbox

Send an encrypted message to a unit by its fingerprint. The content must be signed and encrypted. <i class="fas fa-lock"></i>

{{%expand "Example Request"%}}
<pre><code>{
    "data": "base64 encoded AES-GCM encrypted data",
    "signature": "base64 encoded RSA-PSS signature of the data"
}
</code></pre>

Refer to the <a href="/api/grid/#get-api-v1-unit-inbox-id">/api/v1/unit/inbox/{id}</a> for how the encrypted data field should be composed.
{{% /expand%}}

## POST /api/v1/unit/report/ap

[Fully opted-in](/configuration/#set-your-pwngrid-preferences) units can use this API to report a pwned access point. <i class="fas fa-lock"></i>

{{%expand "Example Request"%}}
<pre><code>{
    "essid": "SuperSecureNetwork",
    "bssid": "de:ad:be:ef:de:ad"
}
</code></pre>
{{% /expand%}}

## POST /api/v1/unit/report/aps

To report multiple access points at once.

{{%expand "Example Request"%}}
<pre><code>[{
    "essid": "SuperSecureNetwork",
    "bssid": "de:ad:be:ef:de:ad"
}, ...]
</code></pre>
{{% /expand%}}