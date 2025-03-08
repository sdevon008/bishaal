
# Blogger Embed Codes for Your Nepal App

This folder contains HTML embed codes that can be used to embed Your Nepal App tools and pages into Blogger or other websites.

## Available Embeds

1. **Home Page** - `home.html`
2. **Date Converter** - `date-converter.html`
3. **Nepali Calendar** - `nepali-calendar.html`
4. **Unicode Converter** - `unicode-converter.html`
5. **Load Shedding** - `load-shedding.html`
6. **Currency Converter** - `currency-converter.html`
7. **Services** - `services.html`

## How to Use in Blogger

1. Open your Blogger dashboard and create or edit a post
2. Click on the "HTML" button in the editor to switch to HTML mode
3. Open the HTML file for the tool you want to embed from this folder
4. Copy the HTML code (including all the div tags and styling)
5. Paste it into your Blogger post in HTML view mode
6. Switch back to Compose view and save/publish your post

## Troubleshooting

If the embeds are not working:

1. Make sure you're copying the entire code block including all opening and closing tags
2. Ensure you're pasting in HTML/code view mode in Blogger, not in the visual/compose editor
3. Some Blogger themes may have CSS that conflicts with the embed styling - if that happens, try using the simpler link-only version:

```html
<p style="text-align:center; margin:20px 0;">
  <a href="https://yournepalapp.com/date-converter" target="_blank" rel="noopener noreferrer" style="display:inline-block; text-decoration:none; background:#dc3545; color:white; padding:10px 20px; border-radius:4px; font-weight:bold;">
    Open Nepali Date Converter
  </a>
</p>
```

4. If your blog has a Content Security Policy (CSP), you may need to adjust it to allow images from yournepalapp.com

## Notes

- These embeds use direct links rather than iframes for better compatibility with Blogger
- The styling is designed to work with most Blogger themes
- You can modify the colors and styles to match your blog's design

For questions or support, please contact us at devendrashah@outlook.my
