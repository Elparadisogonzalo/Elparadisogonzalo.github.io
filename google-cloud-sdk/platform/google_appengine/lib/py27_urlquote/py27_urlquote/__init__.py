import sys


if sys.version_info[0] == 2:
  import urllib
  urlquote = urllib.quote
else:
  import six

  _ALWAYS_SAFE = (b'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
                  b'0123456789_.-/')
  _SAFE_MAP = {}

  for i, c in zip(range(256), bytearray(range(256))):
    _SAFE_MAP[c] = chr(c) if (i < 128 and
                              c in _ALWAYS_SAFE) else '%{:02X}'.format(i)

  def urlquote(s):
    strip_char = b'/' if isinstance(s, bytes) else '/'
    if not s.rstrip(strip_char):
      return six.ensure_text(s)

    s_ord = s if isinstance(s, bytes) else [ord(c) for c in s]
    return ''.join(_SAFE_MAP.__getitem__(c) for c in s_ord if c in _SAFE_MAP)
