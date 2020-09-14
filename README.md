# Feature Toggle Extension

<img width="261" alt="Screenshot 2020-09-12 at 21 11 58" src="https://user-images.githubusercontent.com/11645698/93003241-5c62a400-f53d-11ea-83dc-94a2f8ef5069.png">


FT-Extension is really simple to use. Just fill the URL pattern (several allowed), the feature toggle and activate it.

Every time google chrome visit a website that match one of the supplied patterns, the extension will automatically add a new param to the querystring including the feature toggle.

URL patterns do not support regexes. It just check if the URL starts with one of the pattern.

# Known Issues

When using that extension with an external monitor, Due to a known bug of Chrome Extensions (https://bugs.chromium.org/p/chromium/issues/detail?id=971701) it's possible the activation checkbox dont visualy update its state after click (The popup is not repainted). To force that, just make click in the first textbox. Yes, its anoying.

