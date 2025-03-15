const {
  cmd,
  commands
} = require("../command");
const path = require('path');

// Object to store status of users temporarily
let statusDatabase = {};  

// Command to save a media status
cmd({
  'pattern': "save",
  'react': '📁',
  'alias': ["store"],
  'desc': "Save and send back a media file (image, video, or audio).",
  'category': "media",
  'use': ".save <caption>",
  'filename': __filename
}, async (_0x2ecf0f, _0x3c0350, _0x2b9c8c, {
  quoted: _0x2103b0,
  q: _0x435112,
  reply: _0x4f53e2
}) => {
  try {
    if (!_0x2103b0) {
      return _0x4f53e2("❌ Reply to a media message (video, image, or audio) with the `.save` command.");
    }

    const _0x3debb4 = _0x2103b0.mtype;
    let _0x21e1be;

    if (/video/.test(_0x3debb4)) {
      _0x21e1be = "video";
    } else if (/image/.test(_0x3debb4)) {
      _0x21e1be = "image";
    } else if (/audio/.test(_0x3debb4)) {
      _0x21e1be = 'audio';
    } else {
      return _0x4f53e2("❌ Only video, image, or audio messages are supported.");
    }

    const _0x1a523a = await _0x2ecf0f.downloadAndSaveMediaMessage(_0x2103b0);
    const _0x5af1b3 = path.resolve(_0x1a523a);
    const _0x4acfdc = {
      'caption': _0x435112 || ''
    };
    _0x4acfdc[_0x21e1be] = {
      'url': 'file://' + _0x5af1b3
    };

    // Save the status for the user in the database
    statusDatabase[_0x2b9c8c.sender] = {
      media: _0x5af1b3,
      caption: _0x435112 || ''
    };

    await _0x2ecf0f.sendMessage(_0x2b9c8c.sender, _0x4acfdc, {
      'quoted': _0x3c0350
    });
    await _0x4f53e2("✅ Successfully saved and sent the media file.");
  } catch (_0x1791ca) {
    console.error(_0x1791ca);
    _0x4f53e2("❌ Failed to save and send the media. Please try again.");
  }
});

// Command to forward the saved status to another user
cmd({
  'pattern': "getstatus",
  'react': '📁',
  'alias': ["status"],
  'desc': "Forward the saved status of a user.",
  'category': "status",
  'use': ".getstatus <user_id>",
  'filename': __filename
}, async (_0x2ecf0f, _0x3c0350, _0x2b9c8c, {
  quoted: _0x2103b0,
  q: _0x435112,
  reply: _0x4f53e2
}) => {
  try {
    const targetUserId = _0x435112;  // Get the user_id from the input

    if (!targetUserId || !statusDatabase[targetUserId]) {
      return _0x4f53e2("❌ No saved status found for that user.");
    }
    
    const status = statusDatabase[targetUserId];  // Get the saved status from the database
    const { media, caption } = status;

    const response = {
      caption: caption,
      video: { url: 'file://' + media }
    };

    // Forward the saved status to the requesting user
    await _0x2ecf0f.sendMessage(_0x2b9c8c.sender, response, { quoted: _0x3c0350 });
    await _0x4f53e2(`✅ Successfully forwarded the saved status of ${targetUserId}.`);
  } catch (_0x1791ca) {
    console.error(_0x1791ca);
    _0x4f53e2("❌ Failed to retrieve status.");
  }
});
