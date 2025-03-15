const {
  cmd,
  commands
} = require("../command");
const path = require('path');

cmd({
  'pattern': "getstatus",
  'react': '📁',
  'desc': "Bot owner එකේ හෝ අනෙක් අයගේ status එක forward කරන්න.",
  'category': "media",
  'use': ".status",
  'filename': __filename
}, async (_0x2ecf0f, _0x3c0350, _0x2b9c8c, {
  quoted: _0x2103b0,
  q: _0x435112,
  reply: _0x4f53e2
}) => {
  try {
    if (!_0x2103b0) {
      return _0x4f53e2("❌ status message එක reply කරලා .status command එක run කරන්න.");
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

    // Forward logic
    const _0x4acfdc = {
      'caption': _0x435112 || ''
    };

    if (_0x21e1be) {
      _0x4acfdc[_0x21e1be] = {
        'url': 'file://' + _0x5af1b3
      };
    } else {
      // If it's a text message, send the text
      _0x4acfdc.text = _0x2103b0.text || 'No caption';
    }

    // Forward the message to the requested user
    await _0x2ecf0f.sendMessage(_0x2b9c8c.sender, _0x4acfdc, {
      'quoted': _0x3c0350
    });

    await _0x4f53e2("✅ status message එක සාර්ථකව forward කරන ලදී.");
  } catch (_0x1791ca) {
    console.error(_0x1791ca);
    _0x4f53e2("❌ status forward කිරීමේදී දෝෂයක් සිදුවිණි. කරුණාකර නැවත උත්සාහ කරන්න.");
  }
});
