---
title: "Local"
date: 2019-02-25T10:57:36+01:00
weight: 2
draft: false
---

As part of the software components that run on every Pwnagotchi, the [pwngrid](https://github.com/evilsocket/pwngrid) binary runs 
in background in peer mode and exposes an API on http://127.0.0.1:8666/ that is used by the other components for nearby units advertisement and detection, 
but that can also be used easier access [the grid API](/api/grid/) through the unit itself and therefore without any need for authentication other than 
the SSH authentication you need to access the unit and talk to the local API. 

## Mesh

### GET /api/v1/mesh/{status}

If `status` is one of `true` or `enabled` it will enable WiFi advertising to nearby units, if `false` or `disabled` it will disable it.

### GET /api/v1/mesh/peers 

Returns a list of detected nearby units and their data updated in realtime, sorted by strongest signal first.

{{%expand "Example Response"%}}
<pre><code>[{
	"detected_at": "2019-10-06T22:56:06Z",
	"seen_at": "2019-10-06T22:56:06Z",
	"channel": 10,
	"RSSI": -70,
	"session_id": "de:ad:be:ef:de:ad",
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
	}
},
...]
</code></pre>
{{% /expand%}}

### GET /api/v1/mesh/data

Get the data that's currently used as advertisement.

{{%expand "Example Response"%}}
<pre><code>{
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
}
</code></pre>
{{% /expand%}}

### POST /api/v1/mesh/data

Set the data that's used as advertisement. Fields that don't exist will be added, fields set to null will be deleted.

{{%expand "Example Request"%}}
<pre><code>{
    "twitter_name": "evilsocket",
    "face": "NOFACE"
}
</code></pre>
{{% /expand%}}

### GET /api/v1/mesh/memory

Returns a list of all the units that have ever been met.

{{%expand "Example Response"%}}
<pre><code>[
  {
    "fingerprint": "b3ee4a482bdc6fb41d17961948dc8d19fb4d3e8cd10c475f2785c384fdb32c0f",
    "met_at": "0001-01-01T00:00:00Z",
    "detected_at": "2019-10-24T18:22:50.916146256+01:00",
    "seen_at": "2019-10-24T18:38:26.352928748+01:00",
    "prev_seen_at": "2019-10-24T18:38:26.026575031+01:00",
    "encounters": 52339,
    "channel": 4,
    "rssi": -4,
    "session_id": "fe:8c:cc:b7:28:3b",
    "advertisement": {
      "epoch": 94,
      "face": "( ⚆_⚆)",
      "grid_version": "1.7.6",
      "identity": "b3ee4a482bdc6fb41d17961948dc8d19fb4d3e8cd10c475f2785c384fdb32c0f",
      "name": "ribbon",
      "policy": {
        "advertise": true,
        "ap_ttl": 30,
        "associate": true,
        "bored_num_epochs": 5,
        "channels": [],
        "deauth": true,
        "excited_num_epochs": 5,
        "hop_recon_time": 5,
        "max_inactive_scale": 3,
        "max_interactions": 1,
        "max_misses_for_recon": 3,
        "min_recon_time": 1,
        "min_rssi": -200,
        "recon_inactive_multiplier": 1,
        "recon_time": 5,
        "sad_num_epochs": 5,
        "sta_ttl": 60
      },
      "pwnd_run": 4,
      "pwnd_tot": 17,
      "session_id": "fe:8c:cc:b7:28:3b",
      "timestamp": 1571636023,
      "uptime": 15382,
      "version": "1.0.0RC5"
    }
  },
  {
    "fingerprint": "e322e903cade856a6ae687795640f6a0f6b78132c15963825e73f6502795487f",
    "met_at": "0001-01-01T00:00:00Z",
    "detected_at": "2019-10-24T18:22:55.533569911+01:00",
    "seen_at": "2019-10-24T18:38:24.924140122+01:00",
    "prev_seen_at": "2019-10-24T18:38:24.376309634+01:00",
    "encounters": 41424,
    "channel": 11,
    "rssi": -55,
    "session_id": "57:61:8e:d0:b7:99",
    "advertisement": {
      "epoch": 69,
      "face": "(╥☁╥ )",
      "grid_version": "1.7.6",
      "identity": "e322e903cade856a6ae687795640f6a0f6b78132c15963825e73f6502795487f",
      "name": "squid",
      "policy": {
        "advertise": true,
        "ap_ttl": 30,
        "associate": true,
        "bored_num_epochs": 5,
        "channels": [],
        "deauth": true,
        "excited_num_epochs": 5,
        "hop_recon_time": 5,
        "max_inactive_scale": 3,
        "max_interactions": 1,
        "max_misses_for_recon": 3,
        "min_recon_time": 1,
        "min_rssi": -200,
        "recon_inactive_multiplier": 1,
        "recon_time": 5,
        "sad_num_epochs": 5,
        "sta_ttl": 60
      },
      "pwnd_run": 2,
      "pwnd_tot": 10,
      "session_id": "57:61:8e:d0:b7:99",
      "timestamp": 1571628821,
      "uptime": 15389,
      "version": "1.0.0RC5"
    }
  }
]
</code></pre>
{{% /expand%}}

