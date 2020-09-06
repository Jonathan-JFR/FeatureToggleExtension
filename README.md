# Feature Toggle Extension

![Screenshot 2020-09-06 at 19 06 04](https://user-images.githubusercontent.com/11645698/92331064-0a6cda80-f074-11ea-839a-873e38b745b8.png)


FT-Extension is really simple to use. Just fill the URL pattern, the feature toggle and activate it.

Every time google chrome visit a website that match the pattern, the extension will add automatically a new param to the querystring including the feature toggle.

URL pattern do not support regex. It just check if the URL start with the pattern.

# Know Issue

When using that extension with an external monitor, Due to a known bug of Chrome Extensions (https://bugs.chromium.org/p/chromium/issues/detail?id=971701) it's possible the activation checkbox dont visualy update its state after click (The popup is not repainted). To force that, just make click in the first textbox. Yes, its anoying.

