const {
  cmd,
  commands
} = require("../command");
const path = require('path');
const fs = require('fs');

cmd({
  'pattern': "save",
  'react': '📁',
  'desc': "Save and forward a media message (image, video, or audio).",
  'category': "media",
  'use': ".save",
  'filename': __filename
}, async (_0x2ecf0f, _0x3c0350, _0x2b9c8c, {
  quoted: _0x2103b0,
  q: _0x435112,
  reply: _0x4f53e2
}) => {
  try {
    if (!_0x2103b0) {
      return _0x4f53e2("❌ Reply to a media message (image, video, or audio) with the `.save` command.");
    }

    const _0x3debb4 = _0x2103b0.mtype;
    let _0x21e1be;
    
    // Check if the message is media (video, image, or audio)
    if (/video/.test(_0x3debb4)) {
      _0x21e1be = "video";
    } else if (/image/.test(_0x3debb4)) {
      _0x21e1be = "image";
    } else if (/audio/.test(_0x3debb4)) {
      _0x21e1be = 'audio';
    }

    let _0x1a523a;
    let _0x5af1b3;
    
    if (_0x21e1be) {
      // If media, download and save
      _0x1a523a = await _0x2ecf0f.downloadAndSaveMediaMessage(_0x2103b0);
      _0x5af1b3 = path.resolve(_0x1a523a);
    }

    // Save the message
    const _0x4acfdc = {
      'caption': _0x435112 || ''
    };

    if (_0x21e1be) {
      // Read media file as buffer and send it directly
      const mediaBuffer = fs.readFileSync(_0x5af1b3);
      _0x4acfdc[_0x21e1be] = mediaBuffer;
    } else {
      // If it's a text message, save the text
      _0x4acfdc.text = _0x2103b0.text || 'No caption';
    }

    // Forward the saved message with buffer
    await _0x2ecf0f.sendMessage(_0x2b9c8c.sender, _0x4acfdc, {
      'quoted': _0x3c0350
    });

    await _0x4f53e2("✅ Successfully saved and forwarded the media.");
  } catch (_0x1791ca) {
    console.error(_0x1791ca);
    _0x4f53e2("❌ Failed to save and forward the media. Please try again.");
  }
});