### GET /api/v1/mesh/memory/{fingerprint}

Return the historical information of a unit given its fingerprint.

{{%expand "Example Response"%}}
<pre><code>{
  "fingerprint": "e322e903cade856a6ae687795640f6a0f6b78132c15963825e73f6502795487f",
  "met_at": "0001-01-01T00:00:00Z",
  "detected_at": "2019-10-24T18:22:55.533569911+01:00",
  "seen_at": "2019-10-24T18:39:38.083348784+01:00",
  "prev_seen_at": "2019-10-24T18:39:37.527044326+01:00",
  "encounters": 41544,
  "channel": 5,
  "rssi": -12,
  "session_id": "57:61:8e:d0:b7:99",
  "advertisement": {
    "epoch": 69,
    "face": "(◕‿‿◕)",
    "grid_version": "1.7.6",
    "identity": "e322e903cade856a6ae687795640f6a0f6b78132c15963825e73f6502795487f",
    "name": "squid",
    "policy": {
      "advertise": true,
      "ap_ttl": 30,
      "associate": true,
      "bored_num_epochs": 5,
      "channels": [],
      "deauth": true,
      "excited_num_epochs": 5,
      "hop_recon_time": 5,
      "max_inactive_scale": 3,
      "max_interactions": 1,
      "max_misses_for_recon": 3,
      "min_recon_time": 1,
      "min_rssi": -200,
      "recon_inactive_multiplier": 1,
      "recon_time": 5,
      "sad_num_epochs": 5,
      "sta_ttl": 60
    },
    "pwnd_run": 2,
    "pwnd_tot": 10,
    "session_id": "57:61:8e:d0:b7:99",
    "timestamp": 1571628894,
    "uptime": 15389,
    "version": "1.0.0RC5"
  }
}
</code></pre>
{{% /expand%}}

## Grid

### GET /api/v1/data

Get the data that's currently being sent to the [enrollment API](/api/grid/#post-api-v1-unit-enroll).

{{%expand "Example Response"%}}
<pre><code>{
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
}
</code></pre>
{{% /expand%}}

### POST /api/v1/data

Set the data that's currently being sent to the [enrollment API](/api/grid/#post-api-v1-unit-enroll). Fields that don't exist will be added, fields set to null will be deleted.
Server side features will be available depending on what you decide to remove from the sent data.

{{%expand "Example Request"%}}
<pre><code>{
	"something": "new"
}
</code></pre>
{{% /expand%}}

### GET /api/v1/units

Get a paged list of all the enrolled units, use `?p=2` for pages other than the first one.

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

### POST /api/v1/report/ap

[Fully opted-in](/configuration/#set-your-pwngrid-preferences) units can use this API to report a pwned access point. 

{{%expand "Example Request"%}}
<pre><code>{
    "essid": "SuperSecureNetwork",
    "bssid": "de:ad:be:ef:de:ad"
}
</code></pre>
{{% /expand%}}

## PwnMAIL

### GET /api/v1/inbox

Get a paged list of all PwnMAIL inbox messages.

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

### GET /api/v1/inbox/{id} 

Get a message given its identifier. The content is decrypted and its signature verified by the pwngrid binary itself.

{{%expand "Example Response"%}}
<pre><code>{
    "id": 123,
    "created_at": "2019-10-06T22:56:06Z",
    "updated_at": "2019-10-06T22:56:06Z",
    "deleted_at": null,
    "seen_at": null,
    "sender_name": "alpha",
    "sender": "ca1225b86dc35fef90922d83421d2fc9c824e95b864cfa62da7bea64ffb05aea",
    "data": "base64 encoded cleartext message data",
    "signature": "base64 encoded RSA-PSS signature of the encrypted data"
}
</code></pre>
{{% /expand%}}

### GET /api/v1/inbox/{id}/{mark}

Mark a message given its identifier, mark can be `seen`, `unseen` or `deleted`.

### POST /api/v1/unit/{fingerprint}/inbox

Send a message to a unit by its fingerprint. The content will be automatically encrypted and signed **locally** by pwngrid.
 
{{%expand "Example Request"%}}
<pre><code>Anything that's sent as POST data will be used as a message.</code></pre>
{{% /expand%}}
